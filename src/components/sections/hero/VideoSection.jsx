import React, { useEffect, useRef, useState } from "react";
import "./VideoSection.css";

function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
}

const lerp = (a, b, t) => a + (b - a) * t;

const VideoSection = () => {
    const sectionRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [pSmooth, setPSmooth] = useState(0);
    const [wSmooth, setWSmooth] = useState(0);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        let rafId;

        const update = () => {
            const vh = window.innerHeight;
            const start = el.offsetTop - vh;
            const end = el.offsetTop + el.offsetHeight - vh;
            const raw = (window.scrollY - start) / (end - start);

            setProgress(clamp(raw, 0, 1));
            rafId = requestAnimationFrame(update);
        };

        rafId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(rafId);
    }, []);

    /* ===== 鍮꾨뵒???ш린 ===== */
    const ratio = 16 / 9;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxByViewport = vw * 0.92;
    const maxW = Math.min(maxByViewport, 1700);
    const startW = maxW * 0.5;
    const growthProgress = clamp(pSmooth / 0.85, 0, 1);
    const targetW = startW + (maxW - startW) * growthProgress;

    useEffect(() => {
        setPSmooth((prev) => lerp(prev, progress, 0.08));
    }, [progress]);

    useEffect(() => {
        if (wSmooth === 0) {
            setWSmooth(targetW);
            return;
        }
        setWSmooth((prev) => lerp(prev, targetW, 0.12));
    }, [targetW]);

    /* ===== 鍮꾨뵒???곗텧 ===== */
    const radius = 28 * (1 - pSmooth);
    const y = 20 * (1 - pSmooth);

    /* ===== ?뵦 ?띿뒪??font-size (?듭떖) ===== */
    const titleFontSize = 110;
    const subFontSize = 20;

    /* ?띿뒪???깆옣 ??대컢 */
    const textIn = clamp((pSmooth - 0.3) / 0.4, 0, 1);

    return (
        <section className="video-section" ref={sectionRef}>
            <div className="video-sticky">
                <div className="video-inner">
                    <div
                        className="video-card"
                        style={{
                            width: `${wSmooth}px`,
                            transform: `translateY(${y}px)`,
                            borderRadius: `${radius}px`,
                        }}
                    >
                        <video
                            className="video"
                            src="/video/hero_video.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />

                        {/* ===== ?띿뒪???ㅻ쾭?덉씠 ===== */}
                        <div
                            className="video-overlay"
                            style={{
                                opacity: textIn,
                                transform: `translateY(${20 - 20 * textIn}px)`,
                            }}
                        >
                            <h2
                                className="video-title"
                                style={{ fontSize: `${titleFontSize}px` }}
                            >
                                <span className="video-title-italic">Welcome!</span> to a journey
                                <br />
                                <span className="video-title-italic">designed</span>
                                <br />
                                with intention.
                            </h2>

                            <p
                                className="video-sub"
                                style={{ fontSize: `${subFontSize}px` }}
                            >
                                This portfolio guides you through experiences shaped by clarity,
                                <br />
                                structure, and flow ??so every step feels natural.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;


