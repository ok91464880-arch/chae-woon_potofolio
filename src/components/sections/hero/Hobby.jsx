import React, { useRef } from "react";
import { motion } from "framer-motion";
import "./Hobby.css";

const cardConfig = [
  { id: 1, src: "/img/hobby_1.png", x: 0, y: 0, rotate: -6, delay: 0.1, zIndex: 2 },
  { id: 2, src: "/img/hobby_2.png", x: 10, y: -10, rotate: 4, delay: 0.2, zIndex: 10 },
  { id: 3, src: "/img/hobby_3.png", x: -10, y: 5, rotate: -2, delay: 0.3, zIndex: 5 },
  { id: 4, src: "/img/hobby_4.png", x: 5, y: -15, rotate: 8, delay: 0.4, zIndex: 3 },
  { id: 5, src: "/img/hobby_5.png", x: -15, y: 10, rotate: -10, delay: 0.5, zIndex: 1 },
  { id: 6, src: "/img/hobby_6.png", x: 0, y: 0, rotate: 2, delay: 0.6, zIndex: 6 },
];

const Hobby = () => {
  const sectionRef = useRef(null);
  const constraintsRef = useRef(null); // 드래그 제한 영역

  const renderHobbyChars = (text, offset) =>
    text.split("").map((char, index) => (
      <span
        className="hobby-title-char"
        style={{ "--char-index": offset + index }}
        key={`${text}-${index}`}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  React.useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        target.classList.toggle("is-inview", entry.isIntersecting);
      },
      { threshold: 0.4 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hobby" id="hobby" ref={sectionRef}>
      <div className="hobby-inner">
        {/* 드래그 제한 영역: 전체 Hero 섹션으로 설정 */}
        <div className="hobby-hero" ref={constraintsRef}>
          <span className="hobby-badge">HOBBY</span>
          <div className="hobby-title-wrap">
            <h2 className="hobby-title">
              <span className="hobby-title-line">
                {renderHobbyChars("WHAT", 0)}
              </span>
              <span className="hobby-title-line">
                {renderHobbyChars("MY", 4)}
              </span>
              <span className="hobby-title-line">
                {renderHobbyChars("HOBBY", 6)}
              </span>
            </h2>

            <div className="hobby-cards">
              {cardConfig.map((card) => (
                <motion.img
                  key={card.id}
                  className="hobby-card"
                  src={card.src}
                  alt="Hobby Card"
                  style={{ zIndex: card.zIndex }}

                  // 초기 상태: 화면 아래(y: 200) + 투명
                  initial={{ y: 200, opacity: 0, scale: 0.8, rotate: 0 }}

                  // 화면에 들어왔을 때 상태
                  whileInView={{
                    y: card.y,
                    x: card.x,
                    opacity: 1,
                    scale: 1,
                    rotate: card.rotate,
                  }}

                  // 애니메이션 설정
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 18,
                    delay: card.delay,
                  }}

                  // 드래그 설정
                  drag
                  dragConstraints={constraintsRef}
                  dragElastic={0.2}
                  whileDrag={{ scale: 1.1, cursor: "grabbing", zIndex: 100 }}
                  whileHover={{ scale: 1.05, cursor: "grab", zIndex: 50 }}

                  // ✨ 수정됨: once를 false로 설정하여, 화면에 들어올 때마다 애니메이션 실행
                  viewport={{ once: false, amount: 0.3 }}
                />
              ))}
            </div>

            <motion.img
              className="hobby-me"
              src="/img/hobby_me.png"
              alt="Hobby illustration"
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              // ✨ 수정됨: 캐릭터도 매번 다시 등장하도록 설정
              viewport={{ once: false }}
            />
          </div>

          <img className="hobby-deco hobby-deco-1" src="/img/hobby_vector_1.png" alt="" aria-hidden="true" />
          <img className="hobby-deco hobby-deco-2" src="/img/hobby_vector_2.png" alt="" aria-hidden="true" />
          <img className="hobby-deco hobby-deco-3" src="/img/hobby_vector_3.png" alt="" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default Hobby;
