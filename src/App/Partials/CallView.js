import React, { useState, useEffect } from "react";
import * as FeatherIcon from 'react-feather'

function CallView(props) {

  const { 
    viewCall,
    setViewCall
  } = props;

  useEffect(() => {
  },[])

  function CloseCall (){
    setViewCall(false)
  }

  return (
    <div className="chat" hidden={!viewCall}>
      <div className="action-button">
        <button type="button" onClick={CloseCall}
        className="btn btn-danger btn-floating btn-lg"
        data-dismiss="modal">
          <FeatherIcon.X/>
        </button>
      </div>
    </div>
  );
}
export default CallView;
