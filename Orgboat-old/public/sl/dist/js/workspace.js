$(document).ready(function () {
  var socket = io();
  var chats;
  var my_uid;
  var currentPage = 0;
  var chat_selected;
  var name_chat_selected;
  socket.emit("get chats");

  socket.on("retrieve chats", function (response) {
    my_uid = response.my_uid;
    chats = response.chats;
    $("#chats-list").html(""); //Clean chat div
    if (chats.length > 0) {
      var last_chat;
      chats.forEach((chat) => {
        console.log(chat);
        //var pphoto =
        //Chat_type = 0 = 1:1
        if (
          chat.chat_type == 0 &&
          chat.archiveChat == 0 &&
          chat.delete_chat == 0
        ) {
          var chat_initial;
          var chat_name;
          var chat_with_usr = chat.user_chat;
          if (my_uid != chat.user_chat) {
            chat_name = chat.name;
            chat_initial = chat_name.substring(0, 1);
            var timeMessage = new Date(chat.last_message_time);
            var timeLabel;
            var today = new Date();
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (
              timeMessage.getDate() == today.getDate() &&
              timeMessage.getMonth() == today.getMonth() &&
              timeMessage.getFullYear() == today.getFullYear()
            ) {
              timeLabel = timeformat(timeMessage);
            } else if (
              timeMessage.getDate() == yesterday.getDate() &&
              timeMessage.getMonth() == yesterday.getMonth() &&
              timeMessage.getFullYear() == yesterday.getFullYear()
            ) {
              timeLabel = "Yesterday";
            } else {
              timeLabel = getDateLabel(timeMessage);
            }
            //var pphotoUser = new File([""], chat.pphoto);
            //var p = "";
            console.log(chat.pphoto);
            if (chat.pphoto === "") {
              p = `<span class="avatar-title bg-info rounded-circle">${chat_initial}</span>`;
            } else {
              p = `<img src="/pphotoChat/'${chat_name}'" class="rounded-circle" alt="image">`;
            }
            $("#chats-list").append(`    
      <li class="list-group-item chat-conversation-select" i='${
        chat.chat_uid
      }' n='${chat_name}' t='${timeMessage.getTime()}' u='${chat_with_usr}'>					
      <div>
      <figure class="avatar">
      ${p}
      </figure>
      </div>				
      <div class="users-list-body">
      <div>
      <h5 class = 'last-message-user' i='${chat.chat_uid}'>${chat_name}</h5>
      <p class = 'last-message-chat' i='${chat.chat_uid}'>${
              chat.last_message_message
            }</p>
      </div>				
      <div class="users-list-action">
      <div class="new-message-count d-none" i='${
        chat.chat_uid
      }' style='height:9px; width:9px; margin-bottom: 12px;' ></div>
      <small class="text-muted last-message-time" i='${
        chat.chat_uid
      }'>${timeLabel} 111</small>
      <div class="action-toggle">
      <div class="dropdown">						
      <a data-toggle="dropdown" href="#">
      <i class="fa fa-ellipsis-h"></i>
      </a>					
      <div class="dropdown-menu dropdown-menu-right">
      <a href="#" class="dropdown-item">Open</a>
      <button onClick="profiledata('${
        chat.chat_uid
      }')" data-navigation-target="contact-information" class="dropdown-item">Profile</button>
      <a href="#" onClick="ArchiveChat('${
        chat.chat_uid
      }')" class="dropdown-item">Add to archive</a>
      <div class="dropdown-divider"></div>
      <a href="#" class="dropdown-item text-danger" onclick="DeleteChat('${
        chat.chat_uid
      }')">Delete</a>
      </div>					
      </div>
      </div>							
      </div>					
      </div>
      </li>
		`);
          }
        } else if (chat.chat_type == 1) {
          if (chat.user_chat == chat.last_message_user_uid) {
            var chat_name = chat.chat_name;
            var chat_with_usr = chat.user_chat;
            var chat_initial = chat_name.substring(0, 1);
            var timeMessage = new Date(chat.last_message_time);
            var timeLabel;
            var today = new Date();
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (
              timeMessage.getDate() == today.getDate() &&
              timeMessage.getMonth() == today.getMonth() &&
              timeMessage.getFullYear() == today.getFullYear()
            ) {
              timeLabel = timeformat(timeMessage);
            } else if (
              timeMessage.getDate() == yesterday.getDate() &&
              timeMessage.getMonth() == yesterday.getMonth() &&
              timeMessage.getFullYear() == yesterday.getFullYear()
            ) {
              timeLabel = "Ayer";
            } else {
              timeLabel = getDateLabel(timeMessage);
            }

            $("#chats-list").append(`    
     <li class="list-group-item chat-conversation-select" i='${
       chat.chat_uid
     }' n='${chat_name}' t='${timeMessage.getTime()}' u='${chat_with_usr}'>
     <div>
     <figure class="avatar">
     <span class="avatar-title bg-info rounded-circle">${chat_initial}</span>
     </figure>
     </div>
     <div class="users-list-body">
     <div>
     <h5 class = 'last-message-user' i='${chat.chat_uid}'>${chat_name}</h5>
     <p class = 'last-message-chat' i='${chat.chat_uid}'>${chat.name}: ${
              chat.last_message_message
            }</p>
     </div>
     <div class="users-list-action">
     <div class="new-message-count d-none" i='${
       chat.chat_uid
     }' style='height:9px; width:9px; margin-bottom: 12px;' ></div>
     <small class="text-muted last-message-time" i='${
       chat.chat_uid
     }'>${timeLabel}</small>
     <div class="action-toggle">
     <div class="dropdown">
     <a data-toggle="dropdown" href="#">
     <i class="fa fa-ellipsis-h"></i>
     </a>
     <div class="dropdown-menu dropdown-menu-right">
     <a href="#" class="dropdown-item">Open</a>
     <button onClick="profiledata('${
       chat.chat_uid
     }')" data-navigation-target="contact-information" class="dropdown-item">Profile</button>
     <a href="#" onClick="ArchiveChat('${
       chat.chat_uid
     }')" class="dropdown-item">Add to archive</a>
     <div class="dropdown-divider"></div>
     <a href="#" class="dropdown-item text-danger">Delete</a>
     </div>
     </div>
     </div>
     </div>
     </div>
     </li>
		`);
          }
        }
      });
    }

    // When user selects a conversation
    $(".chat-conversation-select").click(function () {
      var chat_body = $(".layout .content .chat .chat-body");
      chat_body
        .scrollTop(chat_body.get(0).scrollHeight, -1)
        .niceScroll({
          cursorcolor: "rgba(66, 66, 66, 0.20)",
          cursorwidth: "4px",
          cursorborder: "0px",
        })
        .resize();
      //End user SKU
      var id = $(this).attr("i");
      chat_selected = id;
      $(`.last-message-user[ i = '${chat_selected}']`).removeClass(
        "text-primary"
      );
      $(`.new-message-count[ i = '${chat_selected}']`).addClass("d-none");
      $(`.last-message-time[ i = '${chat_selected}']`).addClass("text-muted");
      $(`.last-message-time[ i = '${chat_selected}']`).removeClass(
        "text-primary"
      );
      $("#chat-name").text($(this).attr("n"));
      $("#conversation-opts").html(""); //Reset chat Options
      $("#nochatselected").html(""); //Clean chat div
      $("#conversation-opts").append(`
                        <li class="list-inline-item d-xl-none d-inline">
                            <a href="#" class="btn btn-outline-light mobile-navigation-button">
                                <i data-feather="menu"></i>
                            </a>
                        </li>
                        <li class="list-inline-item" data-toggle="tooltip" title="Voice call">
                            <a href="#" class="btn btn-outline-light text-success" data-toggle="modal"
                               data-target="#call">
                                <i class="fas fa-phone-alt"></i>
                            </a>
                        </li>
                        <li class="list-inline-item" data-toggle="tooltip" title="Video call">
                            <a href="#" class="btn btn-outline-light text-warning" data-toggle="modal"
                               data-target="#videoCall">
                                 <i class="fa fa-video"></i>
				
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="#" class="btn btn-outline-light" data-toggle="dropdown">
                               <i class="fa fa-ellipsis-h"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <button onClick="profiledata('${chat_selected}')" data-navigation-target="contact-information" class="dropdown-item">Profile</button>
                                <a href="#" onClick="ArchiveChat('${chat_selected}')" class="dropdown-item">Add to archive</a>
                                <a href="#" class="dropdown-item" onclick="DeleteChat('${chat_selected}')">Delete</a>
                                <div class="dropdown-divider"></div>
                                <a href="#" class="dropdown-item text-danger">Block</a>
                            </div>
                        </li>
        `);
      $(".chat-footer").html(""); //Clean chat div
      $(".chat-footer").append(`
                <form>
                    <div>
                        <button class="btn btn-light mr-3" data-toggle="tooltip" title="Emoji" type="button">
						<i class="far fa-smile-wink"></i>
                        </button>
                    </div>
                    <input type="text" class="form-control" placeholder="Write a message.">
                    <div class="form-buttons">
                        <button class="btn btn-light" data-toggle="tooltip" title="Add files" type="button">
						<i class="fas fa-paperclip"></i>
                        </button>
                        <button class="btn btn-light" data-toggle="tooltip"
                                title="Send a voice record" type="button">
					<i class="fas fa-microphone-alt"></i>
                        </button>
                        <button class="btn btn-primary" type="submit">
						<i class="far fa-paper-plane"></i>
                        </button>
                    </div>
                </form>
				`);
      //Get the messages
      socket.emit("get messages", { id: id, page: currentPage + 1 });
    });
  });
  socket.on("chat message", function (msg) {
    console.log(msg.from_name);
    var time = new Date(msg.time);
    var timeRecive = timeformat(time);
    if (msg.chat == chat_selected) {
      SohoExamle.Message.receive(
        msg.message,
        timeRecive,
        msg.type,
        msg.from_name
      );
    } else {
      $(`.last-message-user[ i = '${msg.chat}']`).addClass("text-primary");
      $(`.new-message-count[ i = '${msg.chat}']`).removeClass("d-none");
      $(`.last-message-time[ i = '${msg.chat}']`).removeClass("text-muted");
      $(`.last-message-time[ i = '${msg.chat}']`).addClass("text-primary");
    }

    var msg_name = msg.from_name.split(" ")[0];
    if (msg.type == 1) {
      $(`.last-message-chat[ i = '${msg.chat}']`).text(
        `${msg_name}: ${msg.message}`
      );
    } else {
      $(`.last-message-chat[ i = '${msg.chat}']`).text(msg.message);
    }

    $(`.last-message-time[ i = '${msg.chat}']`).text(timeRecive);
    $(`.chat-conversation-select[ i = '${msg.chat}']`).attr(
      "t",
      time.getTime()
    );
    reorderChats();
  });

  //Client request the messages
  socket.on("retrieve messages", function (response) {
    var pphoto = "";
    var name = "";
    $(".layout .content .chat .chat-body .messages").html("");
    if (response.messages.length > 0) {
      messages = response.messages.reverse();
      actualLabelDate = "";
      messages.forEach((message) => {
        message_user_uid = message.message_user_uid;
        //console.log(message)
        var chat_body = $(".layout .content .chat .chat-body");
        var dateSend = new Date(message.time);
        var timeSend = timeformat(dateSend);
        var dateLabel = getDateLabel(dateSend);
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        var yesterdayLabel = getDateLabel(yesterday);
        var todayLabel = getDateLabel(new Date());

        if (dateLabel == yesterdayLabel) {
          dateLabel =
            "&#160;&#160;&#160;&#160;&#160;&#160;Ayer&#160;&#160;&#160;&#160;&#160;&#160;";
        } else if (dateLabel == todayLabel) {
          dateLabel =
            "&#160;&#160;&#160;&#160;&#160;&#160;Hoy&#160;&#160;&#160;&#160;&#160;&#160;";
        }
        if (actualLabelDate == dateLabel) {
        } else {
          actualLabelDate = dateLabel;
          $(".layout .content .chat .chat-body .messages").append(
            `<div class="message-item messages-divider sticky-top" data-label="${actualLabelDate}"></div>`
          );
        }
        var out = my_uid == message_user_uid ? "outgoing-message" : "";
        var ticks =
          my_uid == message_user_uid ? '<i class="fas fa-check"></i>' : ""; // double checked
        var usrname =
          message.chat_type == 1 && my_uid != message_user_uid
            ? `${message.name}: `
            : "";
        if (my_uid != message_user_uid) {
          pphoto = message.pphoto;
          name = message.name;
        }

        $(".layout .content .chat .chat-body .messages").append(
          `
          <div class="message-item ${out}">					
                        ${usrname}
                        <div class="message-content">
                        <a href="#" class="btn btn-outline-light" data-toggle="dropdown">
                               <i class="fa fa-ellipsis-h"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a href="#" class="dropdown-item" onclick="DeleteChat('${chat_selected}')">Delete</a>
                            </div>
                         ` +
            message.message +
            `
                          <div class="message-avatar">
                            <div>
                                <div class="time">${timeSend} ${ticks}</div>
                            </div>
                          </div>
                        </div>
                    </div>`
        );
        chat_body
          .scrollTop(chat_body.get(0).scrollHeight, -1)
          .niceScroll({
            cursorcolor: "rgba(66, 66, 66, 0.20)",
            cursorwidth: "4px",
            cursorborder: "0px",
          })
          .resize();
        $(".chat-header-user figure").empty();
      });
      if (pphoto === "") {
        $(".chat-header-user figure").append(
          `<span class="avatar-title bg-info rounded-circle">${name.substring(
            0,
            1
          )}</span>`
        );
      } else {
        $(".chat-header-user figure").append(
          `<img src="/pphotoChat/'${name}'" class="rounded-circle" alt="image"></img>`
        );
      }
    }
  });
  //Function when the user send a message
  $(document).on(
    "submit",
    ".layout .content .chat .chat-footer form",
    function (e) {
      var input = $(this).find("input[type=text]");
      var message = input.val();
      message = $.trim(message);
      if (message) {
        socket.emit("chat message", { chat: chat_selected, message: message });
        time = new Date();
        timeSend = timeformat(time);
        $(`.last-message-time[ i = '${chat_selected}']`).text(timeSend);
        $(`.last-message-chat[ i = '${chat_selected}']`).text(message);
        $(`.chat-conversation-select[ i = '${chat_selected}']`).attr(
          "t",
          time.getTime()
        );
        SohoExamle.Message.send(message, timeSend);
        input.val("");
        reorderChats();
      } else {
        input.focus();
      }
    }
  );

  $(document).on(
    "submit",
    ".layout .content .chat .chat-footer form",
    function (e) {
      e.preventDefault();
    }
  );

  var SohoExamle = {
    Message: {
      send: function (message, timeSend) {
        var chat_body = $(".layout .content .chat .chat-body");
        if (chat_body.length > 0) {
          $(".layout .content .chat .chat-body .messages").append(
            `<div class="message-item outgoing-message">
                        <div class="message-content" >
                          ` +
              message +
              `
                          <div class="message-avatar">
                            <div>
                                <div class="time">${timeSend} <i class="fas fa-check"></i></div>
                            </div>
                          </div>
                        </div>
                        
                    </div>`
          );

          setTimeout(function () {
            chat_body
              .scrollTop(chat_body.get(0).scrollHeight, -1)
              .niceScroll({
                cursorcolor: "rgba(66, 66, 66, 0.20)",
                cursorwidth: "4px",
                cursorborder: "0px",
              })
              .resize();
          }, 200);
        }
      },
      receive: function (message, timeRecive, type, from_name) {
        var chat_body = $(".layout .content .chat .chat-body");
        if (chat_body.length > 0) {
          var usrname = type == 1 ? `${from_name}: ` : "";
          $(".layout .content .chat .chat-body .messages").append(
            `<div class="message-item">
                        ${usrname}
                        <div class="message-content">
                           ` +
              message +
              `
                          <div class="message-avatar">
                              <div>
                                  <div class="time">${timeRecive} <i class="fas fa-check"></i></div>
                              </div>
                          </div>
                        </div>
                    </div>`
          );

          setTimeout(function () {
            chat_body
              .scrollTop(chat_body.get(0).scrollHeight, -1)
              .niceScroll({
                cursorcolor: "rgba(66, 66, 66, 0.20)",
                cursorwidth: "4px",
                cursorborder: "0px",
              })
              .resize();
          }, 200);
        }
      },
    },
  };

  $(document).on(
    "click",
    ".layout .content .sidebar-group .sidebar .list-group-item",
    function () {
      $(this).closest(".sidebar-group").removeClass("mobile-open");
    }
  );
});

