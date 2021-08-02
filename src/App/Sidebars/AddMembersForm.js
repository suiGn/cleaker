import PerfectScrollbar from "react-perfect-scrollbar";
import React, { useState, useEffect } from "react";
import { FormGroup,CustomInput
  } from "reactstrap";

function AddMembersForm(props) {

    const { addFriends,chooseFriendSearch,setAddFriends} = props;
    const [search, setSearch] = useState("");
    const [chooseFriendSearchN , setChooseFriendSearchN] = useState([]);
    const [chooseFriend , setChooseFriend] = useState([]);


    useEffect(() => {
        setChooseFriendSearchN(chooseFriendSearch)
        setChooseFriend(chooseFriendSearch)
      }, [chooseFriendSearch]);
    

    function searchUser(wordToSearch) {
        setSearch(wordToSearch);
        if (wordToSearch.length){
          var resultSearch = chooseFriend.filter((val) => {
            if(val.name.toLowerCase().includes(wordToSearch.toLowerCase())){
              return val
            }
          })
          setChooseFriendSearchN(resultSearch)
        }else{
          setChooseFriendSearchN(chooseFriend)
        }
      }

      function ModifyList(status, item) {
        if (status) {
          var newFriends = addFriends;
          item.checked = true;
          newFriends.push(item);
          setAddFriends(newFriends);
        } else {
          item.checked = false;
          var newFriends = addFriends;
          var removedFriend = newFriends.filter((val) => {
            return !val.user_chat.includes(item.user_chat);
          });
          setAddFriends(removedFriend);
        }
      }
      
    return (
    <div>
        <form>
            <input
            type="text"
            className="form-control"
            placeholder="Search contacts"
            value={search}
            onChange={(e) => searchUser(e.target.value)}
            />
        </form>
        <PerfectScrollbar>
            <FormGroup>
            {chooseFriendSearchN.map((item, i) => {
                return (
                <div style={{display: "flex"}}>
                    {item.checked ? (
                    <CustomInput
                        type="checkbox"
                        id={"customCheckbox" + i}
                        onChange={(e) => ModifyList(e.target.checked, item)}
                        defaultChecked
                    />
                    ) : (
                    <CustomInput
                        type="checkbox"
                        id={"customCheckbox" + i}
                        onChange={(e) => ModifyList(e.target.checked, item)}
                    />
                    )}
                    <div className="profile-image-holder rounded-circle mb-4">
                    <figure className="avatar">
                    {
                        (item.pphoto === "" || item.pphoto === null)?
                        <span className="avatar-title bg-info rounded-circle">
                        {item.name.substring(0, 1)}
                        </span>
                        :
                        <img src={item.pphoto} className="rounded-circle " alt="image" />
                    }
                    </figure>
                    </div>
                    <label>{item.name}</label>
                </div>
                );
            })}
            </FormGroup>
        </PerfectScrollbar>
      </div>
    )
}

export default AddMembersForm;