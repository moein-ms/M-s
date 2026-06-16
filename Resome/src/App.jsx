import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [activeSkill, setActiveSkill] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [likes, setLikes] = useState({});

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedProject?.images) {
      setCurrentImgIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedProject?.images) {
      setCurrentImgIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
    }
  };

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          if (entry.target.id === 'skills') setActiveSkill(true);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.classList.add('reveal');
      revealObserver.observe(section);
    });

    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      sections.forEach(section => revealObserver.unobserve(section));
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const skills = [
    { 
      name: 'JavaScript', 
      level: 90, 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 12h-5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"></path><path d="M9 18h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5"></path></svg>
    },
    { 
      name: 'React.js', 
      level: 85,
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"></circle><path d="M12 7v10"></path><path d="M7 12h10"></path><path d="M8.5 8.5l7 7"></path><path d="M8.5 15.5l7-7"></path></svg>
    },
    { 
      name: 'Node.js', 
      level: 75,
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-8 4.5v9l8 4.5 8-4.5v-9L12 3Z"></path><path d="m12 12 8-4.5"></path><path d="m12 12-8-4.5"></path><path d="M12 12v9"></path></svg>
    },
    { 
      name: 'HTML / CSS', 
      level: 95,
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline><line x1="14" y1="4" x2="10" y2="20"></line></svg>
    },
    { 
      name: 'Python', 
      level: 70,
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
    },
    { 
      name: 'SQL', 
      level: 80,
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
    },
  ];

  return (
    <div className="app-container">
      {/* Custom Cursor Glow (Subtle) */}
      <div className="cursor-glow"></div>

      {/* Dynamic Background */}
      <div className="bg-glow">
        <div className="blob" style={{ background: 'var(--secondary)' }}></div>
        <div className="blob-2" style={{ background: 'var(--primary)' }}></div>
        <div className="floating-icons">
          <span style={{ top: '10%', left: '10%' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"></path></svg>
          </span>
          <span style={{ top: '20%', right: '15%' }}>
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M9 3v18M15 3v18M3 9h18M3 15h18"></path></svg>
          </span>
          <span style={{ bottom: '25%', left: '15%' }}>
            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v20M2 12h20"></path></svg>
          </span>
          <span style={{ bottom: '15%', right: '10%' }}>
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
          </span>
          <div className="code-widget cw1">{'<div>'}</div>
          <div className="code-widget cw2">{'function()'}</div>
          <div className="code-widget cw3">{'const'}</div>
          <div className="code-widget cw4">{'import'}</div>
          <div className="code-widget cw5">{'export'}</div>
        </div>
      </div>

      <nav className="container">
        <div className="nav-content">
          <div className="logo">DEV<span>.</span></div>
          <div className="nav-links">
            <a href="#contact">همکاری کردن</a>
            <a href="#skills">مهارت‌ها</a>
            <a href="#projects">پروژه‌ها</a>
          </div>
        </div>
      </nav>

      <main className="container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              سلام، من یک <br />
              <span className="gradient-text">برنامه‌نویس هستم</span>
            </h1>
            <p className="hero-subtitle">
              من عاشق خلق تجربه‌های دیجیتال منحصر به فرد و حل چالش‌های پیچیده کدنویسی هستم.
              با استفاده از مدرن‌ترین تکنولوژی‌ها، ایده‌های شما را به واقعیت تبدیل می‌کنم.
            </p>
            <div className="hero-btns" style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#projects" className="btn-primary">مشاهده پروژه‌ها</a>
              <a href="#contact" className="btn-secondary">تماس با من</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="profile-placeholder">
              <div className="inner-glow"></div>
              <img src="/projects/prof1.png" alt="Profile" className="custom-logo-img" />
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="logo-grad" x1="0" y1="0" x2="100" y2="100">
                    <stop stopColor="var(--primary-light)" />
                    <stop offset="1" stopColor="var(--secondary)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills">
          <h2 className="section-title">مهارت‌های <span className="gradient-text">فنی</span></h2>
          <div className="glass-card skills-container">
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <div className="skill-label">
                      <span className="skill-icon">{skill.icon}</span>
                      <span className="skill-name">{skill.name}</span>
                    </div>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar-container">
                    <div 
                      className="skill-bar-fill" 
                      style={{ width: activeSkill ? `${skill.level}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects">
          <h2 className="section-title">پروژه‌های <span className="gradient-text">من</span></h2>
          
          {/* PowerPoint Section */}
          <div className="project-category">
            <h3 className="category-title">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              <span>نمونه کارهای پاورپوینت (اسلایدر)</span>
            </h3>
            <div className="projects-grid">
              <div className="glass-card project-card">
                <div className="project-img-placeholder" onClick={() => { 
                  setSelectedProject({ 
                    title: 'استراتژی‌های دفاع در برابر رسانه', 
                    images: ['/projects/slide1.jpg', '/projects/slide2.jpg', '/projects/slide3.jpg'], 
                    desc: 'آموزش استراتژی‌های دفاع عملی و واکسیناسیون فکری در عصر سلطه رسانه و تلویزیون.' 
                  });
                  setCurrentImgIndex(0);
                }}>
                  <img src="/projects/slide1.jpg" alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                  <div className="project-overlay">ورق بزنید (مشاهده گالری)</div>
                </div>
                <div className="project-content">
                  <h3>استراتژی‌های دفاع رسانه‌ای</h3>
                  <div className="project-actions">
                    <button className="like-btn" onClick={(e) => { e.stopPropagation(); toggleLike('pp_gal'); }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill={likes['pp_gal'] ? 'var(--primary)' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                      <span>{likes['pp_gal'] || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-divider"></div>

          {/* GitHub Section */}
          <div className="project-category">
            <h3 className="category-title">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline><line x1="14" y1="4" x2="10" y2="20"></line></svg>
              <span>پروژه‌های کدنویسی (GitHub)</span>
            </h3>
            <div className="projects-grid">
              <div className="glass-card project-card">
                <div className="project-img-placeholder">
                  <div className="project-icon-bg">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  </div>
                </div>
                <div className="project-content">
                  <h3>Digital Market Client (Log)</h3>
                  <div className="project-actions">
                    <button className="like-btn" onClick={() => toggleLike('gh1')}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill={likes['gh1'] ? 'var(--primary)' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                      <span>{likes['gh1'] || 0}</span>
                    </button>
                    <a href="https://github.com/moein-ms/Log" className="project-link">GitHub →</a>
                  </div>
                </div>
              </div>

              <div className="glass-card project-card">
                <div className="project-img-placeholder">
                  <div className="project-icon-bg">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" strokeWidth="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                  </div>
                </div>
                <div className="project-content">
                  <h3>PHP Class Projects</h3>
                  <div className="project-actions">
                    <button className="like-btn" onClick={() => toggleLike('gh2')}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill={likes['gh2'] ? 'var(--primary)' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                      <span>{likes['gh2'] || 0}</span>
                    </button>
                    <a href="https://github.com/moein-ms/PHP-class" className="project-link">GitHub →</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Modal with Slider */}
        {selectedProject && (
          <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
            <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
              <button className="close-modal" onClick={() => setSelectedProject(null)}>&times;</button>
              
              <div className="modal-slider">
                {selectedProject.images && (
                  <>
                    <button className="slider-nav prev" onClick={prevImage}>&#10094;</button>
                    <img src={selectedProject.images[currentImgIndex]} alt={selectedProject.title} className="modal-img" />
                    <button className="slider-nav next" onClick={nextImage}>&#10095;</button>
                    <div className="slider-dots">
                      {selectedProject.images.map((_, i) => (
                        <span key={i} className={`dot ${i === currentImgIndex ? 'active' : ''}`} onClick={() => setCurrentImgIndex(i)}></span>
                      ))}
                    </div>
                  </>
                )}
                {!selectedProject.images && <img src={selectedProject.img} alt={selectedProject.title} className="modal-img" />}
              </div>

              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.desc}</p>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <section id="contact" className="contact">
          <div className="glass-card contact-card">
            <h2>بیایید با هم <span className="gradient-text">همکاری</span> کنیم</h2>
            <p>اگر پروژه‌ای دارید یا فقط می‌خواهید سلام کنید، پیام بدهید!</p>
            <div className="social-links">
              <a href="https://github.com/moein-ms" className="social-icon github-link" title="GitHub">
                <div className="social-img-placeholder gray"></div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                <span>GitHub</span>
              </a>
              <a href="https://t.me/moeinSilco1212" className="social-icon telegram-link" title="Telegram">
                <div className="social-img-placeholder blue"></div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                <span>Telegram</span>
              </a>
              <a href="#" className="social-icon bale-link" title="Bale">
                <div className="social-img-placeholder green"></div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                <span>بله</span>
              </a>
              <a href="#" className="social-icon soroush-link" title="Soroush">
                <div className="social-img-placeholder blue"></div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 6.1H7c-1.1 0-2 .9-2 2v7.8c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8.1c0-1.1-.9-2-2-2z"></path><path d="M12 11.5v3.3M9.5 11.5v3.3M14.5 11.5v3.3"></path></svg>
                <span>سروش</span>
              </a>
              <a href="#" className="social-icon eitaa-link" title="Eitaa">
                <div className="social-img-placeholder orange"></div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8M8 12h8"></path></svg>
                <span>ایتا</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="container">
        <p>© ۲۰۲۶ تمامی حقوق محفوظ است</p>
      </footer>
    </div>
  );
}

export default App;
