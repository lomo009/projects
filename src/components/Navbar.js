import React from 'react'
import logo from '../r-icon.png'

export function Navbar() {
  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <img src={logo} className="App-logo" alt="logo" style={{alignItems: 'center', justifyContent: 'center', alignSelf: 'center', height: 35, width: 35}} />
        <a className="navbar-brand" style={{marginTop: 5}} href={"/"}>eadable</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" style={{marginTop: 5}} href={"/"}>Posts</a>
            </li>
          </ul>
        </div>
      </nav>
  )
}