function reorderChats() {
  var ul = $("ul#chats-list"),
    li = ul.children("li");
  li.detach().sort(function (a, b) {
    return $(b).attr("t") - $(a).attr("t");
  });
  ul.append(li);
}

function timeformat(date) {
  var h = date.getHours();
  var m = date.getMinutes();
  var x = h >= 12 ? "PM" : "AM";
  h = h % 12;
  h = h ? h : 12;
  m = m < 10 ? "0" + m : m;
  var mytime = h + ":" + m + " " + x;
  return mytime;
}

function getDateLabel(date) {
  dateLabelDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  dateLabelMonth =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  dateLabelYear = date.getFullYear();
  dateLabel = dateLabelDate + "/" + dateLabelMonth + "/" + dateLabelYear;
  return dateLabel;
}

function profiledata(id) {
  var socket = io();
  socket.emit("ViewProfile", { id: id });
  socket.on("retrieve viewprofile", function (data) {
    UiProfile(data);
  });
}
function ownprofile(id) {
  var socket = io();
  socket.emit("ViewOwnProfile", { id: id });
  socket.on("retrieve viewownprofile", function (data) {
    UiProfile(data);
  });
}

UiProfile = (data) => {
  $(".avatar.avatar-xl.mb-4.Profile").empty();
  if (data.usrprofile[0].pphoto === "") {
    $(".avatar.avatar-xl.mb-4.Profile").append(
      `<span class="avatar-title bg-info rounded-circle">${data.usrprofile[0].name.substring(
        0,
        1
      )}</span>`
    );
  } else {
    $(".avatar.avatar-xl.mb-4.Profile").append(
      `<img src="/pphotoChat/'${data.usrprofile[0].name}'" class="rounded-circle" alt="image"></img>`
    );
  }
  $(".text-center h5.mb-1.Profile")[0].innerText = data.usrprofile[0].name;
  $(".tab-content div.tab-pane.fade.show.active.right-sidebar ").empty();
  $(".tab-content div.tab-pane.fade.show.active.right-sidebar ").append(
    `<p class="text-muted About">'${data.usrprofile[0].about}'
    </p>
    <div class="mt-4 mb-4">
      <h6>
        <i class="fas fa-phone-alt" style="opacity: 69%;"></i> Phone
      </h6>
      <p class="text-muted">${data.usrprofile[0].phone}</p>
    </div>
    <div class="mt-4 mb-4">
      <h6><i class="fas fa-city" style="opacity: 69%;"></i> City</h6>
      <p class="text-muted">${data.usrprofile[0].city}</p>
    </div>
    <div class="mt-4 mb-4">
      <h6>
        <i class="fa fa-window-maximize" style="opacity: 69%;"></i>
        Website
      </h6>
      <p><a href="${data.usrprofile[0].website}">${data.usrprofile[0].website}</a></p>
    </div>

    <div class="mt-4 mb-4">
      <h6 class="mb-3">Settings</h6>
      <div class="form-group">
        <div class="form-item custom-control custom-switch">
          <input
            type="checkbox"
            class="custom-control-input"
            id="customSwitch11"
          />
          <label class="custom-control-label" for="customSwitch11"
            >Block</label
          >
        </div>
      </div>
      <div class="form-group">
        <div class="form-item custom-control custom-switch">
          <input
            type="checkbox"
            class="custom-control-input"
            checked=""
            id="customSwitch12"
          />
          <label class="custom-control-label" for="customSwitch12"
            >Mute</label
          >
        </div>
      </div>
      <div class="form-group">
        <div class="form-item custom-control custom-switch">
          <input
            type="checkbox"
            class="custom-control-input"
            id="customSwitch13"
          />
          <label class="custom-control-label" for="customSwitch13"
            >Get notification</label
          >
        </div>
      </div>
    </div>`
  );
};

