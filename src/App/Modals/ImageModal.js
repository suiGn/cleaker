import React, { useEffect, useState } from "react";
import {
  Modal,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as FeatherIcon from "react-feather";

function ImageModal(props) {

    const{inputPreview, file, images, position, classP} = props

    const [modal, setModal] = useState(false);

    const [fileNow, setFileNow] = useState(false);

    const [positionNow, setPositionNow] = useState(0);

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

    return (
        <div>
            <img  onClick={modalToggle} className={classP?classP:"card-img-top"} src={file} alt="image"
            />
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
            <div class="img-preview-container-header">
                <div class="modal-body" style={{display: "contents"}}>
                    <div class="img-preview-container">
                        <img src={fileNow} class="img-preview" alt="image"/>
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
        </div>);
    }

export default ImageModal;
