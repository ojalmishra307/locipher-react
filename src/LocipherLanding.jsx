import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
 
const styles = `
 @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');
 
html { scroll-behavior:very smooth; }
 
* { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; background: #f7efd0; color: #604734; }
 
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(252, 247, 217, 0.82); backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(96, 71, 52, 0.08);
    padding: 0 64px; height: 64px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
  .logo-wordmark {
    font-family: 'Playfair Display', serif; font-size: 20px;
    font-weight: 700; font-style: italic; color: #604734; letter-spacing: -0.3px;
  }
  .nav-links { display: flex; align-items: center; gap: 40px; list-style: none; }
  .nav-links a { text-decoration: none; color: #8a6a58; font-size: 14px; font-weight: 400; transition: color 0.2s; }
  .nav-links a:hover { color: #604734; }
  .nav-links li > button:not(.nav-cta) {
    background: none; border: none; padding: 0; margin: 0;
    color: #8a6a58; font-size: 14px; font-weight: 400;
    font-family: 'Inter', sans-serif; cursor: pointer; transition: color 0.2s;
  }
  .nav-links li > button:not(.nav-cta):hover { color: #604734; }
  .nav-cta {
    background: #604734; color: #fcf7d9 !important; padding: 10px 24px;
    border-radius: 100px; font-size: 14px !important; font-weight: 500 !important;
    font-family: 'Inter', sans-serif; cursor: pointer; border: none;
  }
 
  .hero {
    min-height: 100vh; padding: 120px 64px 80px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
    align-items: center; max-width: 1280px; margin: 0 auto;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(240, 197, 212, 0.4); border: 1px solid rgba(201, 132, 138, 0.3);
    color: #c9848a; padding: 5px 14px; border-radius: 100px;
    font-size: 11px; font-weight: 600; letter-spacing: 1.5px;
    text-transform: uppercase; margin-bottom: 24px;
  }
  .hero-title {
    font-family: 'Playfair Display', serif; font-size: 58px; font-weight: 700;
    line-height: 1.1; color: #604734; letter-spacing: -1px; margin-bottom: 20  px;
  }

  .hero-divider {
  width: 40px;
  height: 1px;
  background: rgba(36, 21, 52, 0.25);
  margin: 14px auto;
}

  .hero-title-italic { font-style: italic; color: #c9848a; }
  .hero-sub {
    font-size: 17px; line-height: 1.7; color: #8a6a58;
    margin-bottom: 32px; max-width: 480px; font-weight: 300;
  }
  .hero-quote {
    border-left: 3px solid #f0c5d4; padding: 12px 20px;
    background: rgba(246, 216, 214, 0.2); border-radius: 0 8px 8px 0;
    margin-bottom: 40px; max-width: 480px;
  }
  .hero-quote p {
    font-family: 'Playfair Display', serif; font-style: italic;
    color: #c9848a; font-size: 16px;
  }
  .hero-buttons { display: flex; gap: 22px; align-items: center; margin-top: 40px; }
  .btn-primary {
  background: #604734;
  color: #fcf7d9;
  padding: 14px 32px;
  border-radius: 100px;
  font-size: 15px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
  font-family: 'Inter', sans-serif;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  text-decoration: none;
}
  .btn-primary:hover { opacity: 0.85; }
  .btn-secondary {
  background: transparent;
  color: #604734;
  padding: 14px 32px;
  border-radius: 100px;
  font-size: 15px;
  font-weight: 500;
  border: 1.5px solid rgba(96, 71, 52, 0.3);
  cursor: pointer;
  transition: border-color 0.2s;
  font-family: 'Inter', sans-serif;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
}
  .btn-secondary:hover { border-color: #604734; }
 
  .hero-card {
    background: #ffffff; border-radius: 20px; padding: 32px;
    box-shadow: 0 4px 40px rgba(96, 71, 52, 0.08);
    border: 1px solid rgba(96, 71, 52, 0.06);
  }
  .card-input-row { display: flex; gap: 8px; margin-bottom: 20px; }
  .card-input {
    flex: 1; padding: 10px 16px; border: 1px solid rgba(96, 71, 52, 0.15);
    border-radius: 100px; font-size: 13px; color: #604734;
    background: #fcf7d9; font-family: 'Inter', sans-serif; outline: none;
    cursor: default;
  }
  .card-input:focus { outline: none; border-color: rgba(96, 71, 52, 0.15); }
  .card-btn {
    background: #604734; color: #fcf7d9; border: none;
    padding: 10px 20px; border-radius: 100px; font-size: 13px;
    font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif;
    white-space: nowrap; display: flex; align-items: center; gap: 6px;
  }
  .card-header {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: 20px; padding-bottom: 16px;
    border-bottom: 1px solid rgba(96, 71, 52, 0.08);
  }
  .card-label { font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #c9848a; }
  .card-sublabel { font-size: 13px; color: #8a6a58; margin-top: 2px; }
  .card-badge {
    background: rgba(240, 197, 212, 0.4); color: #c9848a; font-size: 10px;
    font-weight: 600; letter-spacing: 1px; padding: 4px 10px;
    border-radius: 100px; border: 1px solid rgba(201, 132, 138, 0.3);
    display: flex; align-items: center; gap: 4px;
  }
  .card-section { margin-bottom: 16px; }
  .card-section-title {
    font-size: 11px; font-weight: 600; letter-spacing: 1px;
    text-transform: uppercase; color: #8a6a58; margin-bottom: 10px;
  }
  .concern-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(246, 216, 214, 0.4); border: 1px solid rgba(201, 132, 138, 0.3);
    color: #c9848a; padding: 6px 14px; border-radius: 100px;
    font-size: 13px; font-weight: 500;
  }
  .card-text { font-size: 14px; line-height: 1.7; color: #8a6a58; }
  .card-questions { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .card-questions li {
    font-size: 13px; color: #8a6a58; padding: 8px 12px;
    background: rgba(252, 247, 217, 0.6); border-radius: 8px;
    border-left: 2px solid #f0c5d4;
  }
 
  .problem-section { background: #2a1f1a; padding: 100px 64px; text-align: center; }
  .section-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; color: #c9848a; margin-bottom: 20px;
  }
  .section-title-light {
    font-family: 'Playfair Display', serif; font-size: 44px; font-weight: 700;
    color: #fcf7d9; line-height: 1.15; letter-spacing: -0.5px; margin-bottom: 16px;
    max-width: 700px; margin-left: auto; margin-right: auto;
  }
  .section-title-italic-pink { font-style: italic; color: #c9848a; }
  .section-sub {
    font-size: 16px; color: rgba(252, 247, 217, 0.5);
    max-width: 600px; margin: 0 auto 60px; line-height: 1.7; font-weight: 300;
  }
  .problem-cards {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 20px; max-width: 1000px; margin: 0 auto;
  }
  .problem-card {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px; padding: 28px; text-align: left;
  }
  .problem-card-icon { color: #c9848a; margin-bottom: 16px; }
  .problem-card-title { font-size: 16px; font-weight: 600; color: #fcf7d9; margin-bottom: 10px; }
  .problem-card-text { font-size: 14px; color: rgba(252, 247, 217, 0.5); line-height: 1.6; font-weight: 300; }

  .ai-preview{
  margin-top:10px;
  padding:14px 16px;
  border:1px solid rgba(201,132,138,.25);
  background:#f8eef3;
  border-radius:12px;

  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
}

.ai-text{
  font-size:13px;
  line-height:1.5;
  color:#604734;
}

.ai-btn{
  flex-shrink:0;
  background:#604734;
  color:#fcf7d9;
  border:none;
  border-radius:999px;
  padding:8px 16px;
  font-size:12px;
  font-weight:600;
  cursor:pointer;
}
 
  .how-section { padding: 100px 64px; max-width: 1280px; margin: 0 auto; text-align: center; }
  .section-title-dark {
    font-family: 'Playfair Display', serif; font-size: 44px; font-weight: 700;
    color: #4e3b2c; line-height: 1.15; letter-spacing: -0.5px; margin-bottom: 16px;
  }
  .steps-grid {
    display: grid; grid-template-columns: repeat(5, 1fr);
    gap: 32px; margin-top: 60px; text-align: left;
  }
  .step-number {
    font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 700;
    color: rgba(240, 197, 212, 0.5); line-height: 1; margin-bottom: 12px;
  }
  .step-label { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #c9848a; margin-bottom: 8px; }
  .step-title { font-size: 17px; font-weight: 600; color: #604734; margin-bottom: 10px; }
  .step-text { font-size: 14px; color: #8a6a58; line-height: 1.6; font-weight: 300; }
 
  .who-section { background: #fff8f0; padding: 100px 64px; }
  .who-inner { max-width: 1000px; margin: 0 auto; }
  .who-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 40px; margin-top: 60px; align-items: start; }
  .who-list { display: flex; flex-direction: column; gap: 12px; }
  .who-item {
    padding: 20px 24px; border-radius: 12px; border: 1px solid rgba(96, 71, 52, 0.1);
    cursor: pointer; transition: all 0.2s; background: transparent; text-align: left; width: 100%;
  }
  .who-item.active { background: #ffffff; border-color: #f0c5d4; box-shadow: 0 2px 20px rgba(96, 71, 52, 0.06); }
  .who-item-title { font-size: 15px; font-weight: 600; color: #604734; margin-bottom: 4px; }
  .who-item-sub { font-size: 13px; color: #8a6a58; font-style: italic; font-family: 'Playfair Display', serif; }
  .who-detail { background: #ffffff; border-radius: 16px; padding: 36px; border: 1px solid rgba(96, 71, 52, 0.08); }
  .who-detail-title { font-size: 20px; font-weight: 600; color: #604734; margin-bottom: 8px; }
  .who-detail-quote { font-family: 'Playfair Display', serif; font-style: italic; color: #c9848a; font-size: 16px; margin-bottom: 20px; }
  .who-detail-text { font-size: 15px; color: #8a6a58; line-height: 1.7; font-weight: 300; }
 
  .cta-section { background: #604734; padding: 100px 64px; text-align: center; }
  .cta-title { font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 700; color: #fcf7d9; line-height: 1.15; margin-bottom: 16px; }
  .cta-sub { font-size: 16px; color: rgba(252, 247, 217, 0.6); margin-bottom: 40px; font-weight: 300; }
  .cta-buttons { display: flex; gap: 16px; justify-content: center; }
  .btn-cream {
    background: #fcf7d9; color: #604734; padding: 14px 36px; border-radius: 100px;
    font-size: 15px; font-weight: 600; border: none; cursor: pointer;
    font-family: 'Inter', sans-serif; transition: opacity 0.2s;
    display: flex; align-items: center; gap: 8px;
     text-decoration: none;
  }
  .btn-cream:hover { opacity: 0.9; }


 @media (max-width:768px){

body {
  margin: 0;
  overflow-x: clip;
}

.nav{
padding:0 18px;
height:62px;
}

.logo-wordmark{
font-size:22px;
}

.nav-links{
display:none;
}

.hero{
grid-template-columns:1fr;
padding:90px 22px 55px;
gap:42px;
overflow:hidden;
}

.hero-title{
font-size:42px;
line-height:1.15;
}

.hero-sub,
.hero-quote{
max-width:100%;
}

.hero-buttons{
flex-direction:column;
gap:14px;
}

.btn-primary,
.btn-secondary{
width:100%;
justify-content:center;
}

.hero-card{
padding:22px;
border-radius:18px;
}

.card-input-row{
flex-direction:column;
}

.card-btn{
width:100%;
justify-content:center;
}

.ai-preview{
flex-direction:column;
align-items:stretch;
}

.ai-btn{
width:100%;
}

.problem-section{
padding:75px 22px;
overflow:hidden;
}

.problem-cards{
grid-template-columns:1fr;
gap:18px;
}

.problem-card{
padding:24px;
}

.section-title-light,
.section-title-dark{
font-size:34px;
}

.section-sub{
font-size:15px;
margin-bottom:42px;
}

.how-section{
padding:75px 22px;
overflow:hidden;
}

.steps-grid{
display:grid;
grid-template-columns:1fr;
gap:30px;
text-align:center;
}

.step-number{
font-size:44px;
}

.who-section{
padding:75px 22px;
overflow:hidden;
}

.who-grid{
grid-template-columns:1fr;
gap:22px;
}

.who-detail{
margin-top:0;
padding:24px;
}

.cta-section{
padding:75px 22px;
}

.cta-title{
font-size:38px;
}

.cta-buttons{
flex-direction:column;
}

.btn-cream{
width:100%;
justify-content:center;
}

.footer{
padding:32px 22px;
flex-direction:column;
gap:16px;
text-align:center;
}

section#assistant{
padding:75px 22px !important;
overflow:hidden;
}

section#assistant > div > div:last-child{
padding:22px !important;
}

section#assistant div[style*="display: flex"][style*="gap: 8px"]{
flex-direction:column;
}

section#assistant div[style*="background: #604734"][style*="Send"]{
width:100%;
text-align:center;
}

}
`;
 
