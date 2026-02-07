import React from "react";
import "./Clone.css";

const Clone = () => {
  const cloneData = [
    {
      id: 1,
      title: "Korea Consumer Agency",
      tags: ["#UI CLONE CODING", "#CORPORATE_WEBSITE"],
      img: "./img/clone_1.png",
    },
    {
      id: 2,
      title: "Hanwha Chemical",
      tags: ["#UI CLONE CODING", "#BRAND_WEBSITE"],
      img: "./img/clone_2.png",
    },
    {
      id: 3,
      title: "MUSIGN",
      tags: ["#UI CLONE CODING", "#FASHION_BRAND"],
      img: "./img/clone_3.png",
    },
    {
      id: 4,
      title: "YSTUDIO",
      tags: ["#UI CLONE CODING", "#FASHION_BRAND"],
      img: "./img/clone_4.png",
    },
    {
      id: 5,
      title: "DOPDA Concierge",
      tags: ["#UI CLONE CODING", "#FASHION_BRAND"],
      img: "./img/clone_5.png",
    },
    {
      id: 6,
      title: "CRUELLA MODE",
      tags: ["#UI CLONE CODING", "#FASHION_BRAND"],
      img: "./img/clone_6.png",
    },
    {
      id: 7,
      title: "Daebang Construction",
      tags: ["#UI CLONE CODING", "#FASHION_BRAND"],
      img: "./img/clone_7.png",
    },
    {
      id: 8,
      title: "PHO MEIN",
      tags: ["#UI CLONE CODING", "#FASHION_BRAND"],
      img: "./img/clone_8.png",
    },
  ];

  return (
    <section className="clone" id="clone">
      <div className="clone-inner">
        <div className="clone-header">
          <span className="clone-badge">CLONE</span>
          <h2 className="clone-title">
            <span className="clone-title-main">CLONE</span>{" "}
            <span className="clone-title-italic">CODING</span>
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
            >
              <div className="clone-item-content">
                <h3 className="clone-item-title">{item.title}</h3>
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
                  </span>
                </span>
              </div>

              <button className="clone-item-arrow" aria-label="View Project">
                <img src="/img/about_diagonalarrow.png" alt="arrow" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clone;
