DeleteChat = (idchat) => {
  let socket = io();
  socket.emit("Delete Chat", { chat_uid: idchat });
  socket.on("retrive delete chat", () => {
    socket.emit("get chats");
  });
};
