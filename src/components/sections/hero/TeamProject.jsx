import React, { useEffect, useRef } from "react";
import "./TeamProject.css";

const TeamProject = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    let isActive = false;
    const updateTheme = (nextActive) => {
      if (nextActive === isActive) return;
      isActive = nextActive;

      const current = Number(document.body.dataset.darkCount || "0");
      const next = Math.max(0, current + (isActive ? 1 : -1));
      document.body.dataset.darkCount = String(next);
      document.body.classList.toggle("theme-dark", next > 0);
    };

    const observer = new IntersectionObserver(
      ([entry]) => updateTheme(entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(target);
    return () => {
      updateTheme(false);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="team-project" id="teamproject" ref={sectionRef}>
      <div className="team-project-inner">
        <span className="team-project-badge">PROJECT</span>

        <h2 className="team-project-title" aria-label="From ideas to experiences. These are the projects I designed as journeys.">
          <span className="team-project-line">
            <span className="team-project-block team-project-block--cyan">FROM IDEAS</span>
            <span className="team-project-italic">TO EXPERIENCES</span>
            <img
              className="team-project-icon"
              src="/img/teamproject_1.png"
              alt=""
              aria-hidden="true"
            />
          </span>
          <span className="team-project-line">
            <img
              className="team-project-icon team-project-icon--ring"
              src="/img/teamproject_2.png"
              alt=""
              aria-hidden="true"
            />
            <span className="team-project-italic">THESE ARE</span>
            <span className="team-project-block team-project-block--lavender">THE PROJECTS</span>
          </span>
          <span className="team-project-line">
            <span className="team-project-italic">I DESIGNED</span>
            <img
              className="team-project-icon team-project-icon--pink"
              src="/img/teamproject_3.png"
              alt=""
              aria-hidden="true"
            />
            <span className="team-project-block team-project-block--pink">AS JOURNEYS.</span>
          </span>
        </h2>

        <div className="team-project-cta">
          <div className="aboutMe-actions">
            <button className="aboutMe-pill" type="button">
              UXUI PROJECT
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
        </div>
      </div>
    </section>
  );
};

export default TeamProject;
