import React,{useState,useRef,useEffect} from 'react';
import * as FeatherIcon from "react-feather";

export default function Participant({roomid,socket}) {
    const [videoTracks, setVideoTracks] = useState(false);
    const [audioTracks, setAudioTracks] = useState(false);
    //const [permision,setPermission] = useState(false);
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const imgRef = useRef(null);
    useEffect(() => {
        const getUserMediaVideo = async (status) => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({video: status,audio: true});
            videoRef.current.srcObject = stream;
            socket.emit('stream',{roomid,stream});
          } catch (err) {
            console.log(err);
          }
        };
        const getUserMediaAudio = async (status) => {
            try {
              const stream = await navigator.mediaDevices.getUserMedia({audio: status});
              audioRef.current.srcObject = stream;
              //socket.emit('stream',{roomid,stream});
            } catch (err) {
              console.log(err);
            }
        };
        getUserMediaVideo(videoTracks);
        //getUserMediaAudio(audioTracks);
    }, [videoTracks,audioTracks]);
    useEffect(() => {
        socket.on('stream',playVideo);
        return () => {
            socket.off('stream',playVideo);
        }
    }, []);
    const playVideo = ({stream}) =>{
        console.log('test video stream');
        imgRef.current.src = new MediaStream(stream);
    };
    const checkPermissionsVideo = () =>{
        setVideoTracks(!videoTracks);
    }
    const checkPermissionsAudio = () =>{
        setAudioTracks(!audioTracks);
    }
    return (
        <div className="participant">
            <h3>{roomid}</h3>
            <video ref={videoRef} autoPlay={true} />
            <audio ref={audioRef} autoPlay={true} muted={true} />
            <video ref={imgRef} autoPlay={true}/>
            {/* <img ref={reciveRef}/> */}
            <button className="btn btn-outline-light text-success" onClick={checkPermissionsVideo}>
                <FeatherIcon.Video/>
            </button> 
            <button className="btn btn-outline-light text-success" onClick={checkPermissionsAudio}>
                <FeatherIcon.Mic/>
            </button> 
        </div>
    )
}
