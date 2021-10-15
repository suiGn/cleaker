import React, { useState, useRef,useEffect } from "react";
import { Button, Input } from "reactstrap";
import * as FeatherIcon from "react-feather";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { dark, light } from "@material-ui/core/styles/createPalette";
import FilePreview from "../Modals/FilePreview";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CustomInput
} from "reactstrap";
import axios from "axios";
import { Console } from "winston/lib/winston/transports";
import { is } from "core-js/core/object";

function ChatFooter(props) {
  const {isResponse,messageRespond,socket} = props
  const [emojiMenuOpen, setEmojiMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  //const [imgPreview, setImgPreview] = useState(false);
  //const [file, setFile] = useState(null);
  const inputMessage = useRef(null);
  const inputFile = useRef(null);
  const inputImage = useRef(null);
  const inputVideo = useRef(null);
  const inputPreview = useRef(null);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmojiMenuOpen(false);
    var textMessage = document.getElementById('inputMessage').value;
    if(textMessage!=""){
      if(isResponse){
        handleIsResponce();
      }else{
        document.getElementById('inputMessage').value=""
        props.onSubmit({
          text: textMessage,
          chat_uid: props.chat_uid,
          is_image: 0,
          is_file: 0,
          is_video: 0,
          ogTitle:props.ogTitle,
          twitterDescription:props.twitterDescription,
          ogImage:props.ogImage
        });
      }
      props.setogTitle("")
      props.settwitterDescription("")
      props.setogImage("")
    }
  };

  function handleIsResponce(){
    var textMessage = document.getElementById('inputMessage').value;
    if(messageRespond.is_file){
      props.onSubmit({
        text: textMessage,
        chat_uid: props.chat_uid,
        is_image: 0,
        is_file: 0,
        is_video: 0,
        response: messageRespond.message,
        response_from: messageRespond.name,
        responseFile: messageRespond.file,
        response_type:1
      });
    }else if(messageRespond.is_image){
      props.onSubmit({
        text: textMessage,
        chat_uid: props.chat_uid,
        is_image: 0,
        is_file: 0,
        is_video: 0,
        response: messageRespond.message,
        response_from: messageRespond.name,
        responseFile: messageRespond.file,
        response_type:2
      });
    }else if(messageRespond.is_video){
      props.onSubmit({
        text: textMessage,
        chat_uid: props.chat_uid,
        is_image: 0,
        is_file: 0,
        is_video: 0,
        response: messageRespond.message,
        response_from: messageRespond.name,
        responseFile: messageRespond.file,
        response_type:3
      });
    }else{
      props.onSubmit({
        text: textMessage,
        chat_uid: props.chat_uid,
        is_image: 0,
        is_file: 0,
        is_video: 0,
        response: messageRespond.message,
        response_from: messageRespond.name,
        response_type:0
      });
    }
    document.getElementById('inputMessage').value=""
  }

  const handleChange = (e) => {
    var text = e.target.value
    if(new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(text)) {
        props.socket.emit("GetUrlData", {
          text: text,
        });
        props.socket.on("retrieve GetUrlData", GetUrlData);
        return () => {
          props.socket.off("retrieve GetUrlData", GetUrlData);
        };
    }
    props.onChange(text);
  };

  function GetUrlData(data) {
    let ogTitle = data.data.ogTitle?data.data.ogTitle:""
    let ogDescription = data.data.ogDescription?data.data.ogDescription:""
    let ogImage = data.data.ogImage.url?data.data.ogImage.url:""
    props.setogTitle(ogTitle);
    props.settwitterDescription(ogDescription);
    props.setogImage(ogImage);
    props.setviewUrlPreview(false)
  }

  const EmojiMenuOpen = () => {
    setEmojiMenuOpen(!emojiMenuOpen);
  };

  const AddEmoji = (e) => {
    let emoji = e.native;
    var textMessage = document.getElementById('inputMessage').value;
    document.getElementById('inputMessage').value = textMessage + emoji
    //props.setInputMsg(textMessage+ emoji);
  };

  const onKeyDown = (e) => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      handleSubmit(e);
    }
  };

  function onChangeFile(e) {
    e.preventDefault();
    props.setImageOrFile(2)
    props.setFile(e.target.files)
    props.setViewPreview(true)
    
  }

  function onChangePhoto(e) {
    e.preventDefault();
    props.setImageOrFile(1)
    props.setFile(e.target.files)
    props.setViewPreview(true)
  }

  function onChangeVideo(e){
    e.preventDefault();
    props.setImageOrFile(3)
    props.setFile(e.target.files)
    props.setViewPreview(true)

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

  function GroupExit(){
    console.log("hola")
    props.group_exit = 0;
  }

  useEffect(() => {
    socket.on("retrieve MensajeSalirGrupoFoot", GroupExit );
    return () => {
      socket.off("retrieve MensajeSalirGrupoFoot", GroupExit);
    };
  });

  return (
    <div className="chat-footer">
      {/*<FilePreview inputPreview={inputPreview} imgPreview={props.imgPreview} file={props.file}/>*/}
      {props.group_exit?
        <div  style={{ textAlign:  "center"}} >No puedes escribir en este chat por que ya no estas en el grupo</div>
        :
        <form onSubmit={handleSubmit}>
          <div className="position-relative" style={{ display:  "flex"}} >
            <div
              onClick={EmojiMenuOpen}
              color="light"
              className="mr-3 no-border-button"
              title="Emoji"
            >
              <FeatherIcon.Smile />
            </div>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle tag="span" data-toggle="dropdown" aria-expanded={dropdownOpen}>
                  <div className="no-border-button" color="light">
                    <FeatherIcon.Paperclip />
                  </div>
                  <input type="file" hidden ref={inputFile}  id="customFileI" name="customFileI" onChange={(e) =>onChangeFile(e)}
                  accept=".pdf" multiple/>
                  <input type="file" hidden ref={inputImage}  id="customFileF" name="customFileF" onChange={(e) =>onChangePhoto(e)}
                  accept=".png,.gif,.jpg" multiple/>
                  <input type="file" hidden ref={inputVideo}  id="customFileV" name="customFileV" onChange={(e) =>onChangeVideo(e)}
                  accept=".mp4,.webm" multiple/>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => onButtonClickImage()}><FeatherIcon.Image/> Image</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => onButtonClickFile()}><FeatherIcon.File/> File</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => onButtonClickVideo()}><FeatherIcon.Video/> Video</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <span
              className={"emoji-picker " + (emojiMenuOpen ? "show" : "hidden ")}
            >
              <Picker
                onSelect={AddEmoji}
                theme={props.darkSwitcherTooltipOpen ? "light" : "dark"}
                showPreview={false}
                showSkinTones={false}
                set="apple"
              />
            </span>
          </div>
          <Input
            type="text"
            className="form-control"
            placeholder="Write a message."
            onChange={handleChange}
            onKeyDown={onKeyDown}
            ref={inputMessage}
            id={"inputMessage"}
            autocomplete="off"
          />
          <div className="form-buttons">
            <Button type="submit" color="primary">
              <FeatherIcon.Send />
            </Button>
          </div>
        </form>
      }
    </div>
  );
}

export default ChatFooter;
