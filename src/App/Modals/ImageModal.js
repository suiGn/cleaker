import React, { useEffect, useState } from "react";
import {
  Modal,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as FeatherIcon from "react-feather";
import ImagePreview from "./ImagePreview";

function ImageModal(props) {

    const{file, images, position, classP, message, imgHeights, imgWidths } = props

    const [imageWidth, setImageWidth] = useState(0);

    const [imageHeight, setImageHeight] = useState(0);

    const [loaded, setLoaded] = useState(0);


    
    function ImageGet(file){
        const img = new Image();
        img.src = file;
        img.onload = () => {
        let awidht = img.width* .60
        let aheight = img.height* .60
        setImageWidth(awidht)
        setImageHeight(aheight)
        };
    }

    function ImageSize(file){
        console.log(file)

    }

    useEffect(() => {
        ImageGet(file)
    },[imgWidths])

    return (
        <div className="img-chat-cont" style={ {height: imageHeight,width: imageWidth}}>               
            {message.unread_messages == 2?
            <div className="loader-image-chat"></div>:
            ""
            }
            {message.unread_messages == 2 ?
            <figure className="avatar img-chat" style={{filter: "blur(8px)"}}>
                <ImagePreview file={file} images={images} position={position} classP={classP}/>
            </figure>
            :
            <figure className="avatar img-chat">
                <div className={"modal-img-cont"} >
                    <img  className={classP?classP:"card-img-top image-modal-image"} 
                    src={file} alt="image" onLoad={ImageSize(file)}
                    />
                </div>
                
            </figure>
            }
            <div className="word-break">{message.message}</div>
        </div>
        )
    }

export default ImageModal;
