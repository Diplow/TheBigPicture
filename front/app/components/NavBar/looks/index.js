import React from 'react'
import LoginButton from '../loginbutton'
import LoginModal from '../loginmodal'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import "./style.scss"


const NavBarLook = () => {

  return (
    <div className="section tbp-section navbar-section">
      <div className="container nav-container">
        <div id="navbar" className="tbp-section level tbp-nav-level is-mobile">
          <div className="level-left is-mobile">
            <Link className="brand title level-item" to="/" style={{"fontFamily":"Impact", "justifyContent": "left"}}>VUE D'ENSEMBLE</Link>
          </div>
          <div className="level-right is-mobile">
            <LoginButton />
          </div>
        </div>
      </div>

      <LoginModal/>
    </div>
  )
}

const socials = () => {
  return (
    <div className="is-hidden">
      <a className="is-hidden-mobile navbar-item tbp-nav-item" href="https://github.com/Diplow/TheBigPicture">
        <span className="icon github-icon">
        <svg className="svg-inline--fa fa-github-alt fa-w-15 fa-lg" aria-hidden="true" data-prefix="fab" data-icon="github-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 512" data-fa-i2svg=""><path fill="currentColor" d="M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1 74.8-216.7 74.8-75.8 0-186.2 2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5 41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3 14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0 54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6 30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56 6-14.9 2.3-29.8 3.2-45.1 3.2-15.2 0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5 82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z"></path></svg>
        </span>
      </a>
      <a className="is-hidden-mobile navbar-item tbp-nav-item" href="https://twitter.com/Diplo87355132" target="_blank">
        <span className="icon twitter-icon">
          <svg className="svg-inline--fa fa-twitter fa-w-16 fa-lg" aria-hidden="true" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
        </span>
      </a>
      <a className="is-hidden-mobile navbar-item tbp-nav-item" href="https://discord.gg/NtZHTqc" target="_blank">
        <span className="icon discord-icon">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48"><g id="surface1"><path fill="currentColor" d="M 40 12 C 40 12 35.414063 8.410156 30 8 L 29.511719 8.976563 C 34.40625 10.175781 36.652344 11.890625 39 14 C 34.953125 11.933594 30.960938 10 24 10 C 17.039063 10 13.046875 11.933594 9 14 C 11.347656 11.890625 14.019531 9.984375 18.488281 8.976563 L 18 8 C 12.320313 8.535156 8 12 8 12 C 8 12 2.878906 19.425781 2 34 C 7.160156 39.953125 15 40 15 40 L 16.640625 37.816406 C 13.855469 36.847656 10.714844 35.121094 8 32 C 11.238281 34.449219 16.125 37 24 37 C 31.875 37 36.761719 34.449219 40 32 C 37.285156 35.121094 34.144531 36.847656 31.359375 37.816406 L 33 40 C 33 40 40.839844 39.953125 46 34 C 45.121094 19.425781 40 12 40 12 Z M 17.5 30 C 15.566406 30 14 28.210938 14 26 C 14 23.789063 15.566406 22 17.5 22 C 19.433594 22 21 23.789063 21 26 C 21 28.210938 19.433594 30 17.5 30 Z M 30.5 30 C 28.566406 30 27 28.210938 27 26 C 27 23.789063 28.566406 22 30.5 22 C 32.433594 22 34 23.789063 34 26 C 34 28.210938 32.433594 30 30.5 30 Z "></path></g></svg>
        </span>
      </a>
    </div>
  )
}

export default NavBarLook