const IconDNA = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M3 2C3 2 6 4 6 7C6 10 3 12 3 12"/>
    <path d="M11 2C11 2 8 4 8 7C8 10 11 12 11 12"/>
    <line x1="3.5" y1="4.5" x2="10.5" y2="4.5"/>
    <line x1="3.5" y1="9.5" x2="10.5" y2="9.5"/>
    <line x1="3" y1="7" x2="11" y2="7"/>
  </svg>
);
 
const IconDoc = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="18" height="24" rx="2"/>
    <line x1="9" y1="9" x2="19" y2="9"/>
    <line x1="9" y1="13" x2="19" y2="13"/>
    <line x1="9" y1="17" x2="15" y2="17"/>
  </svg>
);
 
const IconClock = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="14" cy="14" r="11"/>
    <polyline points="14 8 14 14 18 17"/>
  </svg>
);
 
const IconSearch = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8"/>
    <line x1="18" y1="18" x2="24" y2="24"/>
  </svg>
);
 
const IconWarning = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.5 1L12.5 12H0.5L6.5 1Z"/>
    <line x1="6.5" y1="5.5" x2="6.5" y2="8.5"/>
    <circle cx="6.5" cy="10.5" r="0.5" fill="currentColor"/>
  </svg>
);
 
const IconCheck = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1.5 5.5 4.5 8.5 9.5 2.5"/>
  </svg>
);
 
