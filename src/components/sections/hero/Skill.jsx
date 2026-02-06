import React, { useEffect, useState } from "react";
import "./Skill.css";

const skillList = [
    { name: "AUTO CAD", src: "/img/skill_cad.png" },
    { name: "JS", src: "/img/skill_js.png" },
    { name: "FIGMA", src: "/img/skill_fi.png" },
    { name: "SKETCHUP", src: "/img/skill_sk.png" },
    { name: "MIDJOURNEY", src: "/img/skill_mi.png" },
    { name: "HTML", src: "/img/skill_ht.png" },
    { name: "CSS", src: "/img/skill_gs.png" },
    { name: "ENSCAPE", src: "/img/skill_en.png" },
    { name: "REVIT", src: "/img/skill_re.png" },
    { name: "PHOTOSHOP", src: "/img/skill_ps.png" },
    { name: "ILLUSTRATOR", src: "/img/skill_ai.png" }
];

const Skill = () => {
    const doubledList = [...skillList, ...skillList];
    const [teamProjectInView, setTeamProjectInView] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const target = document.getElementById("teamproject");
        if (!target) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                // 📍 내려갈 때(등장) & 올라갈 때(퇴장) 모두 체크
                if (entry.isIntersecting) {
                    setIsDark(true);
                    setTeamProjectInView(true);
                } else {
                    // 📍 TeamProject가 화면에서 완전히 나가면 다시 밝게
                    setIsDark(false);
                    setTeamProjectInView(false);
                }
            },
            {
                // 📍 threshold를 0.1로 두면 살짝만 걸쳐도 반응해서 전환이 더 자연스럽습니다.
                threshold: 0.1
            }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, []);

    return (
        <section className={`skill ${isDark ? "is-dark" : ""}`} id="skill">
            {/* ... 기존 내부 구조 동일 ... */}
            <div className="skill-inner">
                <span className="skill-badge">HOW I DO</span>
                <h2 className="skill-title">
                    <span className="skill-title-italic">SKILL</span>{" "}
                    <span className="skill-title-main">ABILITY</span>
                </h2>
            </div>

            <div className="skill-floating-icons" aria-hidden="true">
                {/* 플로팅 아이콘들 */}
                <img className="skill-float float-1" src="/img/skill_icon1.png" alt="" />
                <img className="skill-float float-2" src="/img/skill_icon2.png" alt="" />
                <img className="skill-float float-3" src="/img/skill_icon3.png" alt="" />
                <img
                    className={`skill-float float-4 ${teamProjectInView ? "float-4-active" : ""}`}
                    src="/img/skill_icon4.png"
                    alt=""
                />
                <img className="skill-float float-5" src="/img/skill_icon5.png" alt="" />
                <img className="skill-float float-6" src="/img/skill_icon6.png" alt="" />
            </div>

            <div className="skill-marquee-container">
                <div className="skill-marquee-track">
                    {doubledList.map((skill, index) => (
                        <div key={index} className="skill-card">
                            <div className="skill-icon-wrapper">
                                <img src={skill.src} alt={skill.name} className="skill-img" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skill;