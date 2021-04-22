SearchUserByEmailOrUserName = () => {
  var socket = io();
  var input = document.getElementById("emails").value;
  document.getElementById("emails").value = "";
  socket.emit("SearchUserByEmailOrUsername", { email: input, usrname: input });
  socket.on("retrive SearchUserByEmailOrUsername", (data) => {
    $("#searchusers-list").html("");
    data.users.forEach((user) => {
      $("#searchusers-list").append(
        `<li>${user.name}<button type="button" onclick="AddUserContact('${user.u_id}')" data-dismiss="modal">Add</button></li>`
      );
    });
  });
};
AddUserContact = (u_id) => {
  console.log(u_id);
  var socket = io();
  socket.emit("AddContact", { u_id: u_id });
  socket.on("retrive Addcontact", (mssg) => {
    ChargeContacts();
    console.log(mssg);
    socket.emit("init message", {
      chat: mssg.chat,
      message: mssg.message,
    });
  });
};

ChargeContacts = () => {
  var socket = io();
  socket.emit("GetContacts");
  socket.on("retrive GetContacts", (contacts) => {
    //console.log(contacts);
    $("#contacts-list").empty();
    if (contacts.chats.length > 0) {
      var currentPage = 0;
      var my_uid = contacts.my_uid;
      contacts.chats.forEach((contact) => {
        console.log(contact);
        if (contact.chat_type === 0) {
          if (my_uid != contact.user_chat) {
            chat_name = contact.name;
            chat_initial = chat_name.substring(0, 1);
            if (contact.pphoto === "") {
              p = `<span class="avatar-title bg-info rounded-circle">${chat_initial}</span>`;
            } else {
              p = `<img src="/pphotoChat/'${chat_name}'" class="rounded-circle" alt="image">`;
            }
            $("#contacts-list").append(
              `<li class="list-group-item" i='${contact.chat_uid}' n='${chat_name}'>
                <div>
                  <figure class="avatar">
                    ${p}
                  </figure>
                </div>
                <div class="users-list-body">
                  <div>
                    <h5 class = 'last-message-user' i='${contact.chat_uid}'>${chat_name}</h5>
                    <p>${chat_name}</p>
                  </div>
                  <div class="users-list-action">
                    <div class="action-toggle">
                      <div class="dropdown">						
                        <a data-toggle="dropdown" href="#">
                          <i class="fa fa-ellipsis-h"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a href="#" class="dropdown-item" data-navigation-target="chats" onclick="NewChat('${contact.chat_uid}')">New chat</a>
                          <a href="#" data-navigation-target="contact-information" class="dropdown-item" onClick="profiledata('${contact.chat_uid}')">Profile</a>
                          <div class="dropdown-divider"></div>
                            <a href="#" class="dropdown-item text-danger">Block</a>
                          </div>
											
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>`
            );
          }
        }
      });
    }
  });
};

NewChat = (idchat) => {
  let socket = io();
  socket.emit("newChat", { chat_uid: idchat });
  socket.on("retrive newchat", () => {
    socket.emit("get chats");
  });
};
