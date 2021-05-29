import React, { useState, useEffect } from "react";
import { Input } from "reactstrap";
import * as FeatherIcon from "react-feather";
import "emoji-mart/css/emoji-mart.css";
import VideoThumbnail from 'react-video-thumbnail';

function ChatAnswerPreview(props) {
  
  const {setViewChatAnswerPreview,messageRespond,viewChatAnswerPreview} = props
  function Close(){
    setViewChatAnswerPreview(true)
  }

  return (
    <div className="chat-footer chat-footer-preview" hidden={viewChatAnswerPreview}>
      <div className="preview-name">{messageRespond.name}</div>
      <textarea className="form-control input-preview"  value={messageRespond.message}  disabled="disabled"></textarea>
      {messageRespond.is_image?
      <div className="mini-preview-container" style={{backgroundImage:"url("+messageRespond.file+")"}}>
      </div>
      :""}
      {messageRespond.is_video?
      <div className="mini-preview-container">
        <VideoThumbnail
          videoUrl={messageRespond.file}
          thumbnailHandler={(thumbnail) => {}}
          width={100}
          height={100}
          />
      </div>
      :""}
      <div className="form-buttons" onClick={()=>Close()}>
          <FeatherIcon.X />
        </div>
    </div>
  );
}

export default ChatAnswerPreview;
