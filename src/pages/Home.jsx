import React from "react";
import Hero from "../components/sections/hero/Hero";
import VideoSection from "../components/sections/hero/VideoSection";
import AboutMe from "../components/sections/hero/AboutMe";
import History from "../components/sections/hero/History";
import KeywordSection from "../components/sections/hero/KeywordSection";
import Skill from "../components/sections/hero/Skill";
import TeamProject from "../components/sections/hero/TeamProject";
import Project from "../components/sections/hero/Project";
import Clone from "../components/sections/hero/Clone";
import Hobby from "../components/sections/hero/Hobby";
import Faq from "../components/sections/hero/Faq";
import Final from "../components/sections/hero/Final";
import Contact from "../components/sections/hero/Contact";


const Home = () => {
  return (
    <main className="home-page">
      {/* Hero Section */}
      <Hero />

      {/* Video Transition Section */}
      <VideoSection />

      <AboutMe />

      <History />

      <KeywordSection />

      <Skill />
      <TeamProject />
      <Project />
      <Clone />
      <Hobby />
      <Faq />
      <Final />
      <Contact />
    </main>
  );
};

export default Home;
