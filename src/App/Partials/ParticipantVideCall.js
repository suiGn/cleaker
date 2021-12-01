import React,{useEffect,useRef,useState} from 'react'

export default function ParticipantVideCall({chat,roomid,socket,isVoiceCall}) {
    const videoRef = useRef(null);
    const audioRef = useRef(null);

    //socket
    useEffect(() => {
        socket.on('streamAudio',playAudio);
        socket.on('stream',playVideo);
        return () => {
            socket.off('streamAudio',playAudio);
            socket.off('stream',playVideo);
        }
    }, []);
    const playAudio = ({stream}) =>{
        var blob = new Blob([stream], { 'type' : 'audio/ogg; codecs=opus' });
        //console.log(blob);
        audioRef.current.src = window.URL.createObjectURL(blob);
        audioRef.current.play();
    }
    const playVideo = ({stream})=>{
        //var blob = new Blob([stream],{type: "image/png"});
        //console.log(blob);
        videoRef.current.src = stream;
    }
    return (
        <div>
            {
                isVoiceCall?
                <div>
                    <img ref={videoRef} />
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
                </div>:
                <div>
                    <img ref={videoRef} />
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
               
            }
        </div>
    )
}
