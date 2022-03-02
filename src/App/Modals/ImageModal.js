import React, { useEffect, useState } from "react";
import {
  Modal,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as FeatherIcon from "react-feather";
import ImagePreview from "./ImagePreview";

function ImageModal(props) {

    const{file, images, position, classP, message, imgHeights, imgWidths, name, pphoto } = props

    const [p, setP] = useState("");

    useEffect(() => {
        if (pphoto === "" || pphoto === null) {
            let chat_initial = name.substring(0, 1);
            setP(
              <span className="avatar-title bg-info rounded-circle">
                {chat_initial}
              </span>
            );
          } else {
            setP(<img src={pphoto} className="rounded-circle" alt="image" />);
        }
    },[file])

    return (
        <div className="img-chat-cont" style={ {height: message.height,width: message.width}}>               
            {message.unread_messages == 2?
            <div className="loader-image-chat"></div>:
            ""
            }
            {message.unread_messages == 2 ?
            <figure className="avatar img-chat" style={{filter: "blur(8px)"}}>
                <ImagePreview file={file} images={images} position={position} classP={classP} name={name}  p={p}/>
            </figure>
            :
            <figure className="avatar img-chat">
                {/*<div className={"modal-img-cont"} >
                    <img  className={classP?classP:"card-img-top image-modal-image"} 
                    src={file} alt="image" onLoad={ImageSize(file)}
                    />
            </div>*/}
                <ImagePreview file={file} images={images} position={position} classP={classP} name={name}  p={p}/>
            </figure>
            }
            <div className="word-break">{message.message}</div>
        </div>
        )
    }

export default ImageModal;
