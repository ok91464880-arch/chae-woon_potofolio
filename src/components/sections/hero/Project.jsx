import React, { useEffect, useRef, useState } from "react";
import "./Project.css";

const Project = () => {
  const sectionRef = useRef(null);
  const dugoutRef = useRef(null);
  const faceshopRef = useRef(null);
  const roomieRef = useRef(null);
  const intarialRef = useRef(null);
  const dugoutGallery = ["/img/project_dugout.png", "/img/dugout_1.png", "/img/dugout_2.png"];
  const [dugoutImage, setDugoutImage] = useState(dugoutGallery[0]);
  const faceshopGallery = ["/img/project_thefaceshop.png", "/img/project_thefaceshop_2.png", "/img/project_thefaceshop_3.png"];
  const [faceshopImage, setFaceshopImage] = useState(faceshopGallery[0]);
  const roomieGallery = ["/img/project_roomie.png", "/img/project_roomie_2.png", "/img/project_roomie_3.png"];
  const [roomieImage, setRoomieImage] = useState(roomieGallery[0]);
  const intarialGallery = ["/img/project_intarial.png", "/img/project_intarial_2.png", "/img/project_intarial_3.png"];
  const [intarialImage, setIntarialImage] = useState(intarialGallery[0]);
  const renderProjectTitle = (text) =>
    text.split("").map((char, index) => (
      <span
        className="project-title-char"
        style={{ "--char-index": index }}
        key={`${text}-${index}`}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

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
      { threshold: 0, rootMargin: "0px 0px 40% 0px" }
    );

    observer.observe(target);
    return () => {
      updateTheme(false);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const targets = [dugoutRef.current, faceshopRef.current, roomieRef.current, intarialRef.current].filter(Boolean);
    if (targets.length === 0) return;

    const resetMap = new Map([
      [dugoutRef.current, () => setDugoutImage(dugoutGallery[0])],
      [faceshopRef.current, () => setFaceshopImage(faceshopGallery[0])],
      [roomieRef.current, () => setRoomieImage(roomieGallery[0])],
      [intarialRef.current, () => setIntarialImage(intarialGallery[0])],
    ]);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-inview", entry.isIntersecting);
          if (!entry.isIntersecting) {
            const reset = resetMap.get(entry.target);
            if (reset) reset();
          }
        });
      },
      { threshold: 0.6 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="project" id="project" ref={sectionRef}>
      <div className="project-container">
        {/* 1. 첫 번째 패널 */}
        <div className="project-panel project-panel--dugout" ref={dugoutRef}>
          <div className="project-text">
            <div className="project-meta">
              <span className="project-tag project-tag--dugout">TEAM PROJECT</span>
            </div>
            <p className="project-kicker">
              <span>모바일 팬덤 앱 디자인</span>
            </p>
            <h3 className="project-title">
              <span className="project-title-italic">{renderProjectTitle("DUGOUT")}</span>
            </h3>
            <p className="project-desc">
              야구 팬의 실제 행동 흐름을 분석해, 경기 전부터 경기 후까지
              이어지는 팬 경험의 여정을 설계한 팀 프로젝트입니다. 정보 탐색,
              소통, 참여가 자연스럽게 이어지도록 보이지 않는 구조로 사용자의
              다음 행동을 이끌었습니다.
            </p>

            <div className="project-thumbs">
              {dugoutGallery.map((src, index) => (
                <button
                  key={`dugout-thumb-${index}`}
                  className={`project-thumb${dugoutImage === src ? " is-active" : ""}`}
                  type="button"
                  onClick={() => setDugoutImage(src)}
                  aria-label={`DUGOUT thumbnail ${index + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
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
            <img
              key={dugoutImage}
              src={dugoutImage}
              alt="DUGOUT project"
              className="project-image-media"
            />
            <div className="project-image-overlay">
              <div className="project-image-actions">
                <a
                  className="project-image-btn"
                  href="https://www.figma.com/proto/PZ4DcB2o1rpPu4NV4Wv1DB/%EB%8D%95%EC%95%84%EC%9B%83-%EA%B8%B0%ED%9A%8D%EC%84%9C?page-id=0%3A1&node-id=1-376&viewport=674%2C334%2C0.14&t=FSHJbFcrDpcNhDEc-1&scaling=min-zoom&content-scaling=fixed"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View project"
                >
                  VIEW PROJECT
                </a>
                <a
                  className="project-image-btn"
                  href="https://dugout-ruby.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View prototype"
                >
                  VIEW PROTOTYPE
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. 두 번째 패널 */}
        <div className="project-panel project-panel--faceshop" ref={faceshopRef}>
          <div className="project-text">
            <div className="project-meta">
              <span className="project-tag project-tag--faceshop">TEAM PROJECT</span>
            </div>
            <p className="project-kicker">
              <span>브랜드 웹 리뉴얼 디자인</span>
            </p>
            <h3 className="project-title">
              <span className="project-title-italic">{renderProjectTitle("THE FACE SHOP")}</span>
            </h3>
            <p className="project-desc">
              브랜드의 핵심 가치인 “자연스러운 아름다움”을 중심으로 콘텐츠
              탐색부터 구매까지 이어지는 사용자의 경험 여정을 재설계한 웹
              리뉴얼 팀 프로젝트입니다. 시각적 몰입감과 명확한 정보 구조를
              통해 브랜드 메시지가 자연스럽게 전달되도록 구성했습니다.
            </p>

            <div className="project-thumbs">
              {faceshopGallery.map((src, index) => (
                <button
                  key={`faceshop-thumb-${index}`}
                  className={`project-thumb${faceshopImage === src ? " is-active" : ""}`}
                  type="button"
                  onClick={() => setFaceshopImage(src)}
                  aria-label={`THE FACE SHOP thumbnail ${index + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
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
            <img
              key={faceshopImage}
              src={faceshopImage}
              alt="The Face Shop project"
              className="project-image-media"
            />
            <div className="project-image-overlay">
              <div className="project-image-actions">
                <a
                  className="project-image-btn"
                  href="https://www.figma.com/proto/5kn9bkbhdFghVqdjzOeHEW/%EB%8D%94%ED%8E%98%EC%9D%B4%EC%8A%A4%EC%83%B5-%EA%B8%B0%ED%9A%8D%EC%84%9C?page-id=0%3A1&node-id=1-8&viewport=435%2C260%2C0.45&t=2oVoAfcP7hxRiIZs-1&scaling=min-zoom&content-scaling=fixed"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View project"
                >
                  VIEW PROJECT
                </a>
                <a
                  className="project-image-btn"
                  href="https://dkankfk-gif.github.io/team-Project/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View prototype"
                >
                  VIEW PROTOTYPE
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 세 번째 패널 */}
        <div className="project-panel project-panel--roomie" ref={roomieRef}>
          <div className="project-text">
            <div className="project-meta">
              <span className="project-tag project-tag--roomie">PERSONAL PROJECT</span>
            </div>
            <p className="project-kicker">
              <span>인테리어 앱 UX/UI 디자인</span>
            </p>
            <h3 className="project-title">
              <span className="project-title-italic">{renderProjectTitle("ROOMIE")}</span>
            </h3>
            <p className="project-desc">
              사용자의 취향과 니즈를 구조화해, 공간 추천과 탐색이 직관적으로
              이루어지도록 설계한 개인 프로젝트입니다. 명확한 정보 구조와
              단계적 흐름을 통해 사용자가 망설이지 않고 다음 선택으로 이동할 수
              있도록 UX를 구성했습니다.
            </p>

            <div className="project-thumbs">
              {roomieGallery.map((src, index) => (
                <button
                  key={`roomie-thumb-${index}`}
                  className={`project-thumb${roomieImage === src ? " is-active" : ""}`}
                  type="button"
                  onClick={() => setRoomieImage(src)}
                  aria-label={`ROOMIE thumbnail ${index + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
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
            <img
              key={roomieImage}
              src={roomieImage}
              alt="Roomie project"
              className="project-image-media"
            />
            <div className="project-image-overlay">
              <div className="project-image-actions">
                <a
                  className="project-image-btn"
                  href="https://www.figma.com/proto/agr5obdHCuDNz7nE5fKwvp/%EB%A3%A8%EB%AF%B8-%EA%B8%B0%ED%9A%8D%EC%84%9C?page-id=0%3A1&node-id=1-246&viewport=667%2C361%2C0.17&t=lbjICdqXOz1ywdll-1&scaling=min-zoom&content-scaling=fixed"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View project"
                >
                  VIEW PROJECT
                </a>
                <a
                  className="project-image-btn"
                  href="https://www.figma.com/proto/3xqZKNE1JrExiGghjAQLE4/%EB%A3%A8%EB%AF%B8-%ED%94%84%EB%A1%9C%ED%8A%B8%ED%83%80%EC%9E%85?page-id=0%3A1&node-id=1-4673&p=f&viewport=-326%2C-99%2C0.16&t=gdjkDaeuVVfad7bY-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A4673"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View prototype"
                >
                  VIEW PROTOTYPE
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4. 네 번째 패널 */}
        <div className="project-panel project-panel--intarial" ref={intarialRef}>
          <div className="project-text">
            <div className="project-meta">
              <span className="project-tag project-tag--intarial">PERSONAL PROJECT</span>
            </div>
            <p className="project-kicker">
              <span>INTERIOR &amp; FURNITURE</span>
            </p>
            <h3 className="project-title">
              <span className="project-title-italic">{renderProjectTitle("DESIGN PROJECT")}</span>
            </h3>
            <p className="project-desc">
              실내 공간 설계부터 가구 디자인까지 전반을 경험하며, 공간의 구조와
              사용자 동선을 중심으로 디자인을 전개한 프로젝트입니다. 기능과 미감을
              균형 있게 조율해 완성도를 높였습니다.
            </p>

            <div className="project-thumbs">
              {intarialGallery.map((src, index) => (
                <button
                  key={`intarial-thumb-${index}`}
                  className={`project-thumb${intarialImage === src ? " is-active" : ""}`}
                  type="button"
                  onClick={() => setIntarialImage(src)}
                  aria-label={`DESIGN PROJECT thumbnail ${index + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
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
            <img
              key={intarialImage}
              src={intarialImage}
              alt="Interior project"
              className="project-image-media"
            />
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
