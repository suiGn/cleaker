import React, { useState, useEffect } from "react";
import { Input } from "reactstrap";
import * as FeatherIcon from "react-feather";
import "emoji-mart/css/emoji-mart.css";
import VideoThumbnail from 'react-video-thumbnail';

function ChatURLPreview(props) {

  const { ogTitle,setogTitle,twitterDescription,settwitterDescription,ogImage, 
    setogImage,viewUrlPreview, setviewUrlPreview} = props
  
  function Close() {
    setviewUrlPreview(true)
    setogTitle("")
    settwitterDescription("")
    setogImage("")
  }

  return (
    <div className="chat-footer chat-footer-preview" hidden={viewUrlPreview}>
      <div className="message-response-chat">
        <div className="word-break-chat response-from-chat">
          {ogTitle}
        </div>
        <div className="word-break-chat response-from-url">{twitterDescription}</div>
      </div>
      <div className="img-to-response">
        <div className="mini-preview-container-url" style={{ backgroundImage: "url(" + ogImage + ")" }}></div>
      </div>

      <div className="form-buttons" onClick={() => Close()}>
        <FeatherIcon.X />
      </div>
    </div>
  );
}

export default ChatURLPreview;
