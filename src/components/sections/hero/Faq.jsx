import React, { useEffect, useRef, useState } from "react";
import "./Faq.css";

const faqItems = [
  {
    question: "Q. 디자인할 때 가장 중요하게 생각하는 것은 무엇인가요?",
    answer: "사용자가 고민하지 않아도 되는 흐름을 만드는 것입니다. 디자인이 눈에 띄기보다, 사용자가 자연스럽게 다음 행동으로 이동하도록 돕는 것이 가장 중요하다고 생각합니다.",
  },
  {
    question: "Q. 문제를 해결하는 과정에서 가장 중요하게 여기는 단계는 무엇인가요?",
    answer: "문제를 정의하는 단계입니다. 표면적인 요구보다, 왜 이 문제가 발생했는지를 먼저 이해해야 올바른 해결 방향을 잡을 수 있다고 생각합니다.",
  },
  {
    question: "Q. 디자인을 잘했다고 느끼는 순간은 언제인가요?",
    answer: "설명하지 않아도 사용자가 바로 이해하고 사용할 때입니다. 디자인이 의식되지 않고, 경험만 자연스럽게 이어질 때 잘 설계되었다고 느낍니다.",
  },
  {
    question: "Q. 협업 과정에서 중요하게 생각하는 태도는 무엇인가요?",
    answer: "개인의 취향보다 근거와 사용자 경험을 기준으로 소통하는 태도입니다. 서로의 의견을 존중하면서도, 더 나은 방향을 함께 찾는 과정을 중요하게 생각합니다.",
  },
  {
    question: "Q. 지금까지 진행한 프로젝트 중 가장 기억에 남는 경험은 무엇인가요?",
    answer: "사용자 흐름을 처음부터 다시 정리하며 복잡했던 구조가 점점 명확해졌던 경험입니다. 그 과정에서 디자인이 문제를 정리하고 방향을 제시할 수 있다는 확신을 얻었습니다.",
  },
  {
    question: "Q. 앞으로 어떤 디자이너로 성장하고 싶나요?",
    answer: "기능과 감성, 구조와 흐름 사이의 균형을 설계할 수 있는 디자이너로 성장하고 싶습니다. 보이지 않지만 분명히 작동하는 경험을 만드는 것이 제 목표입니다.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(-1); // React.useState -> useState로 통일
  const titleRef = useRef(null);
  const listRef = useRef(null);
  const wasVisibleRef = useRef(false);
  const [titleAnimRun, setTitleAnimRun] = useState(0);
  const [listVisible, setListVisible] = useState(false);
  const listRevealTimerRef = useRef(null);

  useEffect(() => {
    const target = titleRef.current;
    if (!target) {
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        if (isVisible && !wasVisibleRef.current) {
          setTitleAnimRun((prev) => prev + 1);
        }
        wasVisibleRef.current = isVisible;
      },
      { threshold: 0.2 }
    );
    observer.observe(target);
    return () => {
      observer.disconnect();
      if (listRevealTimerRef.current) {
        clearTimeout(listRevealTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const target = listRef.current;
    if (!target) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (listRevealTimerRef.current) {
            clearTimeout(listRevealTimerRef.current);
          }
          listRevealTimerRef.current = setTimeout(() => {
            setListVisible(true);
          }, 400);
        } else {
          if (listRevealTimerRef.current) {
            clearTimeout(listRevealTimerRef.current);
          }
          setListVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
      if (listRevealTimerRef.current) {
        clearTimeout(listRevealTimerRef.current);
      }
    };
  }, []);

  return (
    <section className="faq" id="faq">
      <div className="faq-inner">
        <header className="faq-header">
          <span className="faq-badge">PERSONAL</span>
          <h2 className="faq-title" ref={titleRef}>
            <span className="faq-title-line">
              {"FAQ".split("").map((char, charIndex) => (
                <span
                  className="faq-title-char"
                  style={{ "--char-index": charIndex }}
                  // [수정 1] 백틱(`)을 사용하여 템플릿 리터럴 문법 수정 및 고유 키 생성
                  key={`${titleAnimRun}-${charIndex}`}
                >
                  {char}
                </span>
              ))}
            </span>
          </h2>
        </header>
        <div className={`faq-list ${listVisible ? "is-visible" : ""}`} ref={listRef}>
          {faqItems.map((item, index) => {
            const isOpen = index === openIndex;
            const answerId = `faq-answer-${index}`;
            return (
              <div
                key={item.question}
                className={`faq-item-group ${isOpen ? "active" : ""}`}
                style={{ "--item-index": index }}
              >
                <div className={`faq-item-row ${isOpen ? "active" : ""}`}>
                  <button
                    // [수정 2] 깨진 문자 제거 및 동적 클래스 할당 (열렸을 때 'active' 클래스 추가 가정)
                    className={`faq-item ${isOpen ? "active" : ""}`}
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <span className="faq-item-question">{item.question}</span>
                  </button>
                  <button
                    className="faq-item-arrow"
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    aria-label={isOpen ? "Close answer" : "Open answer"}
                  >
                    <span className="faq-item-icon" aria-hidden="true">
                      {isOpen ? "↘" : "↗"}
                    </span>
                  </button>
                </div>
                {/* [수정 3] 깨진 문자 제거 */}
                <div
                  id={answerId}
                  className={`faq-answer-row ${isOpen ? "active" : ""}`}
                >
                  {/* isOpen일 때만 내용이 보이도록 처리하거나 CSS로 높이를 조절해야 합니다. */}
                  {/* CSS transition을 쓰신다면 구조 유지가 맞고, 아니면 조건부 렌더링 {isOpen && ...}을 써야 합니다. */}
                  <p className="faq-item-answer">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