const IconSearchSmall = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5.5" cy="5.5" r="4"/>
    <line x1="8.5" y1="8.5" x2="12" y2="12"/>
  </svg>
);
 
const Logo = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
    <circle cx="14" cy="14" r="6" stroke="#604734" strokeWidth="1.5"/>
    <circle cx="14" cy="14" r="2" fill="#604734"/>
    <line x1="14" y1="2" x2="14" y2="8" stroke="#604734" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="14" y1="20" x2="14" y2="26" stroke="#604734" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="2" y1="14" x2="8" y2="14" stroke="#604734" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="20" y1="14" x2="26" y2="14" stroke="#604734" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="26" cy="26" r="7" fill="#fcf7d9" stroke="#604734" strokeWidth="1.5"/>
    <circle cx="24.5" cy="24.5" r="3" stroke="#c9848a" strokeWidth="1.2"/>
    <line x1="26.8" y1="26.8" x2="30" y2="30" stroke="#604734" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
 
const whoData = [
  {
    title: "Patients",
    sub: '"What does my report actually mean?"',
    detail: "You just received a genetic test report full of terms you don't recognise. Locipher translates your variant into plain language - what gene is affected, what it means for your health, and exactly what to ask your doctor.",
  },
  {
    title: "Genetic Counselors",
    sub: '"Help me explain this to my patient quickly."',
    detail: "Save time preparing patient-friendly explanations. Paste any variant and get a clear, accurate summary you can share directly with patients before or after their appointment.",
  },
  {
    title: "Family Members",
    sub: '"My relative just got results - how do I help?"',
    detail: "Supporting someone through a genetic diagnosis is hard when you don't understand the science. Locipher gives you clear, compassionate context so you can be there for them.",
  },
];
 
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};
 
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } }
};
 
