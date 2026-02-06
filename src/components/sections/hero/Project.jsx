import React, { useEffect, useRef } from "react";
import "./Project.css";

const Project = () => {
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
    <section className="project" id="project" ref={sectionRef}>
      <div className="project-container">
        {/* 1. 첫 번째 패널 */}
        <div className="project-panel project-panel--dugout">
          <div className="project-text">
            <p className="project-kicker">모바일 팬덤 앱 디자인</p>
            <h3 className="project-title">
              <span className="project-title-italic">DUGOUT</span>
            </h3>
            <p className="project-desc">
              야구 팬의 실제 행동 흐름을 분석해, 경기 전부터 경기 후까지
              이어지는 팬 경험의 여정을 설계한 팀 프로젝트입니다. 정보 탐색,
              소통, 참여가 자연스럽게 이어지도록 보이지 않는 구조로 사용자의
              다음 행동을 이끌었습니다.
            </p>

            <div className="project-meta">
              <span className="project-tag project-tag--dugout">TEAM PROJECT</span>
            </div>

            <div className="project-metrics project-metrics--dugout">
              <div className="metric">
                <span className="metric-label">기획</span>
                <div className="metric-bar">
                  <span style={{ width: "90%" }}></span>
                </div>
                <span className="metric-value">90%</span>
              </div>
              <div className="metric">
                <span className="metric-label">디자인</span>
                <div className="metric-bar">
                  <span style={{ width: "90%" }}></span>
                </div>
                <span className="metric-value">90%</span>
              </div>
              <div className="metric">
                <span className="metric-label">퍼블리싱</span>
                <div className="metric-bar">
                  <span style={{ width: "60%" }}></span>
                </div>
                <span className="metric-value">60%</span>
              </div>
            </div>
          </div>

          <div className="project-image">
            <img src="/img/project_dugout.png" alt="DUGOUT project" />
            <div className="project-image-overlay">
              <div className="project-image-actions">
                <a className="project-image-btn" href="#" aria-label="View project">
                  VIEW PROJECT
                </a>
                <a className="project-image-btn" href="#" aria-label="View prototype">
                  VIEW PROTOTYPE
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. 두 번째 패널 */}
        <div className="project-panel project-panel--faceshop">
          <div className="project-text">
            <p className="project-kicker">브랜드 웹 리뉴얼 디자인</p>
            <h3 className="project-title">
              <span className="project-title-italic">THE FACE SHOP</span>
            </h3>
            <p className="project-desc">
              브랜드의 핵심 가치인 “자연스러운 아름다움”을 중심으로 콘텐츠
              탐색부터 구매까지 이어지는 사용자의 경험 여정을 재설계한 웹
              리뉴얼 팀 프로젝트입니다. 시각적 몰입감과 명확한 정보 구조를
              통해 브랜드 메시지가 자연스럽게 전달되도록 구성했습니다.
            </p>

            <div className="project-meta">
              <span className="project-tag project-tag--faceshop">TEAM PROJECT</span>
            </div>

            <div className="project-metrics project-metrics--faceshop">
              <div className="metric">
                <span className="metric-label">기획</span>
                <div className="metric-bar">
                  <span style={{ width: "90%" }}></span>
                </div>
                <span className="metric-value">90%</span>
              </div>
              <div className="metric">
                <span className="metric-label">디자인</span>
                <div className="metric-bar">
                  <span style={{ width: "100%" }}></span>
                </div>
                <span className="metric-value">100%</span>
              </div>
              <div className="metric">
                <span className="metric-label">퍼블리싱</span>
                <div className="metric-bar">
                  <span style={{ width: "50%" }}></span>
                </div>
                <span className="metric-value">50%</span>
              </div>
            </div>
          </div>

          <div className="project-image">
            <img src="/img/project_thefaceshop.png" alt="The Face Shop project" />
            <div className="project-image-overlay">
              <div className="project-image-actions">
                <a className="project-image-btn" href="#" aria-label="View project">
                  VIEW PROJECT
                </a>
                <a className="project-image-btn" href="#" aria-label="View prototype">
                  VIEW PROTOTYPE
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 세 번째 패널 */}
        <div className="project-panel project-panel--roomie">
          <div className="project-text">
            <p className="project-kicker">인테리어 앱 UX/UI 디자인</p>
            <h3 className="project-title">
              <span className="project-title-italic">ROOMIE</span>
            </h3>
            <p className="project-desc">
              사용자의 취향과 니즈를 구조화해, 공간 추천과 탐색이 직관적으로
              이루어지도록 설계한 개인 프로젝트입니다. 명확한 정보 구조와
              단계적 흐름을 통해 사용자가 망설이지 않고 다음 선택으로 이동할 수
              있도록 UX를 구성했습니다.
            </p>

            <div className="project-meta">
              <span className="project-tag project-tag--roomie">PERSONAL PROJECT</span>
            </div>

            <div className="project-metrics project-metrics--roomie">
              <div className="metric">
                <span className="metric-label">기획</span>
                <div className="metric-bar">
                  <span style={{ width: "100%" }}></span>
                </div>
                <span className="metric-value">100%</span>
              </div>
              <div className="metric">
                <span className="metric-label">디자인</span>
                <div className="metric-bar">
                  <span style={{ width: "100%" }}></span>
                </div>
                <span className="metric-value">100%</span>
              </div>
              <div className="metric">
                <span className="metric-label">퍼블리싱</span>
                <div className="metric-bar">
                  <span style={{ width: "100%" }}></span>
                </div>
                <span className="metric-value">100%</span>
              </div>
            </div>
          </div>

          <div className="project-image">
            <img src="/img/project_roomie.png" alt="Roomie project" />
            <div className="project-image-overlay">
              <div className="project-image-actions">
                <a className="project-image-btn" href="#" aria-label="View project">
                  VIEW PROJECT
                </a>
                <a className="project-image-btn" href="#" aria-label="View prototype">
                  VIEW PROTOTYPE
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4. 네 번째 패널 */}
        <div className="project-panel project-panel--intarial">
          <div className="project-text">
            <p className="project-kicker">INTERIOR &amp; FURNITURE</p>
            <h3 className="project-title">
              <span className="project-title-italic">DESIGN PROJECT</span>
            </h3>
            <p className="project-desc">
              실내 공간 설계부터 가구 디자인까지 전반을 경험하며, 공간의 구조와
              사용자 동선을 중심으로 디자인을 전개한 프로젝트입니다. 기능과 미감을
              균형 있게 조율해 완성도를 높였습니다.
            </p>

            <div className="project-meta">
              <span className="project-tag project-tag--intarial">PERSONAL PROJECT</span>
            </div>

            <div className="project-metrics project-metrics--intarial">
              <div className="metric">
                <span className="metric-label">기획</span>
                <div className="metric-bar">
                  <span style={{ width: "100%" }}></span>
                </div>
                <span className="metric-value">100%</span>
              </div>
              <div className="metric">
                <span className="metric-label">디자인</span>
                <div className="metric-bar">
                  <span style={{ width: "100%" }}></span>
                </div>
                <span className="metric-value">100%</span>
              </div>
            </div>
          </div>

          <div className="project-image">
            <img src="/img/project_intarial.png" alt="Interior project" />
            <div className="project-image-overlay">
              <div className="project-image-actions">
                <a className="project-image-btn" href="#" aria-label="View project">
                  VIEW PROJECT
                </a>
                <a className="project-image-btn" href="#" aria-label="View prototype">
                  VIEW PROTOTYPE
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;
