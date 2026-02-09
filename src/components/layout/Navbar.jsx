import React, { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
    const [activeId, setActiveId] = useState("home");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const updateFromHash = () => {
            const hash = window.location.hash.replace("#", "");
            if (hash) {
                setActiveId(hash);
            }
        };

        updateFromHash();
        window.addEventListener("hashchange", updateFromHash);
        return () => window.removeEventListener("hashchange", updateFromHash);
    }, []);

    useEffect(() => {
        const sections = [
            "home",
            "about",
            "skill",
            "teamproject",
            "contact",
        ]
            .map((id) => document.getElementById(id))
            .filter(Boolean);

        if (sections.length === 0) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-40% 0px -40% 0px",
                threshold: 0.01,
            }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const links = [
        { id: "home", label: "HOME" },
        { id: "about", label: "ABOUT" },
        { id: "skill", label: "SKILL" },
        { id: "teamproject", label: "WORK" },
        { id: "contact", label: "CONTACT" },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <div className="nav-left">
                    <button
                        className="menu-toggle"
                        type="button"
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                    >
                        <img src="/img/hero_header_btn.png" alt="" className="nav-left-img" />
                    </button>
                </div>

                <div className={`nav-center${isMenuOpen ? " is-open" : ""}`}>
                    <div className="pill-menu">
                        {links.map((link) => {
                            const isActive = activeId === link.id;
                            return (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    className={isActive ? "active" : undefined}
                                    onClick={() => {
                                        setActiveId(link.id);
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    {isActive ? `(* ${link.label} )` : link.label}
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className="nav-right">
                    <div className="logo">K.CHWON</div>
                </div>
            </div>

            <div className={`menu-panel${isMenuOpen ? " is-open" : ""}`}>
                <button
                    className="menu-panel-close"
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setIsMenuOpen(false)}
                >
                    ×
                </button>
                <img
                    src="/img/Navbar_vector.png"
                    alt=""
                    className="menu-panel-vector menu-panel-vector--left"
                    aria-hidden="true"
                />
                <img
                    src="/img/Navbar_vector_2.png"
                    alt=""
                    className="menu-panel-vector menu-panel-vector--right"
                    aria-hidden="true"
                />
                <div className="menu-panel-inner">
                    {links.map((link) => (
                        <a
                            key={`panel-${link.id}`}
                            href={`#${link.id}`}
                            className={`menu-panel-link${activeId === link.id ? " active" : ""}`}
                            onClick={() => {
                                setActiveId(link.id);
                                setIsMenuOpen(false);
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
