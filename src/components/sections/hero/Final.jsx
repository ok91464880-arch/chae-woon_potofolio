import React, { useEffect, useRef, useState } from "react";
import "./Final.css";

const Final = () => {
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
    <section className={`final ${isVisible ? "is-visible" : ""}`} id="final" ref={sectionRef}>
      <div className="final-bg" aria-hidden="true" />
      <div className="final-inner">
        <img className="final-vector final-vector-1" src="/img/final_vector_1.png" alt="" />
        <img className="final-vector final-vector-2" src="/img/final_vector_2.png" alt="" />
        <img className="final-vector final-vector-3" src="/img/final_vector_3.png" alt="" />

        <h2 className="final-title" aria-label="Ready to continue the journey?">
          <span className="final-title-line">
            {"READY ".split("").map((char, index) => (
              <span
                className="final-title-char final-title-strong"
                style={{ "--char-index": index }}
                key={`ready-${index}`}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            {"TO CONTINUE".split("").map((char, index) => (
              <span
                className="final-title-char final-title-italic"
                style={{ "--char-index": 6 + index }}
                key={`continue-${index}`}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
          <span className="final-title-line">
            {"THE ".split("").map((char, index) => (
              <span
                className="final-title-char final-title-strong"
                style={{ "--char-index": 17 + index }}
                key={`the-${index}`}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            {"JOURNEY?".split("").map((char, index) => (
              <span
                className="final-title-char final-title-italic"
                style={{ "--char-index": 21 + index }}
                key={`journey-${index}`}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h2>
      </div>
    </section>
  );
};

export default Final;