function ChatArchive(user) {
  //console.log(user);
  var socket = io();
  socket.emit("get chats archived");
  socket.on("retrieve chats archived", function (data) {
    var my_uid = data.my_uid;
    var chats = data.chats;
    chatlist(my_uid, chats, "#chats-archive-list", 0, "Unarchive");
  });
}
function SendMessage(chat_selected) {
  var socket = io();
  //console.log("Send");
  var SohoExamle = {
    Message: {
      send: function (message, timeSend) {
        var chat_body = $(".layout .content .chat .chat-body");
        if (chat_body.length > 0) {
          $(".layout .content .chat .chat-body .messages").append(
            `<div class="message-item outgoing-message">
                        <div class="message-content" >
                          ` +
              message +
              `
                          <div class="message-avatar">
                            <div>
                                <div class="time">${timeSend} <i class="fas fa-check"></i></div>
                            </div>
                          </div>
                        </div>
                        
                    </div>`
          );

          setTimeout(function () {
            chat_body
              .scrollTop(chat_body.get(0).scrollHeight, -1)
              .niceScroll({
                cursorcolor: "rgba(66, 66, 66, 0.20)",
                cursorwidth: "4px",
                cursorborder: "0px",
              })
              .resize();
          }, 200);
        }
      },
      receive: function (message, timeRecive, type, from_name) {
        var chat_body = $(".layout .content .chat .chat-body");
        if (chat_body.length > 0) {
          var usrname = type == 1 ? `${from_name}: ` : "";
          $(".layout .content .chat .chat-body .messages").append(
            `<div class="message-item">
                        ${usrname}
                        <div class="message-content">
                           ` +
              message +
              `           
                            <div class="message-avatar">
                              <div>
                                <div class="time">${timeRecive} <i class="fas fa-check"></i></div>
                              </div>
                          </div>
                        </div>
                    </div>`
          );

          setTimeout(function () {
            chat_body
              .scrollTop(chat_body.get(0).scrollHeight, -1)
              .niceScroll({
                cursorcolor: "rgba(66, 66, 66, 0.20)",
                cursorwidth: "4px",
                cursorborder: "0px",
              })
              .resize();
          }, 200);
        }
      },
    },
  };
  var input = $(".layout .content .chat .chat-footer form").find(
    "input[type=text]"
  );
  var message = input.val();
  message = $.trim(message);
  if (message) {
    socket.emit("chat message", { chat: chat_selected, message: message });
    time = new Date();
    timeSend = timeformat(time);
    $(`.last-message-time[ i = '${chat_selected}']`).text(timeSend);
    $(`.last-message-chat[ i = '${chat_selected}']`).text(message);
    $(`.chat-conversation-select[ i = '${chat_selected}']`).attr(
      "t",
      time.getTime()
    );
    SohoExamle.Message.send(message, timeSend);
    input.val("");
    reorderChats();
  } else {
    input.focus();
  }
}

