import React from "react";
import "./KeywordSection.css";

const Keyword = () => {
    // 각 줄에 들어갈 키워드들
    const row1 = ["#JOURNEY", "#FLOW"];
    const row2 = ["#COMMUNICATION", "#RESEARCH", "#DESIGN_SYSTEM", "#LOGIC"];
    const row3 = ["#USER_EXPERIENCE", "#INTERFACE", "#USABILITY",];

    return (
        <section className="keyword-section">
            <div className="keyword-container">

                {/* 첫 번째 줄 (하늘색, 오른쪽으로 흐름) */}
                <div className="marquee-row row-sky">
                    <div className="marquee-content scroll-right">
                        {[...row1, ...row1].map((text, i) => (
                            <span key={i} className="keyword-text">
                                {i % 2 === 0 && (
                                    <img
                                        className="icon-flower"
                                        src="/img/keyword_1.png"
                                        alt=""
                                        aria-hidden="true"
                                    />
                                )}
                                {text}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 두 번째 줄 (연보라색, 왼쪽으로 흐름) */}
                <div className="marquee-row row-purple">
                    <div className="marquee-content scroll-left">
                        {[...row2, ...row2].map((text, i) => (
                            <span key={i} className="keyword-text">
                                {text}
                                {i % 2 === 0 && (
                                    <img
                                        className="icon-star"
                                        src="/img/keyword_3.png"
                                        alt=""
                                        aria-hidden="true"
                                    />
                                )}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 세 번째 줄 (분홍색, 오른쪽으로 흐름) */}
                <div className="marquee-row row-pink">
                    <div className="marquee-content scroll-right">
                        {[...row3, ...row3].map((text, i) => (
                            <span key={i} className="keyword-text">
                                {i % 3 === 0 && (
                                    <img
                                        className="icon-circle"
                                        src="/img/keyword_2.png"
                                        alt=""
                                        aria-hidden="true"
                                    />
                                )}
                                {text}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Keyword;
