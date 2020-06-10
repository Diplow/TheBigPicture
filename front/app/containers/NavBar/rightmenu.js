
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import NotifIcon from '../../images/icons/notification.svg';
import SocialsIcon from '../../images/icons/share.svg';
import UserIcon from '../../images/icons/user.svg';
import DiscordIcon from '../../images/icons/discord-color.svg';
import TwitterIcon from '../../images/icons/twitter-color.svg';
import GithubIcon from '../../images/icons/github-color.svg';
import SettingsIcon from '../../images/icons/gear.svg';
import HomeIcon from '../../images/icons/home.svg';
import DisconnectIcon from '../../images/icons/logout.svg';

import LoginButton from './loginbutton'
import LoginModal from './loginmodal'
import DropdownMenu from '../../components/DropDownMenu'

import * as cst from '../../constants'
import "./style.scss"


const RightMenu = (props) => {
  const {
    user,
    logout
  } = props

  const [isActive, setIsActive] = useState(null)

  return (
    <div className="level-right">
      <NavItem
        name="socials"
        isActive={isActive}
        setIsActive={setIsActive}
        icon={
          <img 
            src={SocialsIcon}
            alt="Réseaux sociaux"
            />
        }>
        <DropdownMenu linksArray={[
          {
            leftIcon: <img className="vde navbar menu" src={TwitterIcon} alt="Twitter" />,
            name: "Twitter",
            url: "https://twitter.com/Diplo87355132"
          },
          {
            leftIcon: <img className="vde navbar menu" src={GithubIcon} alt="Github" />,
            name: "Github",
            url: "https://github.com/Diplow/TheBigPicture"
          },
          {
            leftIcon: <img className="vde navbar menu" src={DiscordIcon} alt="Discord" />,
            name: "Discord",
            url: "https://discord.gg/NtZHTqc"
          }
        ]} />
      </NavItem>
      {
        user.id != 0
        ? <NavItem
            name="user"
            isActive={isActive}
            setIsActive={setIsActive}
            classname="vde dropdown nav-item image icon-button"
            icon={
              <img 
                className="vde navbar menu"
                src={user.image}
                alt="Utilisateur" />}
          >
            <DropdownMenu linksArray={[
              {
                leftIcon: <img className="vde navbar menu" src={HomeIcon} alt="Mes contenus" />,
                name: cst.labels.PROFILE,
                url: `/user/${user.id}`
              },
              {
                leftIcon: <img className="vde navbar menu" src={DisconnectIcon} alt="Déconnexion" />,
                name: cst.labels.DISCONNECT,
                url: "/",
                onClick: () => logout()
              }
            ]} />
          </NavItem>
        : null
      }
      <LoginButton />
    </div>
  );
}

const NavItemList = (props) => {
  return (
    <nav className="level-item">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

const NavItem = (props) => {
  const {
    icon,
    children,
    name,
    setIsActive,
    isActive,
    classname
  } = props
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open == true) {
      setIsActive(name)
    }
    else {
      if (isActive == name)
        setIsActive(null)
    }
  }, [open])

  useEffect(() => {
    if (isActive != name) {
      setOpen(false)
    }
  }, [isActive])

  return (
    <div className={`vde dropdown nav-item ${open?"is_active":""}`}>
      <div className="vde dropdown-trigger">
        <a href="#" className={`${classname !== undefined ? classname : ""} icon-button`} onClick={() => setOpen(!open)}>
          {icon}
        </a>
      </div>
      <div className="vde dropdown-menu" role="menu">
        {open && children}
      </div>
    </div>
  );
}

export default RightMenu