function ArchiveChat(chat_selected) {
  console.log("Archivar");
  var socket = io();
  socket.emit("archived chat", { chat: chat_selected });
  socket.on("archived response", function () {
    socket.emit("get chats");
  });
}
function GetChats() {
  //console.log("Chat");
  var socket = io();
  socket.emit("get chats");
}

function Unarchive(chat_selected) {
  var socket = io();
  socket.emit("Unarchive chat", { chat: chat_selected });
  socket.on("Unarchive response", function (data) {
    ChatArchive();
  });
}
chatlist = (my_uid, chats, seccion, chatType, arhive) => {
  var socket = io();
  var currentPage = 0;
  var chat_selected;
  $(seccion).html(""); //Clean chat div
  if (chats.length > 0) {
    var last_chat;
    chats.forEach((chat) => {
      if (chat.chat_type == 0 && chat.archiveChat != chatType) {
        var chat_initial;
        var chat_name;
        var chat_with_usr = chat.user_chat;
        if (my_uid != chat.user_chat) {
          chat_name = chat.name;
          chat_initial = chat_name.substring(0, 1);
          var timeMessage = new Date(chat.last_message_time);
          var timeLabel;
          var today = new Date();
          var yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          if (
            timeMessage.getDate() == today.getDate() &&
            timeMessage.getMonth() == today.getMonth() &&
            timeMessage.getFullYear() == today.getFullYear()
          ) {
            timeLabel = timeformat(timeMessage);
          } else if (
            timeMessage.getDate() == yesterday.getDate() &&
            timeMessage.getMonth() == yesterday.getMonth() &&
            timeMessage.getFullYear() == yesterday.getFullYear()
          ) {
            timeLabel = "Yesterday";
          } else {
            timeLabel = getDateLabel(timeMessage);
          }
          if (chat.pphoto === "") {
            p = `<span class="avatar-title bg-info rounded-circle">${chat_initial}</span>`;
          } else {
            p = `<img src="/pphotoChat/'${chat_name}'" class="rounded-circle" alt="image">`;
          }
          $(seccion).append(`    
      <li class="list-group-item chat-conversation-select" i='${
        chat.chat_uid
      }' n='${chat_name}' t='${timeMessage.getTime()}' u='${chat_with_usr}'>					
      <div>
      <figure class="avatar">
      ${p}
      </figure>
      </div>				
      <div class="users-list-body">
      <div>
      <h5 class = 'last-message-user' i='${chat.chat_uid}'>${chat_name}</h5>
      <p class = 'last-message-chat' i='${chat.chat_uid}'>${
            chat.last_message_message
          }</p>
      </div>				
      <div class="users-list-action">
      <div class="new-message-count d-none" i='${
        chat.chat_uid
      }' style='height:9px; width:9px; margin-bottom: 12px;' ></div>
      <small class="text-muted last-message-time" i='${
        chat.chat_uid
      }'>${timeLabel} 111</small>
      <div class="action-toggle">
      <div class="dropdown">						
      <a data-toggle="dropdown" href="#">
      <i class="fa fa-ellipsis-h"></i>
      </a>					
      <div class="dropdown-menu dropdown-menu-right">
      <a href="#" class="dropdown-item">Open</a>
      <button onClick="profiledata('${
        chat.chat_uid
      }')" data-navigation-target="contact-information" class="dropdown-item">Profile</button>
      <a href="#" onClick="${arhive}('${
            chat.chat_uid
          }')"class="dropdown-item">${arhive}</a>
      <div class="dropdown-divider"></div>
      <a href="#" class="dropdown-item text-danger" onclick="DeleteChat('${chat_selected}')">Delete</a>
      </div>					
      </div>
      </div>							
      </div>					
      </div>
      </li>
		`);
        }
      } else if (chat.chat_type == 1) {
        if (chat.user_chat == chat.last_message_user_uid) {
          var chat_name = chat.chat_name;
          var chat_with_usr = chat.user_chat;
          var chat_initial = chat_name.substring(0, 1);
          var timeMessage = new Date(chat.last_message_time);
          var timeLabel;
          var today = new Date();
          var yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          if (
            timeMessage.getDate() == today.getDate() &&
            timeMessage.getMonth() == today.getMonth() &&
            timeMessage.getFullYear() == today.getFullYear()
          ) {
            timeLabel = timeformat(timeMessage);
          } else if (
            timeMessage.getDate() == yesterday.getDate() &&
            timeMessage.getMonth() == yesterday.getMonth() &&
            timeMessage.getFullYear() == yesterday.getFullYear()
          ) {
            timeLabel = "Ayer";
          } else {
            timeLabel = getDateLabel(timeMessage);
          }

          $(seccion).append(`    
     <li class="list-group-item chat-conversation-select" i='${
       chat.chat_uid
     }' n='${chat_name}' t='${timeMessage.getTime()}' u='${chat_with_usr}'>
     <div>
     <figure class="avatar">
     <span class="avatar-title bg-info rounded-circle">${chat_initial}</span>
     </figure>
     </div>
     <div class="users-list-body">
     <div>
     <h5 class = 'last-message-user' i='${chat.chat_uid}'>${chat_name}</h5>
     <p class = 'last-message-chat' i='${chat.chat_uid}'>${chat.name}: ${
            chat.last_message_message
          }</p>
     </div>
     <div class="users-list-action">
     <div class="new-message-count d-none" i='${
       chat.chat_uid
     }' style='height:9px; width:9px; margin-bottom: 12px;' ></div>
     <small class="text-muted last-message-time" i='${
       chat.chat_uid
     }'>${timeLabel}</small>
     <div class="action-toggle">
     <div class="dropdown">
     <a data-toggle="dropdown" href="#">
     <i class="fa fa-ellipsis-h"></i>
     </a>
     <div class="dropdown-menu dropdown-menu-right">
     <a href="#" class="dropdown-item">Open</a>
     <button onClick="profiledata('${
       chat.chat_uid
     }')" data-navigation-target="contact-information" class="dropdown-item">Profile</button>
     <a href="#" onClick="${arhive}('${
            chat.chat_uid
          }')" class="dropdown-item">${arhive}</a>
     <div class="dropdown-divider"></div>
     <a href="#" class="dropdown-item text-danger" onclick="DeleteChat('${chat_selected}')">Delete</a>
     </div>
     </div>
     </div>
     </div>
     </div>
     </li>
		`);
        }
      }
    });
  }
  // When user selects a conversation
  $(".chat-conversation-select").click(function () {
    var chat_body = $(".layout .content .chat .chat-body");
    chat_body
      .scrollTop(chat_body.get(0).scrollHeight, -1)
      .niceScroll({
        cursorcolor: "rgba(66, 66, 66, 0.20)",
        cursorwidth: "4px",
        cursorborder: "0px",
      })
      .resize();
    //End user SKU
    var id = $(this).attr("i");
    chat_selected = id;
    $(`.last-message-user[ i = '${chat_selected}']`).removeClass(
      "text-primary"
    );
    $(`.new-message-count[ i = '${chat_selected}']`).addClass("d-none");
    $(`.last-message-time[ i = '${chat_selected}']`).addClass("text-muted");
    $(`.last-message-time[ i = '${chat_selected}']`).removeClass(
      "text-primary"
    );
    $("#chat-name").text($(this).attr("n"));
    $("#conversation-opts").html(""); //Reset chat Options
    $("#nochatselected").html(""); //Clean chat div
    $("#conversation-opts").append(`
                        <li class="list-inline-item d-xl-none d-inline">
                            <a href="#" class="btn btn-outline-light mobile-navigation-button">
                                <i data-feather="menu"></i>
                            </a>
                        </li>
                        <li class="list-inline-item" data-toggle="tooltip" title="Voice call">
                            <a href="#" class="btn btn-outline-light text-success" data-toggle="modal"
                               data-target="#call">
                                <i class="fas fa-phone-alt"></i>
                            </a>
                        </li>
                        <li class="list-inline-item" data-toggle="tooltip" title="Video call">
                            <a href="#" class="btn btn-outline-light text-warning" data-toggle="modal"
                               data-target="#videoCall">
                                 <i class="fa fa-video"></i>
				
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="#" class="btn btn-outline-light" data-toggle="dropdown">
                               <i class="fa fa-ellipsis-h"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <button onClick="profiledata('${chat_selected}')" data-navigation-target="contact-information" class="dropdown-item">Profile</button>
                                <a href="#" onClick="${arhive}('${chat_selected}')" class="dropdown-item">${arhive}</a>
                                <a href="#" class="dropdown-item" onclick="DeleteChat('${chat_selected}')">Delete</a>
                                <div class="dropdown-divider"></div>
                                <a href="#" class="dropdown-item text-danger">Block</a>
                            </div>
                        </li>
        `);
    $(".chat-footer").html(""); //Clean chat div
    $(".chat-footer").append(`
                <form onsubmit="SendMessage('${chat_selected}')">
                    <div>
                        <button class="btn btn-light mr-3" data-toggle="tooltip" title="Emoji" type="button">
						<i class="far fa-smile-wink"></i>
                        </button>
                    </div>
                    <input type="text" class="form-control" placeholder="Write a message.">
                    <div class="form-buttons">
                        <button class="btn btn-light" data-toggle="tooltip" title="Add files" type="button">
						<i class="fas fa-paperclip"></i>
                        </button>
                        <button class="btn btn-light" data-toggle="tooltip"
                                title="Send a voice record" type="button">
					<i class="fas fa-microphone-alt"></i>
                        </button>
                        <button class="btn btn-primary" type="submit">
						<i class="far fa-paper-plane"></i>
                        </button>
                    </div>
                </form>
				`);
    //Get the messages
    socket.emit("get messages", { id: id, page: currentPage + 1 });
  });
};
