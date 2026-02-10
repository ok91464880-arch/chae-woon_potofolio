import React, { useEffect, useRef, useState } from "react";
import "./AboutMe.css";

function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
}

function easeInOutCubic(t) {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

const AboutMe = () => {
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const titleRef = useRef(null);
    const wasTitleVisibleRef = useRef(false);
    const [titleAnimRun, setTitleAnimRun] = useState(0);

    const aboutTitle = "ABOUT";
    const meTitle = "(ME)";

    useEffect(() => {
        const el = sectionRef.current;
        const leftEl = leftRef.current;
        const rightEl = rightRef.current;
        if (!el || !leftEl || !rightEl) return;

        let rafId = 0;
        const smooth = 0.12;
        let curLX = 0;
        let curRX = 0;
        let curLRot = -10;
        let curRRot = 10;
        let curContent = 0;

        const update = () => {
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;
            const vw = window.innerWidth;

            // ✅ 핵심: 섹션 전체(220vh) 진행률로 p 계산
            // rect.top: 섹션이 뷰포트에 들어오면 0보다 작아지기 시작
            // rect.height - vh: sticky 구간 포함 "실제로 스크롤되는 길이"
            const scrollLen = rect.height - vh;              // ex) 220vh-100vh = 120vh
            const scrolled = -rect.top;                      // 섹션 진입 후 진행량
            const p = clamp(scrolled / scrollLen, 0, 1);     // 섹션 끝까지 가야 1

            // ✅ "처음엔 거의 닫힘 유지" + "끝까지 천천히"
            // 초반 멈춤 구간 조금 주고 싶으면 0.08~0.15 추천
            const hold = 0.1;
            const t = clamp((p - hold) / (1 - hold), 0, 1);

            const eased = easeInOutCubic(t);
            const easedSlow = Math.pow(eased, 1.6); // 더 천천히: 1.6~2.0

            const photoW = leftEl.getBoundingClientRect().width;

            const safeMargin = 64;
            const extraOut = 60;

            const maxSpread = (vw / 2) - (photoW / 2) - safeMargin + extraOut;

            // ✅ 여기 1.3 너무 과하면 1.1~1.2로
            const spread = Math.max(0, maxSpread) * easedSlow * 1.15;

            const leftRot = -10 + 8 * easedSlow;  // -10 -> -2
            const rightRot = 10 - 8 * easedSlow;  //  10 ->  2

            // ✅ 텍스트도 섹션 중반부터 자연스럽게
            const contentIn = clamp((p - 0.25) / 0.75, 0, 1);

            const targetLX = -spread;
            const targetRX = spread;

            curLX = lerp(curLX, targetLX, smooth);
            curRX = lerp(curRX, targetRX, smooth);
            curLRot = lerp(curLRot, leftRot, smooth);
            curRRot = lerp(curRRot, rightRot, smooth);
            curContent = lerp(curContent, contentIn, smooth);

            el.style.setProperty("--lx", `${curLX}px`);
            el.style.setProperty("--rx", `${curRX}px`);
            el.style.setProperty("--lrot", `${curLRot}deg`);
            el.style.setProperty("--rrot", `${curRRot}deg`);
            el.style.setProperty("--content", `${curContent}`);

            rafId = requestAnimationFrame(update);
        };

        rafId = requestAnimationFrame(update);

        const onResize = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(update);
        };
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    useEffect(() => {
        const target = titleRef.current;
        if (!target) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isVisible = entry.isIntersecting;
                if (isVisible && !wasTitleVisibleRef.current) {
                    setTitleAnimRun((prev) => prev + 1);
                }
                wasTitleVisibleRef.current = isVisible;
            },
            { threshold: 0.35 }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="aboutMe" ref={sectionRef} id="about">
            <div className="aboutMe-sticky">
                <div className="aboutMe-inner">
                    <div className="aboutMe-header">
                        <span className="badge">WHO AM I</span>
                        <h2 className="aboutMe-title" ref={titleRef} aria-label="ABOUT (ME)">
                            <span className="aboutMe-title-line">
                                {aboutTitle.split("").map((char, index) => (
                                    <span
                                        className="aboutMe-title-char aboutMe-title-main"
                                        style={{ "--char-index": index }}
                                        key={`${titleAnimRun}-about-${index}`}
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </span>
                                ))}
                                <span
                                    className="aboutMe-title-char"
                                    style={{ "--char-index": aboutTitle.length }}
                                    key={`${titleAnimRun}-space`}
                                >
                                    {"\u00A0"}
                                </span>
                                {meTitle.split("").map((char, index) => (
                                    <span
                                        className="aboutMe-title-char aboutMe-title-accent"
                                        style={{ "--char-index": aboutTitle.length + 1 + index }}
                                        key={`${titleAnimRun}-me-${index}`}
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </span>
                                ))}
                            </span>
                        </h2>
                    </div>

                    <div className="aboutMe-stage">
                        <div className="aboutMe-media">
                            <div ref={leftRef} className="aboutMe-photo left">
                                <img src="/img/about_left.png" alt="About left" />
                            </div>
                            <div ref={rightRef} className="aboutMe-photo right">
                                <img src="/img/about_right.png" alt="About right" />
                            </div>
                        </div>

                        <div className="aboutMe-panel">
                            <div className="aboutMe-card">
                                <div className="aboutMe-card-top">
                                    <span className="aboutMe-img">
                                        <img src="/img/aboutimg_1.png" alt="" />
                                    </span>
                                    <div>
                                        <h3 className="aboutMe-name-top">
                                            KWON
                                        </h3>
                                        <h3 className="aboutMe-name-bottom">
                                            CHAE WOON
                                        </h3>
                                        <p className="aboutMe-role subname">
                                            UX/UI DESIGNER · JOURNEY DESIGN
                                        </p>
                                    </div>
                                </div>

                                <p className="aboutMe-desc">
                                    보이지 않는 구조로 사용자의 여정과 다음 행동을<br />
                                    이끄는 UX/UI 디자이너, 권채운입니다.<br />
                                    설명 없이도 편안한 경험과 명확한 구조 사이의<br />
                                    균형을 설계하며, 복잡한 정보와 기능이 자연스럽게<br />
                                    이어지는 흐름을 만듭니다.
                                </p>

                                <div className="aboutMe-actions">
                                    <button className="aboutMe-pill" type="button">
                                        UX/UI DESIGNER
                                    </button>
                                    <button className="aboutMe-arrow" type="button" aria-label="Open">
                                        <img
                                            src="/img/about_diagonalarrow.png"
                                            alt=""
                                            className="aboutMe-arrow__img aboutMe-arrow__img--default"
                                        />
                                        <img
                                            src="/img/about_rightarrow.png"
                                            alt=""
                                            className="aboutMe-arrow__img aboutMe-arrow__img--hover"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
