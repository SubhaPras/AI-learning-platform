import React, { useEffect, useState } from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="lp-container">
      {/* Navigation */}
      <nav className={`nav ${isScrolled ? 'nav-active' : ''}`}>
        <div className="nav-content">
          <div className="logo">Aura<span>AI</span></div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">Method</a>
            <button className="btn-secondary">Login</button>
            <button className="btn-primary">Join for Free</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <div className="badge">✨ The Future of Learning is Here</div>
          <h1>Master Any Skill <br /><span className="text-gradient">Powered by Intelligence.</span></h1>
          <p>From quantum physics to digital art—AuraAI builds a personalized curriculum tailored to your pace, goals, and learning style.</p>
          <div className="hero-btns">
            <button className="btn-primary btn-large">Start Learning Now</button>
            <button className="btn-outline btn-large">Watch Demo</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card ai-brain">🧠</div>
          <div className="floating-card ai-code">{"</>"}</div>
          <div className="hero-glow"></div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features">
        <h2 className="section-title">Why AuraAI?</h2>
        <div className="feature-grid">
          {[
            { title: "Personalized Paths", desc: "No two brains learn the same. We adapt to you.", icon: "🎯" },
            { title: "24/7 AI Tutor", desc: "Instant answers to your toughest questions, anytime.", icon: "🤖" },
            { title: "Hands-on Projects", desc: "Apply knowledge through AI-generated simulations.", icon: "🛠️" }
          ].map((f, i) => (
            <div key={i} className="feature-card">
              <div className="f-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 AuraAI Learning Systems. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;