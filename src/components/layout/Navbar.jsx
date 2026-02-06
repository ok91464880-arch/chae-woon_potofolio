import React from "react";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <div className="nav-left">
                    <button className="circle-btn" type="button" aria-label="Scroll down">
                        <span className="arrow">↓</span>
                    </button>
                </div>

                <div className="nav-center">
                    <div className="pill-menu">
                        <a href="#home" className="active">(* HOME )</a>
                        <a href="#about">ABOUT</a>
                        <a href="#skill">SKILL</a>
                        <a href="#teamproject">WORK</a>
                        <a href="#contact">CONTACT</a>
                    </div>
                </div>

                <div className="nav-right">
                    <div className="logo">K.CHWON</div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
