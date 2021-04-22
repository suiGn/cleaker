import React, {useState} from 'react'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import * as FeatherIcon from 'react-feather'

const FavoritesDropdown = (props) => {
    const {socket} =  props
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    function RemoveFavorite() {
        socket.emit("RemoveFavorite", { id: props.message.message_id });
        socket.emit('GetFavorites', props.my_uid);
    }
    function RemoveFavorite_To() {
        socket.emit("RemoveFavorite_to", { id: props.message.message_id });
        socket.emit('GetFavorites', props.my_uid);
    }
    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle tag="span">
                <FeatherIcon.MoreHorizontal/>
            </DropdownToggle>
            <DropdownMenu>
                {
                    props.message.u_id == props.my_uid.id?
                    <DropdownItem onClick={() => RemoveFavorite_To()}>Remove favorite</DropdownItem>
                    :<DropdownItem onClick={() => RemoveFavorite()}>Remove favorite</DropdownItem>
                }
            </DropdownMenu>
        </Dropdown>
    )
};

export default FavoritesDropdown
