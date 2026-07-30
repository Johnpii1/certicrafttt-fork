
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaMoon, FaUser, FaTimes, FaArrowRight, FaCheck } from "react-icons/fa";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaMoon, FaUser, FaTimes } from "react-icons/fa";
import MenuDrawer from "./MenuDrawer";
import "./Landing.css";


const certificateCards = [
  { title: "Certificate templates", label: "Design", delay: "0s" },
  { title: "Verified credentials", label: "Secure", delay: "0.12s" },
  { title: "Instant delivery", label: "Fast", delay: "0.24s" },
];

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
      setProgress(Math.min(100, Math.round(scrolled)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="landing-page">
      <header className="landing-nav animate-slide-down">
        <Link to="/" className="landing-logo" aria-label="CertiCraft home">
          Certi<span>Craft</span>
        </Link>

        <div className="landing-menu-wrap">
          <div className="landing-menu-pill">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="landing-menu-button"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
              <span>{menuOpen ? "Close" : "Menu"}</span>
            </button>

            <button className="landing-icon-button" aria-label="Toggle dark mode">
              <FaMoon />
            </button>

            <div className="landing-progress">{progress}%</div>
          </div>

          <MenuDrawer menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>

        <div className="landing-auth-actions">
          <Link to="/login" className="landing-login" aria-label="Sign in">
            <FaUser />
          </Link>
          <Link to="/register" className="landing-cta-small">
            Get Started
          </Link>
        </div>
      </header>

      <section className="landing-hero" id="hero">
        <div className="hero-copy">
          <div className="hero-eyebrow animate-fade-up">Trusted certificate automation</div>
          <h1 className="hero-title animate-fade-up delay-1">
            Create, manage, and verify certificates with polished speed.
          </h1>
          <p className="hero-description animate-fade-up delay-2">
            CertiCraft helps teams turn event data into professional digital certificates, track every update, and keep credentials easy to verify.
          </p>

          <div className="hero-actions animate-fade-up delay-3">
            <Link to="/register" className="hero-primary">
              Start creating <FaArrowRight />
            </Link>
            <a href="#features" className="hero-secondary">
              Explore features
            </a>
function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center gap-10 px-4 py-6">
        {/* LOGO */}
        <div className="font-bold text-sm">
          <h1>Logo</h1>
        </div>

        {/* MENU */}
        <div className="relative inline-flex items-center gap-4 bg-[#0B0B14] rounded-full px-6 py-[3.5px] ">
          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 text-white"
          >
            {menuOpen ? (
              <>
                <FaTimes className="text-md" />
                <span className="text-md">Close</span>
              </>
            ) : (
              <>
                <FaBars className="text-md" />
                <span className="text-md">Menu</span>
              </>
            )}
          </button>

          {/* Dark Mode */}
          <button className="w-6 h-6 rounded-full border border-gray-600 bg-[#0B0B14] flex items-center justify-center">
            <FaMoon className="text-white text-lg" />
          </button>

          {/* Progress */}
          <div className="px-3 py-1 rounded-full bg-gray-700 text-white text-md font-semibold">
            0%

          </div>

          {/* Drawer */}
          <MenuDrawer
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        </div>


        <div className="hero-showcase animate-fade-left" aria-label="Certificate preview placeholders">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          {certificateCards.map((card, index) => (
            <article
              className={`certificate-preview preview-${index + 1}`}
              style={{ animationDelay: card.delay }}
              key={card.title}
            >
              <div className="preview-image-placeholder">
                <span>{card.label}</span>
              </div>
              <div>
                <span className="preview-kicker">CertiCraft</span>
                <h3>{card.title}</h3>
              </div>
            </article>
          ))}

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4">
          {/* Sign In */}
          <Link to="/login">
            <div className="w-6 h-6 rounded-full border border-gray-300 bg-white flex items-center justify-center">
              <FaUser className="text-black text-sm" />
            </div>
          </Link>

          {/* Get Started */}
          <Link to="/register">
            <button className="bg-black rounded-full text-white text-sm px-4 py-2 hover:bg-orange-500 transition">
              Get Started
            </button>
          </Link>

        </div>
      </section>

      <section className="landing-features" id="features">
        {["Bulk generation", "Audit history", "Secure verification"].map((feature) => (
          <div className="feature-chip" key={feature}>
            <FaCheck />
            {feature}
          </div>
        ))}
      </section>
    </main>
  );
}

export default Landing;