const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.2 } }
};
 
export default function LocipherLanding() {
    const [activeWho, setActiveWho] = useState(0);
 
  return (
    <>
      <style>{styles}</style>
 
      <motion.nav
        className="nav"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <a href="#" className="nav-logo">
          <Logo />
          <span className="logo-wordmark">locipher</span>
        </a>
        <ul className="nav-links">
          <li><a href="#how">How It Works</a></li>
          <li><a href="#assistant">AI Assistant</a></li>

<li><a href="#who">Who It's For</a></li>
<li><Link to="/about" onClick={() => window.scrollTo(0, 0)}>About</Link></li>
          <li><Link to="/app" className="nav-cta">Try Locipher</Link></li>
        </ul>
      </motion.nav>
 
      <section className="hero">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-badge">
            <IconDNA />
            Genomics AI
          </div>
          <h1 className="hero-title">
            Your genes,<br />
            now <span className="hero-title-italic">decoded.</span>
          </h1>
          <div className="hero-divider"></div>
          <p className="hero-sub">
            Paste any variant from your genetic test report and get a clear, easy to understand explanation - no medical degree required.
          </p>
          <div className="hero-quote">
            <p>Think of it as a translator between your genes and your life.</p>
          </div>
          <div className="hero-buttons" style={{ gap: '32px', marginTop: '40px' }}>
            <Link to="/app" className="btn-primary">
  <IconSearchSmall />
  Decode a Variant
</Link>

<Link to="/about" className="btn-secondary">
  Learn More
</Link>
          </div>
        </motion.div>
 
        <motion.div
          className="hero-card"
          variants={slideRight}
          initial="hidden"
          animate="visible"
        >
          <div className="card-input-row">
            <input className="card-input" value="BRCA1 c.5266dupC" readOnly tabIndex="-1" />
            <button className="card-btn">
  <IconSearchSmall />
  Decode
</button>
          </div>
          <div className="card-header">
            <div>
              <div className="card-label">Your Results</div>
              <div className="card-sublabel">BRCA1 · Pathogenic variant</div>
            </div>
            <div className="card-badge">
              <IconCheck />
              ClinVar verified
            </div>
          </div>
          <div className="card-section">
            <div className="card-section-title">Concern level</div>
            <div className="concern-badge">
              <IconWarning />
              HIGH - linked to increased cancer risk
            </div>
          </div>
          <div className="card-section">
            <div className="card-section-title">What this means</div>
            <p className="card-text">The BRCA1 gene normally acts like a proofreader for your DNA. This mutation means that proofreader isn't working properly, which can allow errors to build up over time.</p>
          </div>
          <div className="card-section">
            <div className="card-section-title">Ask your doctor</div>
            <ul className="card-questions">
              <li>What screening schedule do you recommend for me?</li>
              <li>Should my family members be tested?</li>
              <li>Are there preventive options I should consider?</li>
            </ul>
          </div>
          <div className="card-section">
  <div className="card-section-title">AI FOLLOW-UP CHAT</div>

  <div className="ai-preview">
    <div className="ai-text">
      ಄ Ask unlimited follow-up questions about your variant in plain English.
    </div>

    <button className="ai-btn">
      Try AI Chat →
    </button>
  </div>
</div>
        </motion.div>
      </section>
 
      <motion.section
        className="problem-section"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="section-eyebrow">The Problem</div>
        <h2 className="section-title-light">
          Patients get reports.<br />
          <span className="section-title-italic-pink">Not explanations.</span>
        </h2>
        <p className="section-sub">
          Genetic testing is more accessible than ever. Understanding your results isn't. Locipher changes that.
        </p>
        <div className="problem-cards">
          {[
            { icon: <IconDoc />, title: "Reports full of jargon", text: 'Most genetic reports are written for clinicians, not patients. Terms like "pathogenic variant" mean nothing without context.' },
            { icon: <IconClock />, title: "Counselors are scarce", text: "Genetic counselors are expensive and hard to access - especially in India, where the field is still growing." },
            { icon: <IconSearch />, title: "Google makes it worse", text: "Searching your variant online returns research papers, not answers. Patients are left more confused and more anxious than before." },
          ].map((card, i) => (
            <motion.div
              key={i}
              className="problem-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="problem-card-icon">{card.icon}</div>
              <div className="problem-card-title">{card.title}</div>
              <p className="problem-card-text">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
 
      <section className="how-section" id="how">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-eyebrow">How It Works</div>
          <h2 className="section-title-dark">
            From variant to clarity -<br />
            <span style={{ fontStyle: "italic", color: "#c9848a" }}>in seconds.</span>
          </h2>
        </motion.div>
        <div className="steps-grid">
          {[
            { n: "01", label: "Step 1", title: "Paste your variant", text: "Copy the variant code from your genetic test report - something like BRCA1 c.5266dupC - and paste it into Locipher." },
            { n: "02", label: "Step 2", title: "We search ClinVar", text: "Locipher queries the NIH's ClinVar database - over 1 million variants - and pulls the clinical data for your specific result." },
            { n: "03", label: "Step 3", title: "AI explains it", text: "Our AI translates the clinical data into easy-to-understand, clear language. No jargon. No fear. Just the information you actually need." },
            { n: "04", label: "Step 4", title: "Talk to your AI assistant", text: "Every report raises new questions. Chat with Locipher to understand your variant, your risks, and the medical terms that matter." },
            { n: "05", label: "Step 5", title: "You walk in prepared", text: "Take your plain-English summary and the suggested doctor questions to your next appointment. Walk in informed, not anxious." },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="step-number">{s.n}</div>
              <div className="step-label">{s.label}</div>
              <div className="step-title">{s.title}</div>
              <p className="step-text">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
<section id="assistant" style={{ padding: '100px 64px', background: '#ffffff', textAlign: 'center' }}>
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    style={{ maxWidth: '800px', margin: '0 auto' }}
  >
    <div className="section-eyebrow">special AI feature</div>
    <h2 className="section-title-dark">
      Meet your<br />
      <span style={{ fontStyle: 'italic', color: '#c9848a' }}>Genetic AI Assistant.</span>
    </h2>
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ fontSize: '16px', color: '#8a6a58', fontWeight: 300, lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 48px' }}
    >
      After decoding your variant, ask Locipher anything. What does this mean for my children? How serious is this really? Locipher answers in plain, jargon-free language
    </motion.p>
    
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{ background: '#ffffff', borderRadius: '20px', padding: '32px', border: '1px solid rgba(96,71,52,0.08)', boxShadow: '0 4px 40px rgba(96,71,52,0.06)', maxWidth: '560px', margin: '0 auto', textAlign: 'left' }}
    >
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4 }}
        style={{ fontSize: '14px', fontWeight: 600, color: '#604734', marginBottom: '16px' }}
      >
        Your Genetic AI Assistant
      </motion.div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ alignSelf: 'flex-start', background: '#ffffff', border: '1px solid rgba(96,71,52,0.08)', borderRadius: '16px', padding: '12px 16px', fontSize: '14px', color: '#604734', maxWidth: '100%' }}
        >
          Hi! I'm Locipher. Ask me anything about this genetic report.
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{ alignSelf: 'flex-end', background: '#604734', borderRadius: '16px', padding: '12px 16px', fontSize: '14px', color: '#fcf7d9', maxWidth: '100%' }}
        >
          Does this affect my children?
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.9 }}
          style={{ alignSelf: 'flex-start', background: '#ffffff', border: '1px solid rgba(96,71,52,0.08)', borderRadius: '16px', padding: '12px 16px', fontSize: '14px', color: '#604734', maxWidth: '100%' }}
        >
          BRCA1 mutations can be inherited. Each of your children has a 50% chance of carrying this variant. I'd recommend discussing genetic testing for your family with your doctor.
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1.1 }}
        style={{ display: 'flex', gap: '8px' }}
      >
        <div style={{ flex: 1, padding: '12px 16px', borderRadius: '100px', border: '1px solid rgba(96,71,52,0.15)', fontSize: '13px', color: '#b8a09a', background: '#fcf7d9' }}>
          Ask a follow-up question...
        </div>
        <div style={{ background: '#604734', color: '#fcf7d9', borderRadius: '100px', padding: '12px 20px', fontSize: '13px', fontWeight: 500 }}>
          Send
        </div>
      </motion.div>
    </motion.div>
  </motion.div>
