import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';
import characterImg from '../../../assets/images/character.png';

const Hero = () => {
    const titleLines = ['DESIGNING UX/UI', 'JOURNEYS THAT', 'MOVE USERS FORWARD'];
    const titleRef = useRef(null);
    const wasVisibleRef = useRef(false);
    const [titleAnimRun, setTitleAnimRun] = useState(0);

    useEffect(() => {
        const target = titleRef.current;
        if (!target) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isVisible = entry.isIntersecting;

                if (isVisible && !wasVisibleRef.current) {
                    setTitleAnimRun((prev) => prev + 1);
                }

                wasVisibleRef.current = isVisible;
            },
            { threshold: 0.35 }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="hero" id="home">
            <div className="hero-header">
                <span className="badge">PORTFOLIO</span>
                <img src="/img/heroimg_4.png" alt="" className="hero-title-mark" />
                <h1 className="hero-title" ref={titleRef}>
                    {titleLines.map((line, lineIndex) => (
                        <span
                            className={`hero-title-line${lineIndex === 1 ? ' hero-title-line--italic' : ''
                                }`}
                            key={line}
                        >
                            {line.split('').map((char, charIndex) => (
                                <span
                                    className="hero-title-char"
                                    style={{ '--char-index': lineIndex * 40 + charIndex }}
                                    key={`${titleAnimRun}-${lineIndex}-${charIndex}`}
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </span>
                            ))}
                        </span>
                    ))}
                </h1>

                <div className="aboutMe-actions">
                    <button className="aboutMe-pill" type="button">
                        SCROLL
                    </button>
                    <button className="aboutMe-arrow" type="button" aria-label="Open">
                        <img
                            src="/img/hero_downarrow.png"
                            alt=""
                            className="aboutMe-arrow__img aboutMe-arrow__img--default"
                        />
                        <img
                            src="/img/about_diagonalarrow.png"
                            alt=""
                            className="aboutMe-arrow__img aboutMe-arrow__img--hover"
                        />
                    </button>
                </div>

                <div className="hero-subtext">
                    <p>BRAND, ART DIRECTION</p>
                    <p>PRODUCT, WEBSITE</p>
                </div>
            </div>

            <div className="hero-visual">
                <div className="character-container">
                    <img src={characterImg} alt="Character" className="character-img" />

                    <img src="/img/heroimg_1.png" alt="Star 1" className="float-element star-1" />
                    <img src="/img/heroimg_2.png" alt="Star 2" className="float-element star-2" />
                    <img src="/img/heroimg_3.png" alt="Star 3" className="float-element star-3" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
