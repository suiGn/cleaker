import React, { useState, useEffect, useRef } from "react";
import empty from "../../assets/img/undraw_empty_xct9.svg";
import { Menu } from "react-feather";
import UIfx from "uifx";
import notificationAudio from "../../assets/sound/much.mp3";
import { Input } from "reactstrap";
import * as FeatherIcon from "react-feather";
import axios from "axios";
import { setOptions, Document, Page } from "react-pdf";
import PerfectScrollbar from "react-perfect-scrollbar";
import VideoThumbnail from 'react-video-thumbnail';
const pdfjsVersion = "2.0.305";
setOptions({
  workerSrc: `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.js`,
});

function ChatNoMessage(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [inputMsg,setInputMsg] = useState("");
  const [filesArray,setFilesArray] = useState([]);
  const [imgPreview,setImgPreview] = useState("");
  const [filePreview,setFilePreview] = useState("");
  const [videoPreview,setVideoPreview] = useState("");
  const inputFile = useRef(null);
  const inputImage = useRef(null);
  const inputVideo = useRef(null);
  const videoplayer = useRef(null);

  const { 
    socket, files, viewPreview, imageOrFile, limitChat, setImageOrFile, setViewPreview, setFile, 
    setViewChatAnswerPreview, isResponse, setisResponse, messageRespond, clicked, my_uid, chat_uid,
    setFilePreviewChange
  } = props;

  useEffect(() => {
    let fileArray = []
    for (var i = 0; i < files.length; i++)
    {
      (function(file) {
        var reader = new FileReader();  
        reader.onload = ()=> {  
            fileArray.push(reader.result)
            setFilesArray(fileArray)
            switch (imageOrFile) {
              case 1:
                setImgPreview(reader.result)
                setImgPreview(fileArray[0])
                break;
              case 2:
                setFilePreview(reader.result)
                setFilePreview(fileArray[0])
                break;
              case 3:
                setVideoPreview(reader.result)
                setVideoPreview(fileArray[0])
                break;
              default:
            }
            
        }
        reader.readAsDataURL(file);
      })(files[i]);
    }
  },[files])

  const handleSubmit = (newValue) => {
    if(isResponse){
      setisResponse(false)
      setViewChatAnswerPreview(true)
      socket.emit("chat message", {
        chat: newValue.chat_uid,
        message: newValue.text,
        is_image: newValue.is_image,
        is_file: newValue.is_file,
        is_video: newValue.is_video,
        is_response: 1,
        response: newValue.response,
        response_from:newValue.response_from,
        file: newValue.file,
        responseFile: newValue.responseFile,
        response_type: newValue.response_type,
        widht: newValue.widht,
        height: newValue.height
      });
      socket.emit("get chats");
      socket.emit("get messages", {
        id: newValue.chat_uid,
        page: 1,
        limit: limitChat,
      });
    }else{
      socket.emit("chat message", {
        chat: newValue.chat_uid,
        message: newValue.text,
        is_image: newValue.is_image,
        is_file: newValue.is_file,
        is_video: newValue.is_video,
        file: newValue.file,
        is_response: 0
      });
      socket.emit("get chats");
      socket.emit("get messages", {
        id: newValue.chat_uid,
        page: 1,
        limit: limitChat,
      });
    }
  };

  function Send() {
    let file = imgPreview;
    var dummy = {
      chat_type: clicked.chat_type,
      chat_uid: chat_uid,
      delete_message: 0,
      delete_message_to: 0,
      favorite: 0,
      favorite_to: 0,
      file: file,
      is_file: 1,
      is_image: 1,
      is_response: 0,
      is_video: 0,
      message:inputMsg,
      message_id: 0,
      message_user_uid: my_uid.id,
      name: "",
      pphoto: "",
      response: "",
      response_file: "",
      response_from: "",
      response_type: 0,
      time: new Date().toISOString(),
      unread_messages: 2
    }
    setFilePreviewChange(dummy)
    for (var i = 0; i < files.length; i++)
    {
      const formData = new FormData();
      formData.append("myFile", files[i]);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      switch (imageOrFile) {
        case 1:
          axios
            .post("/uploadpChatFile", formData, config)
            .then((response) => {
              if(isResponse){
                handleIsResponceImage(response);
              }else{
                const img = new Image();
                img.src = file;
                img.onload = () => {
                    let awidht = img.width* .60
                    let aheight = img.height* .60
                    handleSubmit({
                      text: inputMsg,
                      chat_uid: props.chat_uid,
                      is_image: 1,
                      is_file: 0,
                      is_video: 0,
                      file: response.data.url,
                      widht: awidht,
                      height: aheight
                    });
                };
              }
            })
            .catch((error) => {});
          break;
        case 2:
          axios
            .post("/uploadpChatFile", formData, config)
            .then((response) => {
              if(isResponse){
                handleIsResponceFile(response);
              }else{
                handleSubmit({
                  text: inputMsg,
                  chat_uid: props.chat_uid,
                  is_image: 0,
                  is_file: 1,
                  is_video: 0,
                  file: response.data.url
                });
              }
            })
            .catch((error) => {});
          break;
        case 3:
          axios
            .post("/uploadpChatFile", formData, config)
            .then((response) => {
              if(isResponse){
                handleIsResponceVideo(response);
              }else{
                handleSubmit({
                  text: inputMsg,
                  chat_uid: props.chat_uid,
                  is_image: 0,
                  is_file: 0,
                  is_video: 1,
                  file: response.data.url
                });
              }
            })
            .catch((error) => {});
          break;
        default:
      }
    }
    setImageOrFile("");
    setFilePreview("");
    setImgPreview("");
    setVideoPreview("");
    setImageOrFile(0);
    setViewPreview(false);
    setInputMsg("");
  }

  function handleIsResponceImage(response){
    if(messageRespond.is_file){
      handleSubmit({
        text: inputMsg,
        chat_uid: props.chat_uid,
        is_image: 1,
        is_file: 0,
        is_video: 0,
        file: response.data.url,
        response: messageRespond.message,
        response_from: messageRespond.name,
        responseFile: messageRespond.file,
        response_type:1
      });
    }else if(messageRespond.is_image){
      const img = new Image();
      img.src = response.data.url;
      img.onload = () => {
          let awidht = img.width* .60
          let aheight = img.height* .60
          handleSubmit({
            text: inputMsg,
            chat_uid: props.chat_uid,
            is_image: 1,
            is_file: 0,
            is_video: 0,
            file: response.data.url,
            response: messageRespond.message,
            response_from: messageRespond.name,
            responseFile: messageRespond.file,
            response_type:2,
            widht: awidht,
            height: aheight
          });
      };
    }else if(messageRespond.is_video){
      handleSubmit({
        text: inputMsg,
        chat_uid: props.chat_uid,
        is_image: 1,
        is_file: 0,
        is_video: 0,
        file: response.data.url,
        response: messageRespond.message,
        response_from: messageRespond.name,
        responseFile: messageRespond.file,
        response_type:3
      });
    }else{
      handleSubmit({
        text: inputMsg,
        chat_uid: props.chat_uid,
        is_image: 1,
        is_file: 0,
        is_video: 0,
        file: response.data.url,
        response: messageRespond.message,
        response_from: messageRespond.name,
        response_type:0
      });
    }
  }

  function handleIsResponceFile(response){
    if(messageRespond.is_file){
      handleSubmit({
        text: inputMsg,
        chat_uid: props.chat_uid,
        is_image: 0,
        is_file: 1,
        is_video: 0,
        file: response.data.url,
        response: messageRespond.message,
        response_from: messageRespond.name,
        responseFile: messageRespond.file,
        response_type:1
      });
    }else if(messageRespond.is_image){
      handleSubmit({
        text: inputMsg,
        chat_uid: props.chat_uid,
        is_image: 0,
        is_file: 1,
        is_video: 0,
        file: response.data.url,
        response: messageRespond.message,
        response_from: messageRespond.name,
        responseFile: messageRespond.file,
        response_type:2
      });
    }else if(messageRespond.is_video){
      handleSubmit({
        text: inputMsg,
        chat_uid: props.chat_uid,
        is_image: 0,
        is_file: 1,
        is_video: 0,
        file: response.data.url,
        response: messageRespond.message,
        response_from: messageRespond.name,
        responseFile: messageRespond.file,
        response_type:3
      });
    }else{
      handleSubmit({
        text: inputMsg,
        chat_uid: props.chat_uid,
        is_image: 0,
        is_file: 1,
        is_video: 0,
        file: response.data.url,
        response: messageRespond.message,
        response_from: messageRespond.name,
        response_type:0
      });
    }
  }

  function handleIsResponceVideo(response){
    if(messageRespond.is_file){
      handleSubmit({
        text: inputMsg,
        chat_uid: props.chat_uid,
        is_image: 0,
        is_file: 0,
        is_video: 1,
        file: response.data.url,
        response: messageRespond.message,
        response_from: messageRespond.name,
        responseFile: messageRespond.file,
        response_type:1
      });
    }else if(messageRespond.is_image){
      handleSubmit({
        text: inputMsg,
        chat_uid: props.chat_uid,
        is_image: 0,
        is_file: 0,
        is_video: 1,
        file: response.data.url,
        response: messageRespond.message,
        response_from: messageRespond.name,
        responseFile: messageRespond.file,
        response_type:2
      });
    }else if(messageRespond.is_video){
      handleSubmit({
        text: inputMsg,
        chat_uid: props.chat_uid,
        is_image: 0,
        is_file: 0,
        is_video: 1,
        file: response.data.url,
        response: messageRespond.message,
        response_from: messageRespond.name,
        responseFile: messageRespond.file,
        response_type:3
      });
    }else{
      handleSubmit({
        text: inputMsg,
        chat_uid: props.chat_uid,
        is_image: 0,
        is_file: 0,
        is_video: 1,
        file: response.data.url,
        response: messageRespond.message,
        response_from: messageRespond.name,
        response_type:0
      });
    }
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function ClosePreview(e){
    e.preventDefault();
    setImageOrFile("");
    setFilePreview("");
    setVideoPreview("");
    setImageOrFile(0);
    setViewPreview(false);
    setInputMsg("");
  }

  const handleChange = (e) => {
    setInputMsg(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      Send();
    }
  };

  function PreviewClick(clicked){
    switch (imageOrFile) {
      case 1:
        setImgPreview(filesArray[clicked])
        break;
      case 2:
        setFilePreview(filesArray[clicked])
        break;
      case 3:
        setVideoPreview(filesArray[clicked])
        videoplayer.current.load()
        break;
      default:
    }
  }

  function Remove(clicked){
    var newFileList = Array.from(files);
    newFileList.splice(clicked,1)
    filesArray.splice(clicked,1)
    setFile(newFileList);
    setFilesArray(filesArray)
    if(filesArray.length<=0){
      setImageOrFile("");
      setFilePreview("");
      setVideoPreview("");
      setImageOrFile(0);
      setViewPreview(false);
      setInputMsg("");
    }else{
      switch (imageOrFile) {
        case 1:
          setImgPreview(filesArray[1])
          setImgPreview(filesArray[0])
          break;
        case 2:
          setFilePreview(filesArray[1])
          setFilePreview(filesArray[0])
          break;
        case 3:
          setVideoPreview(filesArray[0])
          videoplayer.current.load()
          break;
        default:
      }
    }
  }

  const onButtonClickFile = () => {
    inputFile.current.click();
  };

  const onButtonClickImage = () => {
    inputImage.current.click();
  };

  const onButtonClickVideo = () =>{
    inputVideo.current.click();
  }

  function onChangeFile(e) {
    e.preventDefault();
    var newFileList = Array.from(files);
    var newFileListChange = Array.from(e.target.files);
    var newList = newFileList.concat(newFileListChange)
    let fileArray = []
    for (var i = 0; i < newList.length; i++)
    {
      (function(file) {
        var reader = new FileReader();  
        reader.onload = ()=> {  
            fileArray.push(reader.result)
        }
        reader.readAsDataURL(file);
      })(newList[i]);
    }
    setFilePreview(fileArray[0])
    setFilesArray(fileArray)
    setFile(newList);
  }

  function onChangePhoto(e) {
    e.preventDefault();
    var newFileList = Array.from(files);
    var newFileListChange = Array.from(e.target.files);
    var newList = newFileList.concat(newFileListChange)
    let fileArray = []
    for (var i = 0; i < newList.length; i++)
    {
      (function(file) {
        var reader = new FileReader();  
        reader.onload = ()=> {  
            fileArray.push(reader.result)
        }
        reader.readAsDataURL(file);
      })(newList[i]);
    }
    setImgPreview(fileArray[0])
    setFilesArray(fileArray)
    setFile(newList);
  }

  function onChangeVideo(e){
    e.preventDefault();
    var newFileList = Array.from(files);
    var newFileListChange = Array.from(e.target.files);
    var newList = newFileList.concat(newFileListChange)
    let fileArray = []
    for (var i = 0; i < newList.length; i++)
    {
      (function(file) {
        var reader = new FileReader();  
        reader.onload = ()=> {  
            fileArray.push(reader.result)
        }
        reader.readAsDataURL(file);
      })(newList[i]);
    }
    //setVideoPreview(fileArray[0])
    setFilesArray(fileArray)
    setFile(newList);
    videoplayer.current.load()
  }

  return (
    <div className="chat" hidden={!viewPreview}>
      <div className="chat-header">
        <div class="chat-header-user col-6">
          <span className="avatar-title preview-close rounded-circle">
            <a
              className="close-preview"
              onClick={(e) => ClosePreview(e)}
            >
              <FeatherIcon.X />
            </a>
          </span>
          <h3>Preview</h3>
        </div>
      </div>
      <div className="chat-body">
        <div
          id="nochatselected"
          className="justify-content-center align-items-center d-flex h-100"
        >
          <div className="no-message-container custom-chat-message">
            <div className="row mb-5 chat-body-custom">
              {imageOrFile == 1 ? 
                <div className="col-12 img-preview-container-head">
                  <div className="img-preview-container">
                    <img src={imgPreview} className="img-preview" alt="image" />
                  </div>
                </div>
               : 
               imageOrFile == 2 ? 
                <div className="col-12 img-preview-container-head">
                  <div className="pdf-preview-container">
                    <Document
                      file={`${filePreview}`}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                      <Page pageNumber={pageNumber}/>
                    </Document>
                  </div>
                </div> 
                :
                imageOrFile == 3 ? 
                <div className="col-12 img-preview-container-head">
                  <div className="img-preview-container">
                    <video ref={videoplayer} className="video-container-preview" controls>
                    {videoPreview != "" ?
                      <source src={videoPreview}/>
                    :""}
                    </video>
                  </div>
                </div>
                :
                ""
              }
            </div>
          </div>
        </div>
        <div>
            <Input
            type="text"
            className="form-control form-file"
            placeholder="Write a message."
            value={inputMsg}
            onChange={handleChange}
            onKeyDown={onKeyDown}
           />
          </div>
      </div>
      <div className="chat-footer footer-file chat-footer-file ">
        <div className="clearfix">
          <button className="btn float-right">
            <figure class="avatar send-file mb-3">
              <span class="avatar-title send-file-button bg-info rounded-circle" onClick={Send}>
                <FeatherIcon.Send />
              </span>
            </figure>
          </button>
        </div>
        <PerfectScrollbar>
          <ul className="file-list">
            {filesArray.map((img, i) => (
              <li>
                <a className="mini-preview-close" onClick={() => Remove(i)}>
                  <FeatherIcon.X />
                </a>
                {imageOrFile == 1 ? 
                  <div className="mini-preview-container" style={{backgroundImage:"url("+img+")"}}
                  onClick={() => PreviewClick(i)}>
                  </div>
                  :imageOrFile == 2?
                  <div className="mini-preview-container"
                  onClick={() => PreviewClick(i)}>
                    <Document
                      file={`${img}`}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                      <Page pageNumber={pageNumber} width={100} height={70}/>
                    </Document>
                  </div>
                  :imageOrFile == 3?
                  <div className="mini-preview-container"
                  onClick={() => PreviewClick(i)}>
                    <VideoThumbnail
                      videoUrl={img}
                      thumbnailHandler={(thumbnail) => {}}

                      />
                  </div>
                  :"" 
                }
              </li>
              ))
            }
            <li>
              {
              imageOrFile == 1 ? 
              <div onClick={() => onButtonClickImage()}  className="mini-preview-container-add">
                <FeatherIcon.Plus />
                <input type="file" hidden ref={inputFile}  id="customFileI" name="customFileI" onChange={(e) =>onChangeFile(e)}
                  accept=".pdf" multiple/>
                <input type="file" hidden ref={inputImage}  id="customFileF" name="customFileF" onChange={(e) =>onChangePhoto(e)}
                accept=".png,.gif,.jpg" multiple/>
                <input type="file" hidden ref={inputVideo}  id="customFileV" name="customFileV" onChange={(e) =>onChangeVideo(e)}
                accept=".mp4,.webm,.mov" multiple/>
                <div className="mini-preview-container-add-text">Añadir archivo</div>
              </div>
              :imageOrFile == 2? 
              <div onClick={() => onButtonClickFile()}   className="mini-preview-container-add">
                <FeatherIcon.Plus />
                <input type="file" hidden ref={inputFile}  id="customFileI" name="customFileI" onChange={(e) =>onChangeFile(e)}
                  accept=".pdf" multiple/>
                <input type="file" hidden ref={inputImage}  id="customFileF" name="customFileF" onChange={(e) =>onChangePhoto(e)}
                accept=".png,.gif,.jpg" multiple/>
                <input type="file" hidden ref={inputVideo}  id="customFileV" name="customFileV" onChange={(e) =>onChangeVideo(e)}
                accept=".mp4,.webm,.mov" multiple/>
                <div className="mini-preview-container-add-text">Añadir archivo</div>
              </div>
              :imageOrFile == 3?
              <div onClick={() => onButtonClickVideo()}   className="mini-preview-container-add">
                <FeatherIcon.Plus />
                <input type="file" hidden ref={inputFile}  id="customFileI" name="customFileI" onChange={(e) =>onChangeFile(e)}
                  accept=".pdf" multiple/>
                <input type="file" hidden ref={inputImage}  id="customFileF" name="customFileF" onChange={(e) =>onChangePhoto(e)}
                accept=".png,.gif,.jpg" multiple/>
                <input type="file" hidden ref={inputVideo}  id="customFileV" name="customFileV" onChange={(e) =>onChangeVideo(e)}
                accept=".mp4,.webm,.mov" multiple/>
                <div className="mini-preview-container-add-text">Añadir archivo</div>
              </div>:""
              }
            </li>
          </ul>
        </PerfectScrollbar>
      </div>
    </div>
  );
}
export default ChatNoMessage;