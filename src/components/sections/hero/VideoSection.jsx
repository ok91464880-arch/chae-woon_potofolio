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
    const [viewportWidth, setViewportWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1920
    );

    useEffect(() => {
        const onResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // 1. 스크롤 진행도 계산
    useEffect(() => {
        const update = () => {
            const el = sectionRef.current;
            if (!el) return;

            const vh = window.innerHeight;
            const start = el.offsetTop - vh;
            const end = el.offsetTop + el.offsetHeight - vh;
            const raw = (window.scrollY - start) / (end - start);

            setProgress(clamp(raw, 0, 1));
        };

        window.addEventListener("scroll", update);
        update(); // 초기화
        return () => window.removeEventListener("scroll", update);
    }, []);

    // 2. 부드러운 애니메이션 (Lerp) 처리
    useEffect(() => {
        let rafId;
        const animate = () => {
            setPSmooth((prev) => {
                const next = lerp(prev, progress, 0.08);
                // 변화가 거의 없을 땐 멈춰서 성능 최적화
                return Math.abs(next - progress) < 0.0001 ? progress : next;
            });
            rafId = requestAnimationFrame(animate);
        };
        rafId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafId);
    }, [progress]);

    /* ===== 비디오 크기 계산 ===== */
    const vw = viewportWidth;
    const maxByViewport = vw * 0.92;
    const maxW = Math.min(maxByViewport, 1700);
    const startW = maxW * 0.5;
    const growthProgress = clamp(pSmooth / 0.85, 0, 1);
    const targetW = startW + (maxW - startW) * growthProgress;

    useEffect(() => {
        setWSmooth((prev) => lerp(prev, targetW, 0.12));
    }, [targetW]);

    /* ===== 비디오 연출 값 ===== */
    const radius = 28 * (1 - pSmooth);
    const y = 20 * (1 - pSmooth);

    /* ===== 텍스트 스타일 값 ===== */
    const titleFontSize = vw <= 1024 ? 76 : 110;
    const subFontSize = 20;
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
                            src="/video/hero_vedio.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />

                        {/* ===== 텍스트 오버레이 ===== */}
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
                                structure, and flow so every step feels natural.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
