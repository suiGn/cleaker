import React,{useState,useRef,useEffect} from 'react';
import * as FeatherIcon from "react-feather";

export default function Participant({roomid,socket}) {
    const [videoTracks, setVideoTracks] = useState([]);
    const [audioTracks, setAudioTracks] = useState([]);
    const [permision,setPermission] = useState(false);
    const videoRef = useRef(null);
    const audioRef = useRef();
    useEffect(() => {
        const getUserMedia = async (status) => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({video: status,audio:true});
            videoRef.current.srcObject = stream;
            //socket.emit('stream',{roomid,stream});
          } catch (err) {
            console.log(err);
          }
        };
        getUserMedia(permision);
    }, [permision]);
    const checkPermissions = () =>{
        setPermission(!permision);
    }
    return (
        <div className="participant">
            <h3>{roomid}</h3>
            <video ref={videoRef} autoPlay={true} />
            <audio ref={audioRef} autoPlay={true} muted={true} />
            {/* <img ref={reciveRef}/> */}
            <button onClick={checkPermissions}>
                
                <FeatherIcon.Video/>
            </button> 
        </div>
    )
}
