import React,{useState,useRef,useEffect} from 'react'

export default function Participant({roomid,socket}) {
    const [videoTracks, setVideoTracks] = useState([]);
    const [audioTracks, setAudioTracks] = useState([]);
    const [permision,setPermission] = useState(false);
    const videoRef = useRef(null);
    const audioRef = useRef();
    useEffect(() => {
        const getUserMedia = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true,audio:true});
            videoRef.current.srcObject = stream;
            //socket.emit('stream',{roomid,stream});
          } catch (err) {
            console.log(err);
          }
        };
        getUserMedia();
    }, []);
    return (
        <div className="participant">
            <h3>{roomid}</h3>
            <video ref={videoRef} autoPlay={true} />
            <audio ref={audioRef} autoPlay={true} muted={true} />
            {/* <img ref={reciveRef}/> */}
            {/* <button onClick={checkPermissions}>
                Permissions button {permision}
            </button> */}
        </div>
    )
}
