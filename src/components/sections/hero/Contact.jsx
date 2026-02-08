import React, { useEffect, useRef, useState } from "react";
import "./Contact.css";

const Contact = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`contact ${isVisible ? "is-visible" : ""}`} id="contact" ref={sectionRef}>
      <div className="contact-inner">
        <h2 className="contact-title" aria-label="Contact me!">
          {"CONTACT ME !".split("").map((char, index) => (
            <span
              className="contact-title-char"
              style={{ "--char-index": index }}
              key={`contact-${index}`}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>
        <div className="contact-divider" />

        <div className="contact-header-row">
          <p className="contact-name">KWON CHAE WOON</p>
          <p className="contact-tagline">
            I'M HERE TO DESIGN THE FLOW
            <br />
            BETWEEN PEOPLE AND PRODUCTS.
          </p>
        </div>

        <div className="contact-stars" aria-hidden="true">
          <img className="contact-star contact-star--pink" src="/img/contact_1.png" alt="" />
          <img className="contact-star contact-star--mint" src="/img/contact_2.png" alt="" />
          <img className="contact-star contact-star--lavender" src="/img/contact_3.png" alt="" />
        </div>

        <div className="contact-info">
          <div className="contact-info-item">
            <span className="contact-info-label">EMAIL</span>
            <span className="contact-info-value">okay0830@naver.com</span>
          </div>
          <div className="contact-info-item">
            <span className="contact-info-label">PHONE</span>
            <span className="contact-info-value">010 - 9146 - 4880</span>
          </div>
          <div className="contact-info-item">
            <span className="contact-info-label">INSTA</span>
            <span className="contact-info-value">@wooong_me</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
