import React, { useEffect, useMemo, useRef, useState } from "react";
import "./History.css";

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const History = () => {
    const wrapRef = useRef(null);   // 섹션 전체(가짜 높이)
    const pinRef = useRef(null);    // sticky 영역
    const trackRef = useRef(null);  // 가로 트랙
    const lineRef = useRef(null);   // 라인

    const [x, setX] = useState(0);

    const cards = useMemo(() => [
        {
            year: "2000",
            date: "2000.08.30 출생",
            desc: "2000년 8월 30일에 태어났습니다.",
            img: "/img/historyme_1.png"
        },
        { year: "2008", date: "미술학원 입문", desc: "8살때부터 미술학원을 다니기 시작해 그림에 대한 열정을 느끼고 학교에서 개최되는 그림 대회에 참가해 상을 받았습니다.", img: "/img/historyme_2.png" },
        { year: "2019", date: "대학교 입학", desc: "대학교를 입학해 인테리어디자인을 전공하며 공간과 구조를 통해 디자인을 보는 시선과 해석하는 역량을 키웠습니다.", img: "/img/historyme_3.png" },
        { year: "2024", date: "메이트 세트 디자이너", desc: "이후 광고회사 메이트에서 세트 디자이너로 근무하며, 제품 제작 과정과 촬영 환경을 고려한 공간 연출과 시각적 요소 디자인을 경험했습니다.", img: "/img/historyme_4.png" },
        { year: "2025", date: "VMD 주거공간 데코", desc: "이후 VMD 회사에서 주거공간 데코레이션을 담당하며, 공간의 분위기와 사용 맥락을 고려해 디테일 하나하나에 디자인적 의도를 담아 완성도 높은 공간을 구현했습니다.", img: "/img/historyme_5.png" },
        { year: "2026", date: "UX/UI 디자인 여정", desc: "세트디자인을 통해 메시지와 감정을 전달하는 디자인의 힘을 경험하며,그 여정은 자연스럽게 디지털 환경에서의 UX/UI 설계로 이어졌고, 국비 교육을 통해 이를 본격적으로 탐구했습니다.", img: "/img/historyme_6.png" },
    ], []);

    useEffect(() => {
        const wrapEl = wrapRef.current;
        const pinEl = pinRef.current;
        const trackEl = trackRef.current;
        const lineEl = lineRef.current;
        if (!wrapEl || !pinEl || !trackEl) return;

        let raf = 0;
        let lineLen = 0;

        const START_PADDING = 100;
        const END_PADDING = 100;

        const getMaxX = () => {
            const trackW = trackEl.scrollWidth;
            const viewW = pinEl.clientWidth;
            return Math.max(0, trackW - viewW + END_PADDING);
        };

        const measure = () => {
            const maxX = getMaxX();
            wrapEl.style.height = `${window.innerHeight + (maxX * 1.5)}px`;
            if (lineEl && lineLen === 0) {
                lineLen = lineEl.getTotalLength();
                lineEl.style.strokeDasharray = `${lineLen}`;
                lineEl.style.strokeDashoffset = `${lineLen}`;
            }
            update();
        };

        const update = () => {
            const rect = wrapEl.getBoundingClientRect();
            const total = wrapEl.offsetHeight - window.innerHeight;
            if (total <= 0) return;

            const progressed = clamp(-rect.top, 0, total);
            const maxX = getMaxX();
            const progress = progressed / total;

            const nextX = (progress * maxX) - START_PADDING;
            setX(nextX);

            if (lineEl && lineLen > 0) {
                const offset = lineLen * (1 - progress);
                lineEl.style.strokeDashoffset = `${offset}`;
            }
        };

        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(update);
        };

        const onResize = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(measure);
        };

        measure();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <section className="history-wrap" ref={wrapRef}>
            <div className="history-pin" ref={pinRef}>
                <div className="history-marquee" aria-label="Chae Woon's Story">
                    <div className="history-marqueeTrack">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div className="history-titleRow" key={i} aria-hidden={i > 0}>
                                <img className="history-titleIcon" src="/img/historyimg_1.png" alt="" />
                                <h2 className="history-title">
                                    <span className="history-title-main">CHAE WOON’S</span>{" "}
                                    <span className="history-title-accent">STORY</span>
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="history-rail">
                    <div
                        className="history-track"
                        ref={trackRef}
                        style={{ transform: `translate3d(${-x}px, 0, 0)` }}
                    >
                        <svg
                            className="history-line"
                            viewBox="0 0 1200 200"
                            preserveAspectRatio="none"
                        >
                            <path
                                ref={lineRef}
                                d="M100,100 
                                    C350,180 650,20 900,100
                                    C1000,150 1050,130 1100,100"
                                fill="none"
                                stroke="#FF7782"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>

                        {cards.map((c, i) => (
                            <React.Fragment key={i}>
                                <article className="history-card">
                                    <div className="history-img">
                                        <img src={c.img} alt={`${c.year} 이미지`} />
                                    </div>
                                    <h3 className="history-year">{c.year}</h3>

                                    {/* ✅ 추가된 날짜/소제목 영역 */}
                                    <p className="history-sub-date">{c.date}</p>

                                    {/* ✅ 추가된 검정색 가로선 */}
                                    <div className="history-divider"></div>

                                    <p className="history-desc">{c.desc}</p>
                                </article>

                                {i < cards.length - 1 && (
                                    <img
                                        className={`history-deco deco-${i + 2}`}
                                        src={`/img/historyimg_${i + 2}.png`}
                                        alt=""
                                        aria-hidden="true"
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default History;