import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; background: #fcf7d9; color: #604734; }

  .about-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(252, 247, 217, 0.92); backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(96, 71, 52, 0.08);
    padding: 0 64px; height: 64px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; cursor: pointer; }
  .logo-wordmark {
    font-family: 'Playfair Display', serif; font-size: 20px;
    font-weight: 700; font-style: italic; color: #604734;
  }
  .nav-back {
    background: transparent; color: #8a6a58; border: 1.5px solid rgba(96,71,52,0.2);
    padding: 8px 20px; border-radius: 100px; font-size: 13px; cursor: pointer;
    font-family: 'Inter', sans-serif; display: flex; align-items: center; gap: 6px;
    transition: all 0.2s;
     text-decoration: none;
  }
  .nav-back:hover { color: #604734; border-color: #604734; }

  .about-hero {
    padding: 120px 64px 80px;
    max-width: 800px; margin: 0 auto; text-align: center;
  }
  .about-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; color: #c9848a; margin-bottom: 20px;
  }
  .about-title {
    font-family: 'Playfair Display', serif; font-size: 48px;
    font-weight: 700; color: #604734; line-height: 1.15;
    letter-spacing: -0.5px; margin-bottom: 24px;
  }
  .about-title-italic { font-style: italic; color: #c9848a; }
  .about-lead {
    font-size: 18px; line-height: 1.8; color: #8a6a58;
    font-weight: 300; max-width: 600px; margin: 0 auto;
  }

  .about-section {
    max-width: 800px; margin: 0 auto; padding: 0 64px 80px;
  }

  .about-block {
    padding: 48px 0; border-bottom: 1px solid rgba(96,71,52,0.08);
  }
  .about-block:last-child { border-bottom: none; }
  .block-label {
    font-size: 11px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; color: #c9848a; margin-bottom: 16px;
  }
  .block-title {
    font-family: 'Playfair Display', serif; font-size: 28px;
    font-weight: 700; color: #604734; margin-bottom: 16px; line-height: 1.2;
  }
  .block-text {
    font-size: 16px; line-height: 1.8; color: #8a6a58; font-weight: 300;
  }
  .block-text + .block-text { margin-top: 16px; }

  .who-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 20px; margin-top: 32px;
  }
  .who-card {
    background: #ffffff; border-radius: 16px; padding: 24px;
    border: 1px solid rgba(96,71,52,0.08);
  }
  .who-card-icon { color: #c9848a; margin-bottom: 12px; }
  .who-card-title { font-size: 15px; font-weight: 600; color: #604734; margin-bottom: 8px; }
  .who-card-text { font-size: 13px; color: #8a6a58; line-height: 1.6; font-weight: 300; }

  .tech-grid {
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 16px; margin-top: 32px;
  }
  .tech-item {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 20px; background: #ffffff; border-radius: 12px;
    border: 1px solid rgba(96,71,52,0.08);
  }
  .tech-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #c9848a; margin-top: 5px; flex-shrink: 0;
  }
  .tech-name { font-size: 14px; font-weight: 600; color: #604734; margin-bottom: 4px; }
  .tech-desc { font-size: 13px; color: #8a6a58; font-weight: 300; }

  .builder-card {
    background: #ffffff; border-radius: 20px; padding: 36px;
    border: 1px solid rgba(96,71,52,0.08); margin-top: 32px;
    display: flex; gap: 32px; align-items: flex-start;
  }
  .builder-avatar {
    width: 60px; height: 60px; border-radius: 50%;
    background: linear-gradient(135deg, #f0c5d4, #c9848a);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif; font-size: 24px;
    font-weight: 700; color: #ffffff; flex-shrink: 0;
  }
  .builder-name { font-size: 18px; font-weight: 600; color: #604734; margin-bottom: 4px; }
  .builder-role { font-size: 13px; color: #c9848a; margin-bottom: 12px; }
  .builder-bio { font-size: 14px; color: #8a6a58; line-height: 1.7; font-weight: 300; }

  .cta-block {
    background: #604734; border-radius: 20px; padding: 48px;
    text-align: center; margin-top: 0;
  }
  .cta-title {
    font-family: 'Playfair Display', serif; font-size: 32px;
    font-weight: 700; color: #fcf7d9; margin-bottom: 12px; line-height: 1.2;
  }
  .cta-sub { font-size: 15px; color: rgba(252,247,217,0.6); margin-bottom: 28px; font-weight: 300; }
  .cta-btn {
    background: #fcf7d9; color: #604734; padding: 13px 32px;
    border-radius: 100px; font-size: 14px; font-weight: 600;
    border: none; cursor: pointer; font-family: 'Inter', sans-serif;
    display: inline-flex; align-items: center; gap: 8px;
    transition: opacity 0.2s;
    text-decoration: none;
  }
  .cta-btn:hover { opacity: 0.9; }

  .footer {
    background: #2a1f1a; padding: 32px 64px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .footer-logo {
    font-family: 'Playfair Display', serif; font-size: 18px;
    font-weight: 700; font-style: italic; color: #fcf7d9;
  }
  .footer-text { font-size: 13px; color: rgba(252,247,217,0.4); }
  @media (max-width: 768px) {
  .about-nav { padding: 0 16px; }
  .about-hero { padding: 80px 20px 40px; }
  .about-title { font-size: 36px; }
  .about-section { padding: 0 20px 60px; }
  .who-grid { grid-template-columns: 1fr; }
  .tech-grid { grid-template-columns: 1fr; }
  .footer { flex-direction: column; gap: 12px; text-align: center; padding: 32px 20px; }
}
`;

const IconBack = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 2 3 7 9 12"/>
  </svg>
);

const IconSearch = () => (
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

export default function LocipherAbout({ onBack, onTry }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <style>{styles}</style>

      <nav className="about-nav">
<div className="nav-logo" onClick={onBack} style={{cursor:'pointer'}}>          <Logo />
          <span className="logo-wordmark">locipher</span>
        </div>
         <Link
          className="nav-back"
        to="/">
          <IconBack />
          Back to Home
        </Link>
      </nav>

      <div className="about-hero">
        <div className="about-eyebrow">About Locipher</div>
        <h1 className="about-title">
          Science should speak<br />
          <span className="about-title-italic">human.</span>
        </h1>
        <p className="about-lead">
          Locipher was built on a simple belief - that patients who receive genetic test results deserve to understand them without needing a medical degree.
        </p>
      </div>

      <div className="about-section">
        <div className="about-block">
          <div className="block-label">The Problem</div>
          <h2 className="block-title">Genetic testing has outpaced genetic understanding.</h2>
          <p className="block-text">
            Over the last decade, genetic testing has become dramatically more accessible. Millions of people now receive reports detailing variants in their BRCA1, TP53, CFTR, and hundreds of other genes. But the reports themselves haven't changed - they're still written for clinicians, filled with ACMG classifications and HGVS notation that means nothing to the patient holding them.
          </p>
          <p className="block-text">
            Genetic counselors are the bridge - but there aren't enough of them, they're expensive, and in countries like India, the field is still developing. Patients are left searching Google, finding research papers, and walking away more confused and more anxious than before.
          </p>
        </div>

        <div className="about-block">
          <div className="block-label">What Locipher Is</div>
          <h2 className="block-title">A translator between your genes and your life.</h2>
          <p className="block-text">
            Locipher takes any genetic variant - paste it in, exactly as it appears on your report - and generates a clear, human explanation. What the gene normally does. What went wrong. How concerned you should be. What it means for your daily life. And exactly what to ask your doctor.
          </p>
          <p className="block-text">
            It pulls real clinical data from ClinVar, the NIH's database of over 1 million genetic variants, and uses AI to translate that data into language anyone can understand. Not a summary for a physician. An explanation for you.
            </p>
            <p className="block-text">
              Once your report is generated, you can continue the conversation with Locipher AI. Ask follow up questions, clarify unfamiliar terms, or explore what a section of your report means in more detail. Instead of searching through medical websites, you get answers tailored to your report, explained in plain English while staying grounded in the underlying clinical evidence.
          </p>
        </div>

        <div className="about-block">
          <div className="block-label">Who It's For</div>
          <h2 className="block-title">Anyone who deserves to understand their own biology.</h2>
          <div className="who-grid">
            <div className="who-card">
              <div className="who-card-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#c9848a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="10" cy="7" r="4"/>
                  <path d="M2 18C2 14.7 5.6 12 10 12C14.4 12 18 14.7 18 18"/>
                </svg>
              </div>
              <div className="who-card-title">Patients</div>
              <p className="who-card-text">You received a report. You deserve to understand it before your next appointment.</p>
            </div>
            <div className="who-card">
              <div className="who-card-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#c9848a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 2H4C3 2 2 3 2 4V16C2 17 3 18 4 18H16C17 18 18 17 18 16V11"/>
                  <polyline points="14 2 18 2 18 6"/>
                  <line x1="18" y1="2" x2="9" y2="11"/>
                </svg>
              </div>
              <div className="who-card-title">Genetic Counselors</div>
              <p className="who-card-text">Save time generating patient-ready explanations for the variants you discuss.</p>
            </div>
            <div className="who-card">
              <div className="who-card-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#c9848a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 17C10 17 3 12 3 7C3 4.8 4.8 3 7 3C8.2 3 9.3 3.6 10 4.5C10.7 3.6 11.8 3 13 3C15.2 3 17 4.8 17 7C17 12 10 17 10 17Z"/>
                </svg>
              </div>
              <div className="who-card-title">Family Members</div>
              <p className="who-card-text">Supporting someone with a genetic diagnosis starts with understanding what they're facing.</p>
            </div>
          </div>
        </div>

        <div className="about-block">
          <div className="block-label">How It's Built</div>
          <h2 className="block-title">Real data. Real AI. Real clarity.</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <div className="tech-dot"/>
              <div>
                <div className="tech-name">ClinVar API</div>
                <div className="tech-desc">NIH's database of over 1 million genetic variants. Real, peer-reviewed clinical data - not scraped content.</div>
              </div>
            </div>
            <div className="tech-item">
              <div className="tech-dot"/>
              <div>
                <div className="tech-name">Groq LLaMA 3.3 70B</div>
                <div className="tech-desc">A large language model prompted to explain clinical genomics in patient-friendly language.</div>
              </div>
            </div>
            <div className="tech-item">
              <div className="tech-dot"/>
              <div>
                <div className="tech-name">Python + Streamlit</div>
                <div className="tech-desc">The backend that connects everything - variant search, data extraction, and AI generation.</div>
              </div>
            </div>
            <div className="tech-item">
              <div className="tech-dot"/>
              <div>
                <div className="tech-name">React</div>
                <div className="tech-desc">The frontend you're looking at right now - built for clarity and ease of use.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-block">
          <div className="cta-block">
            <h2 className="cta-title">
              Ready to understand<br />your results?
            </h2>
            <p className="cta-sub">Free. No login. No medical degree required.</p>
            <Link className="cta-btn" to="/app">
              <IconSearch />
              Decode a Variant
            </Link>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-logo">locipher</div>
        <div className="footer-text">locipher.vercel.app · Built by Ojal Mishra · Powered by ClinVar + Groq AI · © 2026</div>
        <div className="footer-text">For educational purposes only. Always consult a qualified doctor or genetic counselor.</div>
      </footer>
      </motion.div>
  );
}
