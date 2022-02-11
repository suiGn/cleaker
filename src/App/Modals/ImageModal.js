import React, { useEffect, useState } from "react";
import {
  Modal,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as FeatherIcon from "react-feather";

function ImageModal(props) {

    const{file, images, position, classP, message} = props

    const [modal, setModal] = useState(false);

    const [fileNow, setFileNow] = useState(false);

    const [positionNow, setPositionNow] = useState(0);

    const [imageWidth, setImageWidth] = useState(0);

    const [imageHeight, setImageHeight] = useState(0);

    const modalToggle = () => {
        setModal(!modal);
        if(!modal){
            setFileNow(images[position].file)
            setPositionNow(position)
        }
    }
    
    useEffect(() => {
        if(position&&images.length>0){
            setFileNow(images[position].file)
            setPositionNow(position)
        }
        ImageGet(file)
    },[file])

    function NextFileR(){
        let p =  positionNow<=(images.length-2)?positionNow+1:0
        setFileNow(images[(p)].file)
        setPositionNow(p)
    }

    function NextFileL(){
        let p =  positionNow!=0?positionNow-1:(images.length-1)
        setFileNow(images[(p)].file)
        setPositionNow(p)
    }

    function ClickedFile(i){
        setFileNow(images[(i)].file)
        setPositionNow(i)
        
    }

    useEffect(() => {
        window.addEventListener("keydown", downHandler);

        return () => {
            window.removeEventListener("keydown", downHandler);
        };
    });

    function downHandler(e){
         if (e.keyCode == '37') {
            NextFileL()
        }
        else if (e.keyCode == '39') {
            NextFileR()
        }
    }

    function ImageGet(file){
        const img = new Image();
        img.src = file;
        img.onload = () => {
        let awidht = img.width* .20
        let aheight = img.height* .20
        setImageWidth(img.width-awidht)
        setImageHeight(img.height-aheight)
        };
    }

    const ContenModal = (props)=>{
        const{file, images, classP} = props
        return(
        <div className={"modal-img-cont"} >
            <img  onClick={modalToggle} className={classP?classP:"card-img-top image-modal-image"} src={file} alt="image"
            />
            {/*<div onClick={modalToggle} className={classP?classP:"card-img-top img-modal-card"} style={{ backgroundImage: "url(" +file+ ")" }}></div>
            */}
            <Modal
            className="modal-dialog-zoom"
            isOpen={modal}
            toggle={modalToggle}
            centered
            >
            <ToastContainer />
            <div style={{
                position: "fixed",
                top: "-28px",
                background: "dimgrey",
                width: "276%",
                float: "revert",
                right: "-88%",
                height: "4%"}}>
                <span style={{
                position: "absolute",
                right: "3%"}}>
                <a href={fileNow} download="" style={{
                position: "relative",
                right: "10%"}}>
                    <FeatherIcon.Download/>
                </a>
                <a  onClick={modalToggle} style={{
                cursor: "pointer"}}>
                    <FeatherIcon.X/>
                </a>
                </span>
                <span style={{
                position: "absolute",
                left: "1%"}}>image</span>
            </div>
            <div className="img-preview-container-header">
                <div className="modal-body" style={{display: "contents"}}>
                    <div className="img-preview-container">
                        <div onClick={modalToggle} className={"img-preview-modal"} style={{ backgroundImage: "url(" +fileNow+ ")" }}></div>
                        {/*<img src={fileNow} className="img-preview" alt="image"/>*/}
                    </div>
                </div>
            </div>
            {images.length>1?
            <div style={{position: "fixed", right: "-380px"}}>
                <FeatherIcon.ArrowRight style={{cursor: "pointer", position: "absolute"}} onClick={()=>NextFileR()}/>
            </div>:""}
            {images.length>1?
            <div style={{position: "fixed", right: "900px"}}>
                <FeatherIcon.ArrowLeft style={{cursor: "pointer", position: "absolute"}} onClick={()=>NextFileL()}/>
            </div>:""}
            {images.length>1?
                <div className="image-modal">
                    <ul className="file-list">
                        {images.map((image, i) => (
                            <li>
                                <div className="mini-preview-container" 
                                style={{backgroundImage:"url("+image.file+")"}}
                                onClick={() => ClickedFile(i)}>
                                </div>
                            </li>
                            ))}
                    </ul>
               </div> 
               :""
            }
            </Modal>
        </div>)
    }

    return (
        <div className="img-chat-cont" style={ {height: imageHeight,width: imageWidth}}>               
            {message.unread_messages == 2?
            <div className="loader-image-chat"></div>:
            ""
            }
            {message.unread_messages == 2 ?
            <figure className="avatar img-chat" style={{filter: "blur(8px)"}}>
                <ContenModal file={message.file} images={images} position={position}/>
            </figure>
            :
            <figure className="avatar img-chat">
                <ContenModal file={message.file} images={images} position={position}/>
            </figure>
            }
            <div className="word-break">{message.message}</div>
        </div>
        )
    }

export default ImageModal;
