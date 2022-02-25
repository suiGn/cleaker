import React, { useEffect, useState } from "react";
import {Modal} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as FeatherIcon from "react-feather";

function ImagePreview(props) {
    const{file, images, classP, position, name, p} = props

    const [modal, setModal] = useState(false);

    const [fileNow, setFileNow] = useState(false);

    const [positionNow, setPositionNow] = useState(0);

    useEffect(() => {
        if(position&&images.length>0&&images){
            if(typeof images[position] === "undefined") {
                return}
            setFileNow(images[position].file)
            setPositionNow(position)
        }
    },[file])

    const modalToggle = () => {
        setModal(!modal);
        if(!modal){
            setFileNow(images[position].file)
            setPositionNow(position)
        }
    }

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

    return(
        <div className={"modal-img-cont"} >
            <img  onClick={modalToggle} className={classP?classP:"card-img-top image-modal-image"} src={file} alt="image"
            />
            <Modal
            className="modal-dialog-zoom modal-img"
            isOpen={modal}
            toggle={modalToggle}
            centered
            >
            <ToastContainer />
            <div className="top-bar">
                <span className="options" >
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
               
                {p?
                <span className="detail">
                    <figure className="avatar auto-img-sm">{p}</figure>
                    <div>
                        <h5> {name?name:"image"}</h5>
                    </div>
                </span>:
                <span className="detail">
                    {name?name:"image"}
                </span>}
               
            </div>
            <div className="img-preview-container-header">
                <div className="modal-body" style={{display: "contents"}}>
                    <div className="img-preview-container">
                        {/*<div onClick={modalToggle} className={"img-preview-modal"}
                        style={{ backgroundImage: "url(" +fileNow+ ")" }}></div>*/}
                        <img onClick={modalToggle} src={fileNow} className="img-preview" alt="image"/>
                    </div>
                </div>
            </div>
            {images.length>1?
            <div className="right">
                <FeatherIcon.ArrowRight style={{cursor: "pointer", position: "absolute"}} onClick={()=>NextFileR()}/>
            </div>:""}
            {images.length>1?
            <div className="left">
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
        </div>
    )
}
export default ImagePreview;