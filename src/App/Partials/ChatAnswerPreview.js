import React, { useState, useEffect } from "react";
import { Input } from "reactstrap";
import * as FeatherIcon from "react-feather";
import "emoji-mart/css/emoji-mart.css";
import VideoThumbnail from 'react-video-thumbnail';

function ChatAnswerPreview(props) {

  const { setViewChatAnswerPreview, messageRespond, viewChatAnswerPreview } = props
  function Close() {
    setViewChatAnswerPreview(true)
  }

  return (
    <div className="chat-footer chat-footer-preview" hidden={viewChatAnswerPreview}>
      <div className="message-response-chat">
        <div className="word-break-chat response-from-chat">
          {messageRespond.name}
        </div>
        <div className="word-break-chat response-from-chat">{messageRespond.message}</div>
      </div>
      <div>
        {
          messageRespond.is_image ?
            <div className="mini-preview-container-chat" style={{ backgroundImage: "url(" + messageRespond.file + ")" }}>
            </div>
            : ""
        }
        {messageRespond.is_video ?
          <div className="mini-preview-container">
            <VideoThumbnail
              videoUrl={messageRespond.file}
              thumbnailHandler={(thumbnail) => { }}
              width={100}
              height={100}
            />
          </div>
          : ""}
      </div>

      <div className="form-buttons" onClick={() => Close()}>
        <FeatherIcon.X />
      </div>
    </div>
  );
}

export default ChatAnswerPreview;
