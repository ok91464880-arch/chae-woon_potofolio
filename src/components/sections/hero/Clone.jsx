import React, { useEffect, useRef } from "react";
import "./Clone.css";

const Clone = () => {
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
      { threshold: 0, rootMargin: "0px 0px 40% 0px" }
    );

    observer.observe(target);
    return () => {
      updateTheme(false);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const sectionTarget = sectionRef.current;
    if (!sectionTarget) return;

    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        sectionTarget.classList.toggle("is-title-inview", entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -40% 0px" }
    );

    titleObserver.observe(sectionTarget);
    return () => {
      sectionTarget.classList.remove("is-title-inview");
      titleObserver.disconnect();
    };
  }, []);

  const cloneData = [
    {
      id: 1,
      title: "Korea Consumer Agency",
      tags: ["#UI CLONE CODING", "#CORPORATE_WEBSITE"],
      img: "./img/clone_1.png",
      url: "https://clone-coding-1-ten.vercel.app/",
    },
    {
      id: 2,
      title: "Hanwha Chemical",
      tags: ["#UI CLONE CODING", "#BRAND_WEBSITE"],
      img: "./img/clone_2.png",
      url: "https://clone-coding-2.vercel.app/",
    },
    {
      id: 3,
      title: "MUSIGN",
      tags: ["#UI CLONE CODING", "#BRAND_WEBSITE"],
      img: "./img/clone_3.png",
      url: "https://clone-coding-3.vercel.app/",
    },
    {
      id: 4,
      title: "YSTUDIO",
      tags: ["#UI CLONE CODING", "#BRAND_WEBSITE"],
      img: "./img/clone_4.png",
      url: "https://clone-coding-4.vercel.app/",
    },
    {
      id: 5,
      title: "DOPDA Concierge",
      tags: ["#UI CLONE CODING", "#SERVICE_WEBSITE"],
      img: "./img/clone_5.png",
      url: "https://clone-coding-5.vercel.app/",
    },
    {
      id: 6,
      title: "CRUELLA MODE",
      tags: ["#UI CLONE CODING", "#FASHION_BRAND"],
      img: "./img/clone_6.png",
      url: "https://clone-coding-6.vercel.app/",
    },
    {
      id: 7,
      title: "Daebang Construction",
      tags: ["#UI CLONE CODING", " #CORPORATE_WEBSITE"],
      img: "./img/clone_7.png",
      url: "https://clone-coding-7.vercel.app/",
    },
    {
      id: 8,
      title: "PHO MEIN",
      tags: ["#UI CLONE CODING", "#RESTAURANT_BRAND"],
      img: "./img/clone_8.png",
      url: "https://clone-coding-8.vercel.app/",
    },
  ];

  const accentMap = {
    3: "musign",
    5: "dopda",
    4: "ystudio",
    6: "cruella",
  };

  const vectorMap = {
    1: "/img/clone_vector.png",
    2: "/img/clone_vector_2.png",
    3: "/img/clone_vector_3.png",
    4: "/img/clone_vector_4.png",
    5: "/img/clone_vector_5.png",
    6: "/img/clone_vector_6.png",
    7: "/img/clone_vector_7.png",
    8: "/img/clone_vector_8.png",
  };

  const renderTitleChars = (text) =>
    text.split("").map((char, index) => (
      <span
        className="clone-title-char"
        style={{ "--char-index": index }}
        key={`${text}-${index}`}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section className="clone" id="clone" ref={sectionRef}>
      <div className="clone-inner">
        <div className="clone-header">
          <span className="clone-badge">CLONE</span>
          <h2 className="clone-title">
            <span className="clone-title-main">
              {renderTitleChars("CLONE")}
            </span>{" "}
            <span className="clone-title-italic">
              {renderTitleChars("CODING")}
            </span>
          </h2>
          <p className="clone-sub">
            A clone coding project interpreting design intent through structured components.
          </p>
        </div>

        <div className="clone-list">
          {cloneData.map((item) => (
            <div
              key={item.id}
              className="clone-item"
              data-accent={accentMap[item.id] || ""}
              role={item.url ? "link" : undefined}
              tabIndex={item.url ? 0 : undefined}
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;
                event.currentTarget.style.setProperty("--hover-x", `${x}%`);
                event.currentTarget.style.setProperty("--hover-y", `${y}%`);
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.removeProperty("--hover-x");
                event.currentTarget.style.removeProperty("--hover-y");
              }}
              onClick={() => {
                if (item.url) {
                  window.open(item.url, "_blank", "noreferrer");
                }
              }}
              onKeyDown={(event) => {
                if (!item.url) return;
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  window.open(item.url, "_blank", "noreferrer");
                }
              }}
            >
              <div className="clone-item-content">
                <h3 className="clone-item-title">
                  {vectorMap[item.id] && (
                    <span className="clone-kca-icon" aria-hidden="true">
                      <img src={vectorMap[item.id]} alt="" />
                    </span>
                  )}
                  <span className="clone-item-title-main">
                    {item.title.split(" ")[0]}
                  </span>
                  {item.title.split(" ").length > 1 && (
                    <span className="clone-item-title-italic">
                      {" "}
                      {item.title.split(" ").slice(1).join(" ")}
                    </span>
                  )}
                </h3>
                <div className="clone-item-tags">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="clone-tag">{tag}</span>
                  ))}
                </div>
              </div>

              {/* ⭐ 호버 시 나타날 플로팅 이미지 */}
              <div className="clone-floating-img">
                <img src={item.img} alt={item.title} />
                <span className="clone-floating-label">
                  <span className="clone-floating-label__track">
                    <span>EXPLORE MORE</span>
                    <span>EXPLORE MORE</span>
                    <span>EXPLORE MORE</span>
                  </span>
                </span>
              </div>

              {item.url ? (
                <a
                  className="clone-item-arrow"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View Project (opens in a new tab)"
                  onMouseEnter={(event) => {
                    const parent = event.currentTarget.closest(".clone-item");
                    if (parent) parent.classList.add("is-arrow-hover");
                  }}
                  onMouseLeave={(event) => {
                    const parent = event.currentTarget.closest(".clone-item");
                    if (parent) parent.classList.remove("is-arrow-hover");
                  }}
                >
                  <span className="clone-item-arrow-icon" aria-hidden="true"></span>
                </a>
              ) : (
                <button
                  className="clone-item-arrow"
                  aria-label="View Project"
                  onMouseEnter={(event) => {
                    const parent = event.currentTarget.closest(".clone-item");
                    if (parent) parent.classList.add("is-arrow-hover");
                  }}
                  onMouseLeave={(event) => {
                    const parent = event.currentTarget.closest(".clone-item");
                    if (parent) parent.classList.remove("is-arrow-hover");
                  }}
                >
                  <span className="clone-item-arrow-icon" aria-hidden="true"></span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clone;
