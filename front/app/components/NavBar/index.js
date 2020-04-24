
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'

import NotifIcon from '../../images/icons/notification.svg';
import SocialsIcon from '../../images/icons/share.svg';
import UserIcon from '../../images/icons/user.svg';
import DiscordIcon from '../../images/icons/discord-color.svg';
import TwitterIcon from '../../images/icons/twitter-color.svg';
import GithubIcon from '../../images/icons/github-color.svg';
import SettingsIcon from '../../images/icons/gear.svg';
import HomeIcon from '../../images/icons/home.svg';
import DisconnectIcon from '../../images/icons/logout.svg';

import { logout } from '../../actions/api'
import LoginButton from './loginbutton'
import LoginModal from './loginmodal'
import DropdownMenu from '../DropDownMenu'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
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
                name: "Home",
                url: `/user/${user.id}`
              },
              {
                leftIcon: <img className="vde navbar menu" src={DisconnectIcon} alt="Déconnexion" />,
                name: "Déconnexion",
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



const NavBarLook = ({ user, logout }) => {

  return (
    <div className="vde section vde-navbar">
      <div className="container vde-navbar">
        <div className="vde-navbar level is-mobile">
          <div className="level-left">
            <Link className="brand title level-item" to="/" style={{"fontFamily":"Impact", "justifyContent": "left"}}>
              <figure className="level-item image is-96x96"><img src="https://vde-staticfiles.s3.amazonaws.com/media/profile_images/vde3.png"/></figure>
            </Link>
          </div>
          <RightMenu user={user} logout={logout} />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.get("user")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => { dispatch(logout())}
  }
}

const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarLook)

export default NavBar