</section>
 
      <motion.section
        className="who-section"
        id="who"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="who-inner">
          <div className="section-eyebrow" style={{ textAlign: "center" }}>Who It's For</div>
          <motion.h2
  className="section-title-dark"
  initial={{ opacity: 0, y: 25 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{
    duration: 0.6,
    delay: 0.15
  }} style={{ textAlign: "center" }}>
            Different people,<br />
            <span style={{ fontStyle: "italic", color: "#c9848a" }}>same need for clarity.</span>
          </motion.h2>
          <div className="who-grid">
            <div className="who-list">
              {whoData.map((w, i) => (
  <motion.button
    key={i}
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.5,
      delay: i * 0.15
    }}
    type="button"
  className={`who-item ${activeWho === i ? "active" : ""}`}
  onClick={() => setActiveWho(i)}
>
  <div className="who-item-title">{w.title}</div>
  <div className="who-item-sub">{w.sub}</div>
</motion.button>
              ))}
            </div>
            <motion.div
  key={activeWho}
  className="who-detail"
  initial={{ opacity: 0, x: 30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{
    duration: 0.4,
    ease: "easeOut"
  }}
>
              <div className="who-detail-title">{whoData[activeWho].title}</div>
              <div className="who-detail-quote">{whoData[activeWho].sub}</div>
              <p className="who-detail-text">{whoData[activeWho].detail}</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
 
      <motion.section
        className="cta-section"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="cta-title">
          Your genes deserve<br />
          <span style={{ fontStyle: "italic", color: "#f0c5d4" }}>a real explanation.</span>
        </h2>
        <p className="cta-sub">Free. No login. No medical degree required.</p>
        <div className="cta-buttons">
          <Link to="/app" className="btn-cream">
            <IconSearchSmall />
            Decode a Variant
          </Link>
        </div>
      </motion.section>
 
      <footer style={{ background: '#2a1f1a', padding: '20px 64px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 700, fontStyle: 'italic', color: '#fcf7d9' }}>locipher</span>
  <span style={{ color: 'rgba(252,247,217,0.2)' }}>·</span>
  <span style={{ fontSize: '12px', color: 'rgba(252,247,217,0.4)' }}>locipher.vercel.app · Built by Ojal Mishra · Powered by ClinVar + Groq AI · © 2026 · For educational purposes only.</span>
</footer>
    </>
  );
}