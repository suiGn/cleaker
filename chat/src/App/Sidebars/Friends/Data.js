import React from 'react';

// Avatars
import ManAvatar1 from "../../../assets/img/man_avatar1.jpg"
import ManAvatar2 from "../../../assets/img/man_avatar2.jpg"
import ManAvatar3 from "../../../assets/img/man_avatar3.jpg"
import ManAvatar5 from "../../../assets/img/man_avatar5.jpg"
import WomenAvatar1 from "../../../assets/img/women_avatar1.jpg"
import WomenAvatar5 from "../../../assets/img/women_avatar5.jpg"

export const friendLists = [
    {
        name: 'Harrietta Souten',
        title: 'Dental Hygienist',
        avatar: <figure className="avatar">
            <img src={WomenAvatar5} className="rounded-circle" alt="avatar"/>
        </figure>
    },
    {
        name: 'Aline McShee',
        title: 'Marketing Assistant',
        avatar: <figure className="avatar avatar-state-warning">
            <span className="avatar-title bg-success rounded-circle">A</span>
        </figure>
    },
    {
        name: 'Brietta Blogg',
        title: 'Actuary',
        avatar: <figure className="avatar avatar-state-success">
            <img src={WomenAvatar1} className="rounded-circle" alt="avatar"/>
        </figure>
    },
    {
        name: 'Karl Hubane',
        title: 'Chemical Engineer',
        avatar: <figure className="avatar avatar-state-success">
            <img src={ManAvatar3} className="rounded-circle" alt="avatar"/>
        </figure>
    },
    {
        name: 'Jillana Tows',
        title: 'Project Manager',
        avatar: <figure className="avatar">
            <img src={ManAvatar2} className="rounded-circle" alt="avatar"/>
        </figure>
    },
    {
        name: 'Alina Derington',
        title: 'Nurse',
        avatar: <figure className="avatar avatar-state-success">
            <span className="avatar-title bg-info rounded-circle">AD</span>
        </figure>
    },
    {
        name: 'Stevy Kermeen',
        title: 'Associate Professor',
        avatar: <figure className="avatar avatar-state-secondary">
            <span className="avatar-title bg-warning rounded-circle">S</span>
        </figure>,
        status: ''
    },
    {
        name: 'Stevy Kermeen',
        title: 'Senior Quality Engineer',
        avatar: <figure className="avatar">
            <img src={ManAvatar1} className="rounded-circle" alt="avatar"/>
        </figure>
    },
    {
        name: 'Gloriane Shimmans',
        title: 'Web Designer',
        avatar: <figure className="avatar">
            <img src={ManAvatar5} className="rounded-circle" alt="avatar"/>
        </figure>
    },
    {
        name: 'Bernhard Perrett',
        title: 'Software Engineer',
        avatar: <figure className="avatar avatar-state-warning">
            <span className="avatar-title bg-secondary rounded-circle">B</span>
        </figure>,
        status: ''
    }
];
