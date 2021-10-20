import React,{useEffect,useRef,useState} from 'react'

export default function ParticipantVideCall({chat,roomid,socket}) {
    const videoRef = useRef(null);
    const audioRef = useRef(null);

    //socket
    useEffect(() => {
        socket.on('streamAudio',playAudio);
        return () => {
            socket.off('streamAudio',playAudio);
        }
    }, []);
    const playAudio = ({stream}) =>{
        var blob = new Blob([stream], { 'type' : 'audio/ogg; codecs=opus' });
        //console.log(blob);
        audioRef.current.src = window.URL.createObjectURL(blob);
        audioRef.current.play();
    }
    return (
        <div>
            <video ref={videoRef} autoPlay={true} />
            <audio ref={audioRef} type='audio/ogg; codecs=opus' />
            <div className="text-center">
                    <figure className="avatar user-profile mb-3">
                        {chat.pphoto==""||chat.pphoto==null?
                        <span className="avatar-title bg-info rounded-circle">
                            {chat.name.substring(0, 1)}
                        </span>:
                        <img src={chat.pphoto} className="rounded-circle" alt="image" />}
                    </figure>
                    <h5 className="mb-1">{chat.name}</h5>
            </div>
        </div>
    )
}
