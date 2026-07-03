import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
 /* Nuclear option - removes ALL extra space */
html, body, #root, .app-container {
  margin: 0 !important;
  padding: 0 !important;
  min-height: 100vh !important;
  height: 100% !important;
  overflow-x: hidden !important;
}

body {
  background: #fcf7d9 !important;
}

.app-container {
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
}
  .app-nav {
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
  .nav-links { display: flex; align-items: center; gap: 40px; list-style: none; }
  .nav-links a { text-decoration: none; color: #8a6a58; font-size: 14px; font-weight: 400; }
  .nav-links a:hover { color: #604734; }
  .nav-back {
  background: transparent;
  color: #8a6a58;
  border: 1.5px solid rgba(96,71,52,0.2);
  padding: 8px 20px;
  border-radius: 100px;
  font-size: 13px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-decoration: none;
  transition: all 0.2s;
  }
  .nav-back:hover { color: #604734; border-color: #604734; }

  .app-hero {
    padding: 100px 64px 48px;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }
  .app-title {
    font-family: 'Playfair Display', serif;
    font-size: 42px; font-weight: 700; color: #604734;
    line-height: 1.15; margin-bottom: 20px;
  }
  .app-subtitle { font-size: 16px; color: #8a6a58; font-weight: 300; margin-bottom: 40px; }

  .example-label {
    text-align: center;
    font-size: 13px;
    color: #8c6d58;
    margin: 14px 0 10px;
    font-weight: 500;
}

  .search-box {
    display: flex; gap: 12px; max-width: 680px; margin: 0 auto;
    background: #ffffff; border: 1.5px solid rgba(96,71,52,0.15);
    border-radius: 100px; padding: 8px 8px 8px 24px;
    box-shadow: 0 4px 24px rgba(96,71,52,0.08);
    transition: border-color 0.2s;
  }
  .search-box:focus-within { border-color: #c9848a; }
  .search-input {
    flex: 1; border: none; outline: none; font-size: 15px;
    color: #604734; background: transparent; font-family: 'Inter', sans-serif;
  }
  .search-input::placeholder { color: #b8a09a; }
  .search-btn {
    background: #604734; color: #fcf7d9; border: none;
    padding: 12px 28px; border-radius: 100px; font-size: 14px;
    font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif;
    display: flex; align-items: center; gap: 8px; white-space: nowrap;
    transition: opacity 0.2s;
  }
  .search-btn:hover { opacity: 0.85; }
  .search-btn:disabled { opacity: 0.5; cursor: not-allowed; }

 

  .examples {
    display: flex; gap: 10px; justify-content: center;
    flex-wrap: wrap; margin-top: 16px;
  }
  .example-chip {
    background: rgba(240,197,212,0.3); border: 1px solid rgba(201,132,138,0.25);
    color: #c9848a; padding: 5px 14px; border-radius: 100px;
    font-size: 12px; cursor: pointer; transition: all 0.2s;
    font-family: 'Inter', sans-serif;
  }
  .example-chip:hover { background: rgba(240,197,212,0.5); }

  .results-container {
    max-width: 900px; margin: 0 auto; padding: 0 64px 80px;
  }

  .loading-card {
    background: #ffffff; border-radius: 20px; padding: 48px;
    text-align: center; border: 1px solid rgba(96,71,52,0.08);
    margin-top: 32px;
  }
  .loading-spinner {
    width: 40px; height: 40px; border: 2px solid rgba(201,132,138,0.2);
    border-top-color: #c9848a; border-radius: 50%;
    animation: spin 0.8s linear infinite; margin: 0 auto 16px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text { color: #8a6a58; font-size: 15px; font-weight: 300; }

  .result-card {
    background: #ffffff; border-radius: 20px;
    border: 1px solid rgba(96,71,52,0.08);
    box-shadow: 0 4px 40px rgba(96,71,52,0.06);
    margin-top: 32px; overflow: hidden;
  }

  .result-header {
    padding: 28px 36px; border-bottom: 1px solid rgba(96,71,52,0.08);
    display: flex; justify-content: space-between; align-items: center;
  }
  .result-variant { font-size: 13px; color: #8a6a58; margin-bottom: 4px; }
  .result-gene { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: #604734; }
  .result-badges { display: flex; gap: 8px; align-items: center; }
  .badge {
    padding: 5px 12px; border-radius: 100px; font-size: 11px;
    font-weight: 600; letter-spacing: 0.5px;
    display: flex; align-items: center; gap: 5px;
  }
  .badge-verified {
    background: rgba(240,197,212,0.3); border: 1px solid rgba(201,132,138,0.3);
    color: #c9848a;
  }
  .badge-high { background: rgba(220,80,80,0.1); border: 1px solid rgba(220,80,80,0.2); color: #c05050; }
  .badge-moderate { background: rgba(220,160,50,0.1); border: 1px solid rgba(220,160,50,0.2); color: #a07020; }
  .badge-low { background: rgba(80,160,80,0.1); border: 1px solid rgba(80,160,80,0.2); color: #407040; }
  .badge-unknown { background: rgba(96,71,52,0.08); border: 1px solid rgba(96,71,52,0.15); color: #8a6a58; }

  .gene-diagram-section {
    padding: 28px 36px; border-bottom: 1px solid rgba(96,71,52,0.08);
    background: rgba(252,247,217,0.3);
  }
  .diagram-title {
    font-size: 11px; font-weight: 600; letter-spacing: 1.5px;
    text-transform: uppercase; color: #8a6a58; margin-bottom: 20px;
  }
  .gene-diagram { position: relative; }
  .chromosome-label {
    font-size: 11px; color: #8a6a58; margin-bottom: 8px; font-weight: 500;
  }
  .gene-track {
    position: relative; height: 48px; margin-bottom: 8px;
  }
  .gene-backbone {
    position: absolute; top: 50%; left: 0; right: 0; height: 12px;
    background: linear-gradient(90deg, #f0c5d4, #f6d8d6, #f0c5d4);
    border-radius: 6px; transform: translateY(-50%);
    border: 1px solid rgba(201,132,138,0.3);
  }
  .gene-exon {
    position: absolute; top: 50%; height: 20px; background: #c9848a;
    border-radius: 3px; transform: translateY(-50%);
    opacity: 0.7;
  }
  .mutation-pin {
    position: absolute; top: 0; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center;
  }
  .pin-label {
    background: #604734; color: #fcf7d9; font-size: 10px; font-weight: 600;
    padding: 3px 8px; border-radius: 4px; white-space: nowrap; margin-bottom: 4px;
  }
  .pin-line { width: 2px; height: 20px; background: #604734; }
  .pin-dot { width: 8px; height: 8px; background: #604734; border-radius: 50%; margin-top: -2px; }
  .gene-regions {
    display: flex; justify-content: space-between;
    font-size: 10px; color: #b8a09a; margin-top: 4px;
  }
  .domain-legend {
    display: flex; gap: 16px; margin-top: 12px; flex-wrap: wrap;
  }
  .domain-item {
    display: flex; align-items: center; gap: 6px;
    font-size: 11px; color: #8a6a58;
  }
  .domain-dot {
    width: 10px; height: 10px; border-radius: 2px;
  }

  .result-sections { padding: 0 36px; }
  .result-section {
    padding: 24px 0;
    border-bottom: 1px solid rgba(96,71,52,0.06);
  }
  .result-section:last-child { border-bottom: none; }
  .section-header {
    display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
  }
  .section-icon { color: #c9848a; }
  .section-label {
    font-size: 11px; font-weight: 600; letter-spacing: 1.5px;
    text-transform: uppercase; color: #8a6a58;
  }
  .section-content {
    font-size: 15px; line-height: 1.8; color: #604734; font-weight: 300;
    white-space: pre-line;
  }
  .concern-row {
    display: flex; align-items: center; gap: 12px; margin-bottom: 12px;
  }
  .concern-bar {
    flex: 1; height: 6px; background: rgba(96,71,52,0.08); border-radius: 3px; overflow: hidden;
  }
  .concern-fill { height: 100%; border-radius: 3px; transition: width 0.5s ease; }
  .fill-high { background: linear-gradient(90deg, #f0c5d4, #c05050); width: 90%; }
  .fill-moderate { background: linear-gradient(90deg, #f0c5d4, #a07020); width: 60%; }
  .fill-low { background: linear-gradient(90deg, #f0c5d4, #407040); width: 25%; }
  .fill-unknown { background: linear-gradient(90deg, #f0c5d4, #8a6a58); width: 40%; }

  .questions-list { display: flex; flex-direction: column; gap: 10px; }
  .question-item {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 14px 16px; background: rgba(252,247,217,0.6);
    border-radius: 10px; border-left: 2px solid #f0c5d4;
  }
  .question-num {
    font-size: 11px; font-weight: 700; color: #c9848a;
    min-width: 20px; margin-top: 2px;
  }
  .question-text { font-size: 14px; color: #604734; line-height: 1.5; }

  .result-actions {
    padding: 24px 36px; border-top: 1px solid rgba(96,71,52,0.08);
    display: flex; gap: 12px; justify-content: flex-end;
    background: rgba(252,247,217,0.3);
  }
  .action-btn {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 20px; border-radius: 100px; font-size: 13px;
    font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif;
    transition: all 0.2s;
  }
  .action-btn-primary {
    background: #604734; color: #fcf7d9; border: none;
  }
  .action-btn-primary:hover { opacity: 0.85; }
  .action-btn-secondary {
    background: transparent; color: #604734;
    border: 1.5px solid rgba(96,71,52,0.2);
  }
  .action-btn-secondary:hover { border-color: #604734; }

  .error-card {
    background: rgba(220,80,80,0.05); border: 1px solid rgba(220,80,80,0.15);
    border-radius: 16px; padding: 32px; text-align: center; margin-top: 32px;
  }
  .error-icon { color: #c05050; margin-bottom: 12px; }
  .error-title { font-size: 16px; font-weight: 600; color: #604734; margin-bottom: 8px; }
  .error-text { font-size: 14px; color: #8a6a58; }

  .disclaimer {
    text-align: center; font-size: 12px; color: #b8a09a;
    padding: 0 64px 40px; max-width: 900px; margin: 0 auto;
    line-height: 1.6;
  }
  .chat-section {
  padding: 32px 36px;
  border-top: 1px solid rgba(96,71,52,0.08);
  background: rgba(252,247,217,0.25);
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.chat-title {
  font-size: 15px;
  font-weight: 600;
  color: #604734;
}

.chat-new-btn {
  background: transparent;
  border: 1.5px solid rgba(96,71,52,0.2);
  color: #8a6a58;
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 12px;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.2s;
}

.chat-new-btn:hover { border-color: #604734; color: #604734; }

.chat-box {
  max-height: 380px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 18px;
  padding-right: 4px;
}

.chat-box::-webkit-scrollbar { width: 4px; }
.chat-box::-webkit-scrollbar-track { background: transparent; }
.chat-box::-webkit-scrollbar-thumb { background: rgba(96,71,52,0.15); border-radius: 4px; }

.chat-message {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 16px;
  line-height: 1.6;
  font-size: 14px;
  animation: fadeInUp 0.3s ease;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.chat-user {
  align-self: flex-end;
  background: #604734;
  color: #fcf7d9;
  border-radius: 16px 16px 4px 16px;
}

.chat-ai {
  align-self: flex-start;
  background: white;
  border: 1px solid rgba(96,71,52,0.08);
  color: #604734;
  border-radius: 16px 16px 16px 4px;
  box-shadow: 0 2px 8px rgba(96,71,52,0.06);
}

.chat-ai-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  font-size: 11px;
  font-weight: 600;
  color: #c9848a;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.chat-copy-btn {
  margin-top: 10px;
  background: transparent;
  border: 1px solid rgba(96,71,52,0.15);
  color: #8a6a58;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 11px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.chat-copy-btn:hover { border-color: #604734; color: #604734; }

.chat-loading {
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: white;
  border: 1px solid rgba(96,71,52,0.08);
  border-radius: 16px 16px 16px 4px;
  font-size: 13px;
  color: #8a6a58;
}

.chat-dots {
  display: flex;
  gap: 4px;
}

.chat-dot {
  width: 6px;
  height: 6px;
  background: #c9848a;
  border-radius: 50%;
  animation: dotPulse 1.2s ease-in-out infinite;
}

.chat-dot:nth-child(2) { animation-delay: 0.2s; }
.chat-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes dotPulse {
  0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
  30% { opacity: 1; transform: scale(1); }
}

.chat-suggestions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.chat-suggestion-pill {
  background: rgba(240,197,212,0.3);
  border: 1px solid rgba(201,132,138,0.25);
  color: #c9848a;
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Inter', sans-serif;
}

.chat-suggestion-pill:hover { background: rgba(240,197,212,0.5); }

.chat-empty {
  text-align: center;
  padding: 24px;
  color: #8a6a58;
}

.chat-empty-title {
  font-size: 15px;
  font-weight: 600;
  color: #604734;
  margin-bottom: 8px;
}

.chat-empty-sub {
  font-size: 13px;
  color: #8a6a58;
  font-weight: 300;
  margin-bottom: 16px;
}

.chat-input-row {
  display: flex;
  gap: 10px;
  align-items: center;
  background: white;
  border: 1.5px solid rgba(96,71,52,0.15);
  border-radius: 100px;
  padding: 8px 8px 8px 20px;
  transition: border-color 0.2s;
}

.chat-input-row:focus-within { border-color: #c9848a; }

.chat-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #604734;
  background: transparent;
  font-family: 'Inter', sans-serif;
}

.chat-input::placeholder { color: #b8a09a; }

.chat-send {
  background: #604734;
  color: #fcf7d9;
  border: none;
  border-radius: 100px;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: opacity 0.2s;
  white-space: nowrap;
}

.chat-send:hover { opacity: 0.85; }
.chat-send:disabled { opacity: 0.5; cursor: not-allowed; }

@media (max-width: 768px) {
  .app-nav { padding: 0 16px; }
  .nav-links { display: flex; gap: 16px; }
  .nav-links li:first-child { display: none; }
  .app-hero { padding: 80px 20px 32px; }
  .app-title { font-size: 32px; }
  
  .search-box { padding: 6px 6px 6px 16px; }
.search-btn { padding: 8px 14px; font-size: 12px; }
  .results-container { padding: 0 16px 60px; }
  .result-header {
  flex-direction: column !important;
  align-items: flex-start !important;
  text-align: left !important;
  gap: 12px;
  padding: 20px;
}

.result-header > div:first-child {
  width: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  text-align: left !important;
}

.result-header .result-gene,
.result-header .result-variant {
  width: 100% !important;
  text-align: left !important;
  align-self: flex-start !important;
  margin-left: 0 !important;
}
  .footer{
padding:32px 22px;
flex-direction:column;
gap:16px;
text-align:center;
}

.result-badges {
  justify-content: flex-start !important;
}
  .result-badges { flex-wrap: wrap; justify-content: center; }
  .result-sections { padding: 0 20px; }
  .gene-diagram-section { padding: 20px; }
  .result-actions { flex-direction: column; padding: 20px; gap: 10px; }
  .action-btn { width: 100%; justify-content: center; }
  .chat-section { padding: 20px; }
  .disclaimer { padding: 0 20px 40px; }
}
`;

const IconSearch = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="4.5"/>
    <line x1="9.5" y1="9.5" x2="13" y2="13"/>
  </svg>
);

const IconBack = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 2 3 7 9 12"/>
  </svg>
);

const IconGene = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M3 2C3 2 6 4 6 7C6 10 3 12 3 12"/>
    <path d="M11 2C11 2 8 4 8 7C8 10 11 12 11 12"/>
    <line x1="3.5" y1="4.5" x2="10.5" y2="4.5"/>
    <line x1="3.5" y1="9.5" x2="10.5" y2="9.5"/>
    <line x1="3" y1="7" x2="11" y2="7"/>
  </svg>
);

const IconWarning = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 1L13 12H1L7 1Z"/>
    <line x1="7" y1="6" x2="7" y2="9"/>
    <circle cx="7" cy="11" r="0.5" fill="currentColor"/>
  </svg>
);

const IconHeart = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 12C7 12 1 8 1 4.5C1 2.5 2.5 1 4.5 1C5.5 1 6.5 1.5 7 2.5C7.5 1.5 8.5 1 9.5 1C11.5 1 13 2.5 13 4.5C13 8 7 12 7 12Z"/>
  </svg>
);

const IconQuestion = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7" cy="7" r="6"/>
    <path d="M5.5 5.5C5.5 4.5 6 4 7 4C8 4 8.5 4.5 8.5 5.5C8.5 6.5 7 7 7 8"/>
    <circle cx="7" cy="10" r="0.5" fill="currentColor"/>
  </svg>
);

const IconDownload = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 10V12H12V10"/>
    <line x1="7" y1="2" x2="7" y2="9"/>
    <polyline points="4 7 7 10 10 7"/>
  </svg>
);

const IconRefresh = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2V6H9"/>
    <path d="M1 12V8H5"/>
    <path d="M11.5 5C10.8 3.3 9.1 2 7 2C4.2 2 2 4.2 2 7"/>
    <path d="M2.5 9C3.2 10.7 4.9 12 7 12C9.8 12 12 9.8 12 7"/>
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

const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;
const exampleVariants = ["BRCA1 c.5266dupC", "TP53 R175H", "CFTR F508del", "APOE e4"];

// Define priority mapping once at the top level
const PRIORITY = {
  "pathogenic": 1,
  "likely pathogenic": 2,
  "risk factor": 3,
  "conflicting interpretations": 4,
  "uncertain significance": 5,
  "likely benign": 6,
  "benign": 7
};

// Helper function to normalize clinical significance strings
const normalizeClinSig = (sig = "") => {
  if (!sig || sig === "Unknown") return "Unknown";
  const s = sig.toLowerCase().replace(/[_/]/g, " ").trim();
  
  if (s.includes("pathogenic") && !s.includes("likely") && !s.includes("risk")) {
    return "Pathogenic";
  }
  if (s.includes("likely pathogenic")) {
    return "Likely pathogenic";
  }
  if (s.includes("benign") && !s.includes("likely")) {
    return "Benign";
  }
  if (s.includes("likely benign")) {
    return "Likely benign";
  }
  if (s.includes("uncertain") || s.includes("vus") || s.includes("unknown")) {
    return "Uncertain significance";
  }
  if (s.includes("conflict") || s.includes("discrepant")) {
    return "Conflicting interpretations";
  }
  if (s.includes("risk") || s.includes("predisposition") || s.includes("susceptibility")) {
    return "Risk factor";
  }
  if (s.includes("drug response")) return "Drug response";
  if (s.includes("protective")) return "Benign";
  if (s.includes("association")) return "Uncertain significance";
  
  if (s.length > 0 && s.length < 50) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  
  return "Unknown";
};

// Helper function to get priority key for sorting
const getPriorityKey = (sig = "") => {
  if (!sig) return "unknown";
  const s = sig.toLowerCase().replace(/[_/]/g, " ").trim();
  
  if (s.includes("pathogenic") && !s.includes("likely") && !s.includes("risk")) return "pathogenic";
  if (s.includes("likely pathogenic")) return "likely pathogenic";
  if (s.includes("risk") || s.includes("predisposition") || s.includes("susceptibility")) return "risk factor";
  if (s.includes("conflict") || s.includes("discrepant")) return "conflicting interpretations";
  if (s.includes("uncertain") || s.includes("vus")) return "uncertain significance";
  if (s.includes("likely benign")) return "likely benign";
  if (s.includes("benign") && !s.includes("likely")) return "benign";
  
  return "unknown";
};

// Fixed parseExplanation to work with ## headings
function parseExplanation(text) {
  const sections = { gene: "", mutation: "", concern: "", health: "", questions: [] };
  
  // Split by ## headings
  const parts = text.split('##').filter(Boolean);
  
  for (const part of parts) {
    const lines = part.trim().split('\n');
    const heading = lines[0].trim().toLowerCase();
    const content = lines.slice(1).join('\n').trim();
    
    if (heading.includes('what is this gene')) {
      sections.gene = content;
    } else if (heading.includes('what does this mutation mean')) {
      sections.mutation = content;
    } else if (heading.includes('how concerned should i be')) {
      sections.concern = content;
    } else if (heading.includes('what could this mean for my health')) {
      sections.health = content;
    } else if (heading.includes('questions to ask your doctor')) {
      const questions = content.split(/\d+\./).filter(q => q.trim().length > 0);
      sections.questions = questions.map(q => q.trim());
    }
  }
  
  // If parsing failed, try old format as fallback
  if (!sections.gene && !sections.mutation) {
    const lines = text.split('\n');
    let current = null;
    let buffer = [];

    const flush = () => {
      if (!current) return;
      const content = buffer.join(' ').trim();
      if (current === 'questions') {
        const qs = content.split(/\d+\.\s+/).filter(Boolean);
        sections.questions = qs.map(q => q.trim());
      } else {
        sections[current] = content;
      }
      buffer = [];
    };

    for (const line of lines) {
      const l = line.trim();
      if (!l) continue;
      if (l.includes('What is this gene')) { flush(); current = 'gene'; }
      else if (l.includes('What does this mutation')) { flush(); current = 'mutation'; }
      else if (l.includes('How concerned')) { flush(); current = 'concern'; }
      else if (l.includes('What could this mean')) { flush(); current = 'health'; }
      else if (l.includes('Questions to ask')) { flush(); current = 'questions'; }
      else if (current) buffer.push(l.replace(/^\*\*.*?\*\*/, '').trim());
    }
    flush();
  }
  
  return sections;
}

function getConcernLevel(text) {
  const t = text.toUpperCase();
  if (t.includes('HIGH')) return 'high';
  if (t.includes('MODERATE')) return 'moderate';
  if (t.includes('LOW')) return 'low';
  return 'unknown';
}

function GeneDiagram({ variantName, gene }) {
  const exons = [
    { left: '5%', width: '8%' }, { left: '15%', width: '12%' },
    { left: '30%', width: '10%' }, { left: '43%', width: '15%' },
    { left: '61%', width: '9%' }, { left: '73%', width: '11%' },
    { left: '87%', width: '8%' },
  ];
  const mutationPos = '43%';

  return (
    <div className="gene-diagram-section">
      <div className="diagram-title">Gene Map - Mutation Location</div>
      <div className="chromosome-label">{gene || 'Gene'} · Chromosome view</div>
      <div className="gene-diagram">
        <div className="gene-track">
          <div className="gene-backbone"/>
          {exons.map((e, i) => (
            <div key={i} className="gene-exon" style={{ left: e.left, width: e.width }}/>
          ))}
          <div className="mutation-pin" style={{ left: mutationPos }}>
            <div className="pin-label">▼ {variantName}</div>
            <div className="pin-line"/>
            <div className="pin-dot"/>
          </div>
        </div>
        <div className="gene-regions">
          <span>5' UTR</span>
          <span>Exon regions</span>
          <span>3' UTR</span>
        </div>
        <div className="domain-legend">
          <div className="domain-item">
            <div className="domain-dot" style={{ background: '#c9848a' }}/>
            <span>Exon (coding region)</span>
          </div>
          <div className="domain-item">
            <div className="domain-dot" style={{ background: '#f0c5d4' }}/>
            <span>Intron (non-coding)</span>
          </div>
          <div className="domain-item">
            <div className="domain-dot" style={{ background: '#604734' }}/>
            <span>Mutation site</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LocipherApp({ onBack, onAbout }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [rawData, setRawData] = useState(null);
  const [error, setError] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  // Fixed fetchVariant with proper priority usage
  const fetchVariant = async (variantName) => {
  try {
    const cleanVariant = variantName.trim();
    
    // Try multiple search strategies to find the BEST match
    let searchTerms = [];
    
    // Strategy 1: Direct search with gene and variant
    if (cleanVariant.includes(' ')) {
      const parts = cleanVariant.split(' ');
      const gene = parts[0];
      const variant = parts.slice(1).join(' ');
      searchTerms.push(`${gene}[gene] AND ${variant}[variant]`);
    }
    
    // Strategy 2: Search with NM_ format (most specific)
    if (cleanVariant.includes('c.')) {
      // Extract the gene and variant
      const parts = cleanVariant.split(' ');
      if (parts.length === 2) {
        const gene = parts[0];
        const variant = parts[1];
        // Try to find the NM_ number for common genes
        const NM_MAPPINGS = {
          'BRCA1': 'NM_007294.4',
          'BRCA2': 'NM_000059.4',
          'TP53': 'NM_000546.6',
          'CFTR': 'NM_000492.4',
          'APOE': 'NM_000041.4',
          'HBB': 'NM_000518.5',
          'MTHFR': 'NM_005957.5'
        };
        const nm = NM_MAPPINGS[gene];
        if (nm) {
          searchTerms.push(`${nm}(${gene}):${variant}`);
        }
      }
    }
    
    // Strategy 3: Just the variant name (fallback)
    searchTerms.push(cleanVariant);
    
    // Strategy 4: Search by gene only and filter results
    if (cleanVariant.includes(' ')) {
      const gene = cleanVariant.split(' ')[0];
      const variant = cleanVariant.split(' ').slice(1).join(' ');
      searchTerms.push(`${gene}[gene] AND ${variant}`);
    }
    
    let bestRecord = null;
    let bestRank = 999;
    let allRecords = [];
    
    // Try each search strategy
    for (const term of searchTerms) {
      
      const searchRes = await fetch(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=clinvar&term=${encodeURIComponent(term)}&retmax=30&retmode=json`
      );
      
      const searchData = await searchRes.json();
      const ids = searchData.esearchresult?.idlist || [];
      
      if (ids && ids.length > 0) {
        
        const summaryRes = await fetch(
          `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=clinvar&id=${ids.join(",")}&retmode=json`
        );
        
        const summary = await summaryRes.json();
        const records = ids
          .map((id) => summary.result?.[id] ? { id, ...summary.result[id] } : null)
          .filter(Boolean);
        
        allRecords = [...allRecords, ...records];
      }
    }
    
    // Remove duplicates by ID
    const uniqueRecords = [];
    const seenIds = new Set();
    for (const record of allRecords) {
      if (!seenIds.has(record.id)) {
        seenIds.add(record.id);
        uniqueRecords.push(record);
      }
    }
    
    
    if (uniqueRecords.length === 0) {
      return null;
    }
    
    // Filter to only records that actually belong to the requested gene.
    // NCBI's search can return loose matches from neighboring genes
    // (e.g. searching TP53 can also surface WRAP53 records), and without
    // this filter the "most severe first" sort below could pick a record
    // for the WRONG gene entirely.
    const requestedGene = cleanVariant.includes(' ') ? cleanVariant.split(' ')[0].toUpperCase() : null;
    const getRecordGene = (r) => (r.gene_sort || r.genes?.[0]?.symbol || r.genes?.[0]?.name || "").toUpperCase();
    
    let filteredRecords = uniqueRecords;
    if (requestedGene) {
      const geneMatches = uniqueRecords.filter((r) => getRecordGene(r) === requestedGene);
      if (geneMatches.length > 0) {
        filteredRecords = geneMatches;
      }
    }
    
    // Sort by clinical significance (most pathogenic first)
    filteredRecords.sort((a, b) => {
      const aSig = getPriorityKey(a.germline_classification?.description ||
                                a.clinical_impact_classification?.description ||
                                a.clinical_significance?.description || 
                                a.clinical_significance?.term || "");
      const bSig = getPriorityKey(b.germline_classification?.description ||
                                b.clinical_impact_classification?.description ||
                                b.clinical_significance?.description || 
                                b.clinical_significance?.term || "");
      
      const aRank = PRIORITY[aSig] ?? 999;
      const bRank = PRIORITY[bSig] ?? 999;
      
      return aRank - bRank;
    });
    
    // Take the best (most pathogenic) record
    const bestResult = filteredRecords[0];
    
    // Parse the record
    return parseClinVarRecord(bestResult);
    
  } catch (error) {
    console.error("Error fetching variant:", error);
    return null;
  }
};

// Helper function to parse a ClinVar record
function parseClinVarRecord(r) {
  // Parse clinical significance
  // NCBI's ClinVar esummary schema now nests this under germline_classification
  // (or clinical_impact_classification / oncogenicity_classification for somatic
  // variants) instead of the old top-level clinical_significance field.
  let rawSig = "Unknown";
  if (r.germline_classification?.description) {
    rawSig = r.germline_classification.description;
  } else if (r.clinical_impact_classification?.description) {
    rawSig = r.clinical_impact_classification.description;
  } else if (r.oncogenicity_classification?.description) {
    rawSig = r.oncogenicity_classification.description;
  } else if (r.clinical_significance) {
    if (typeof r.clinical_significance === 'string') {
      rawSig = r.clinical_significance;
    } else if (r.clinical_significance.description) {
      rawSig = r.clinical_significance.description;
    } else if (r.clinical_significance.term) {
      rawSig = r.clinical_significance.term;
    } else if (Array.isArray(r.clinical_significance)) {
      rawSig = r.clinical_significance[0]?.description || 
               r.clinical_significance[0]?.term || "Unknown";
    }
  }
  
  // Parse conditions - try multiple fields
  let conditions = [];
  
  // Try the new nested location first (NCBI moved trait_set under
  // germline_classification, same as description/review_status)
  const traitSources = [
    r.germline_classification?.trait_set,
    r.clinical_impact_classification?.trait_set,
    r.oncogenicity_classification?.trait_set,
    r.trait_set
  ];
  for (const ts of traitSources) {
    if (Array.isArray(ts) && ts.length > 0) {
      conditions = ts.map((t) => t.trait_name || t.name).filter(Boolean);
      if (conditions.length > 0) break;
    }
  }
  
  // Try conditions field
  if (conditions.length === 0 && r.conditions) {
    if (Array.isArray(r.conditions)) {
      conditions = r.conditions;
    } else if (typeof r.conditions === 'string') {
      conditions = [r.conditions];
    } else if (typeof r.conditions === 'object') {
      // Sometimes conditions is an object with name field
      if (r.conditions.name) {
        conditions = [r.conditions.name];
      } else if (r.conditions.trait_name) {
        conditions = [r.conditions.trait_name];
      }
    }
  }
  
  // Try disease_names
  if (conditions.length === 0 && r.disease_names) {
    conditions = Array.isArray(r.disease_names) ? r.disease_names : [r.disease_names];
  }
  
  // Try trait (single)
  if (conditions.length === 0 && r.trait) {
    conditions = [r.trait];
  }
  
  // Get gene name - try multiple fields
  let geneName = "Unknown";
  if (r.gene_sort) {
    geneName = r.gene_sort;
  } else if (r.gene) {
    if (typeof r.gene === 'string') {
      geneName = r.gene;
    } else if (r.gene.name) {
      geneName = r.gene.name;
    } else if (r.gene.symbol) {
      geneName = r.gene.symbol;
    }
  } else if (r.genes && Array.isArray(r.genes) && r.genes.length > 0) {
    geneName = r.genes[0]?.symbol || r.genes[0]?.name || "Unknown";
  }
  
  // Get review status
  let reviewStatus = "Unknown";
  if (r.germline_classification?.review_status) {
    reviewStatus = r.germline_classification.review_status;
  } else if (r.clinical_impact_classification?.review_status) {
    reviewStatus = r.clinical_impact_classification.review_status;
  } else if (r.clinical_significance) {
    if (typeof r.clinical_significance === 'object') {
      reviewStatus = r.clinical_significance.review_status || 
                    r.clinical_significance.reviewStatus || 
                    "Unknown";
    }
  }
  
  // Get last evaluated
  let lastEvaluated = "Unknown";
  if (r.germline_classification?.last_evaluated) {
    lastEvaluated = r.germline_classification.last_evaluated;
  } else if (r.clinical_impact_classification?.last_evaluated) {
    lastEvaluated = r.clinical_impact_classification.last_evaluated;
  } else if (r.clinical_significance) {
    if (typeof r.clinical_significance === 'object') {
      lastEvaluated = r.clinical_significance.last_evaluated || 
                     r.clinical_significance.lastEvaluated || 
                     r.clinical_significance.date || 
                     "Unknown";
    }
  } else if (r.last_evaluated) {
    lastEvaluated = r.last_evaluated;
  }
  
  return {
    gene: geneName,
    clinical_significance: normalizeClinSig(rawSig),
    review_status: reviewStatus,
    conditions: conditions,
    last_evaluated: lastEvaluated,
    accession: r.accession || r.id || "Unknown"
  };
}
  
  const callGroq = async (variantData, variantName) => {
    const prompt = `You are an expert genetic counselor explaining a patient's genetic test result.

The patient has no biology background and is understandably anxious. Your job is to explain the result clearly, honestly, and compassionately using ONLY the information provided below. Never invent medical facts.

Clinical Data:
- Variant: ${variantName}
- Gene affected: ${variantData.gene}
- Clinical significance: ${variantData.clinical_significance}
- Review status: ${variantData.review_status}
- Last evaluated: ${variantData.last_evaluated}

${variantData.conditions.length > 0 ? 
  `- Associated conditions: ${variantData.conditions.join(', ')}` : 
  `- Associated conditions: None listed in ClinVar database`}

Write your response using these EXACT headings.

## What is this gene?
Explain what this gene normally does in the body in 2-3 simple sentences.
Use an everyday analogy.

## What does this mutation mean?
Explain what this specific variant means in simple language.
Avoid medical jargon.

## How concerned should I be?

Determine the concern level ONLY from the ClinVar clinical significance.

Rules:
- Pathogenic → HIGH concern
- Likely pathogenic → HIGH concern  
- Pathogenic (low penetrance) → MODERATE concern
- Risk allele → MODERATE concern
- Benign → LOW concern
- Likely benign → LOW concern
- Uncertain significance (VUS) → UNCERTAIN
- Conflicting interpretations → UNCERTAIN

CRITICAL RULES:
- If clinical significance is "Uncertain significance", the concern level MUST be UNCERTAIN
- If clinical significance is "Unknown", the concern level MUST be UNCERTAIN
- NEVER call an Uncertain variant "LOW concern"
- NEVER invent diseases that are not listed
- NEVER exaggerate risk
- NEVER reassure falsely

Format exactly like this:

Concern Level : HIGH / MODERATE / LOW / UNCERTAIN

Explanation :
(one patient-friendly sentence based on the clinical significance)

## What could this mean for my health?

${variantData.conditions.length > 0 ? 
  `Based on the associated conditions (${variantData.conditions.join(', ')}), give 2-3 practical health implications.` : 
  `Since no specific conditions are listed in ClinVar, explain that this variant's health implications are not yet well-established. Mention that this could mean:
  1. This variant is rare and hasn't been studied enough
  2. It may have mild or no health effects
  3. More research is needed to understand its significance
Also suggest that the patient discuss with their doctor what monitoring might be appropriate.`}

## Questions to ask your doctor

Provide exactly four practical questions.

1.
2.
3.
4.

Write naturally, warmly, and clearly. Use simple language. Avoid fear-inducing language.`;

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1024,
        temperature: 0.5,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error?.message || "Groq API failed");
    }

    return data.choices[0].message.content;
  };

  const askFollowUp = async () => {
    if (!chatInput.trim() || !result) return;

    const question = chatInput;

    setChatMessages(prev => [
      ...prev,
      { role: "user", content: question }
    ]);

    setChatInput("");
    setChatLoading(true);

    try {
      const messages = [
        {
          role: "system",
          content: `You are Locipher, a friendly AI genetics education assistant.

The following report has already been generated for the patient.

${result.raw}

Only answer follow-up questions about this report.

Keep answers easy to understand.

Never diagnose diseases.
Never recommend treatments.
Never invent information.
If appropriate, remind the user to discuss important concerns with their doctor.`
        },
        ...chatMessages,
        {
          role: "user",
          content: question
        }
      ];

      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages,
            temperature: 0.4,
            max_tokens: 600
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "Groq failed");
      }

      setChatMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: data.choices[0].message.content
        }
      ]);

    } catch (err) {
      setChatMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't answer that right now. Please try again."
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleDecode = async (variantName) => {
    const v = variantName || query;
    if (!v.trim()) return;
    if (v.length < 4) { setError('Please enter a valid genetic variant.'); return; }

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const variantData = await fetchVariant(v);
      if (!variantData) { 
        setError('Variant not found in ClinVar. Please check the format and try again.'); 
        setLoading(false); 
        return; 
      }
      setRawData(variantData);
      const explanation = await callGroq(variantData, v);
      const parsed = parseExplanation(explanation);
      const concern = getConcernLevel(parsed.concern + ' ' + variantData.clinical_significance);
      setResult({ parsed, concern, variantName: v, gene: variantData.gene, raw: explanation });
    } catch (e) {
      console.error(e);
      setError(e.message || 'Something went wrong.');
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if (!result) return;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html><head><title>Locipher Report - ${result.variantName}</title>
      <style>
        body { font-family: Georgia, serif; max-width: 700px; margin: 40px auto; color: #333; line-height: 1.8; }
        h1 { color: #604734; font-size: 24px; margin-bottom: 4px; }
        h2 { color: #604734; font-size: 16px; margin-top: 28px; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 6px; }
        p { margin-bottom: 12px; }
        .meta { color: #888; font-size: 13px; margin-bottom: 32px; }
        .disclaimer { margin-top: 40px; padding: 16px; background: #f9f9f9; font-size: 12px; color: #888; border-radius: 8px; }
      </style></head>
      <body>
        <h1>locipher - Genetic Variant Report</h1>
        <div class="meta">Variant: ${result.variantName} · Gene: ${result.gene} · Generated: ${new Date().toLocaleDateString()}</div>
        <h2>What is this gene?</h2><p>${result.parsed.gene}</p>
        <h2>What does this mutation mean?</h2><p>${result.parsed.mutation}</p>
        <h2>How concerned should I be?</h2><p>${result.parsed.concern}</p>
        <h2>What could this mean for my health?</h2><p>${result.parsed.health}</p>
        <h2>Questions to ask your doctor</h2>
        ${result.parsed.questions.map((q, i) => `<p>${i + 1}. ${q}</p>`).join('')}
        <div class="disclaimer">Locipher is for educational purposes only. Always consult a qualified doctor or genetic counselor.</div>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
  const handleShare = async () => {
  if (!result) return;

  const report = `🧬 Locipher - Genetic Variant Report

Variant: ${result.variantName}
Gene: ${result.gene}
Generated: ${new Date().toLocaleDateString()}

What is this gene?
${result.parsed.gene}

What does this mutation mean?
${result.parsed.mutation}

How concerned should I be?
${result.parsed.concern}

What could this mean for my health?
${result.parsed.health}

Questions to ask your doctor:
${result.parsed.questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}

Generated by Locipher
https://locipher.vercel.app`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Locipher Genetic Report",
        text: report,
      });
    } catch (err) {
      // User cancelled
    }
  } else {
    navigator.clipboard.writeText(report);
    alert("Sharing isn't supported on this browser. The report has been copied to your clipboard instead.");
  }
};

  const concernLabels = { high: 'HIGH CONCERN', moderate: 'MODERATE CONCERN', low: 'LOW CONCERN', unknown: 'UNCERTAIN' };
  const concernClasses = { high: 'badge-high', moderate: 'badge-moderate', low: 'badge-low', unknown: 'badge-unknown' };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} style={{ paddingBottom: 0, marginBottom: 0 }}>
      <style>{styles}</style>

      <nav className="app-nav">
        <Link className="nav-logo" to="/">
          <Logo />
          <span className="logo-wordmark">locipher</span>
        </Link>
        <ul className="nav-links">
          <li><a href="/#how" onClick={(e) => { e.preventDefault(); onBack(); setTimeout(() => { document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' }); }, 500); }}>How It Works</a></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <Link className="nav-back" to="/">
          <IconBack />
          Back to Home
        </Link>
      </nav>

      <div className="app-hero">
        <h1 className="app-title">
          Decode your <span style={{ fontStyle: 'italic', color: '#c9848a' }}>variant.</span>
        </h1>
        <p className="app-subtitle">Paste any genetic variant from your report and get a clear, human explanation.</p>

        <div className="search-box">
          <input
            className="search-input"
            placeholder="e.g. BRCA1 c.5266dupC, TP53 R175H, CFTR F508del"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleDecode()}
          />
          <button
            className="search-btn"
            onClick={() => handleDecode()}
            disabled={loading}
          >
            <IconSearch />
            {loading ? 'Decoding...' : 'Decode'}
          </button>
        </div>

        <p className="example-label">
          Click an example variant to get started
        </p>
        <div className="examples">
          {exampleVariants.map(v => (
            <button key={v} className="example-chip" onClick={() => { setQuery(v); handleDecode(v); }}>
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="results-container">
        {loading && (
          <div className="loading-card">
            <div className="loading-spinner"/>
            <p className="loading-text">Searching ClinVar database and generating your explanation...</p>
          </div>
        )}

        {error && (
          <div className="error-card">
            <div className="error-icon"><IconWarning /></div>
            <div className="error-title">Variant not found</div>
            <p className="error-text">{error}</p>
          </div>
        )}

        {result && (
          <div className="result-card">
            <div className="result-header">
              <div>
                <div className="result-variant">{result.variantName}</div>
                <div className="result-gene">{result.gene}</div>
              </div>
              <div className="result-badges">
                <div className="badge badge-verified">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1.5 5 4 7.5 8.5 2.5"/></svg>
                  ClinVar verified
                </div>
                <div className={`badge ${concernClasses[result.concern]}`}>
                  <IconWarning />
                  {concernLabels[result.concern]}
                </div>
              </div>
            </div>

            <GeneDiagram variantName={result.variantName} gene={result.gene} />

            <div className="result-sections">
              <div className="result-section">
                <div className="section-header">
                  <span className="section-icon"><IconGene /></span>
                  <span className="section-label">What is this gene?</span>
                </div>
                <p className="section-content">{result.parsed.gene}</p>
              </div>

              <div className="result-section">
                <div className="section-header">
                  <span className="section-icon"><IconWarning /></span>
                  <span className="section-label">What does this mutation mean?</span>
                </div>
                <p className="section-content">{result.parsed.mutation}</p>
              </div>

              <div className="result-section">
                <div className="section-header">
                  <span className="section-icon"><IconWarning /></span>
                  <span className="section-label">How concerned should I be?</span>
                </div>
                <div className="concern-row">
                  <div className={`badge ${concernClasses[result.concern]}`}>
                    {concernLabels[result.concern]}
                  </div>
                  <div className="concern-bar">
                    <div className={`concern-fill fill-${result.concern}`}/>
                  </div>
                </div>
                <p className="section-content">{result.parsed.concern}</p>
              </div>

              <div className="result-section">
                <div className="section-header">
                  <span className="section-icon"><IconHeart /></span>
                  <span className="section-label">What could this mean for my health?</span>
                </div>
                <p className="section-content">{result.parsed.health}</p>
              </div>

              {result.parsed.questions.length > 0 && (
                <div className="result-section">
                  <div className="section-header">
                    <span className="section-icon"><IconQuestion /></span>
                    <span className="section-label">Questions to ask your doctor</span>
                  </div>
                  <div className="questions-list">
                    {result.parsed.questions.map((q, i) => (
                      <div key={i} className="question-item">
                        <span className="question-num">{i + 1}</span>
                        <span className="question-text">{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="chat-section">
  <div className="chat-header">
    <div className="chat-title">Your Genetic AI Assistant</div>
    <button className="chat-new-btn" onClick={() => { setChatMessages([]); setChatInput(''); }}>
      New Chat
    </button>
  </div>

  <div className="chat-box">
    {chatMessages.length === 0 && (
      <div className="chat-empty">
        <div className="chat-empty-title"> ꩜ Ask Locipher anything</div>
        <div className="chat-empty-sub">Questions about this report, your genes, or what to expect next.</div>
        <div className="chat-suggestions">
          {["Does this affect my children?", "How serious is this really?", "What should I do next?", "Can this be treated?"].map(s => (
            <button key={s} className="chat-suggestion-pill" onClick={() => { setChatInput(s); }}>
              {s}
            </button>
          ))}
        </div>
      </div>
    )}

    {chatMessages.map((msg, index) => (
      <div key={index} className={msg.role === "user" ? "chat-message chat-user" : "chat-message chat-ai"}>
        {msg.role === "assistant" && (
          <div className="chat-ai-header">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="5" r="4"/><path d="M3.5 5.5C3.5 4.5 4 4 5 4C6 4 6.5 4.5 6.5 5.5C6.5 6.5 5 7 5 8"/><circle cx="5" cy="9" r="0.5" fill="currentColor"/></svg>
            Locipher
          </div>
        )}
        {msg.content}
        {msg.role === "assistant" && (
          <div>
            <button className="chat-copy-btn" onClick={() => navigator.clipboard.writeText(msg.content)}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="6" height="6" rx="1"/><path d="M7 3V2C7 1.4 6.6 1 6 1H2C1.4 1 1 1.4 1 2V6C1 6.6 1.4 7 2 7H3"/></svg>
              Copy
            </button>
          </div>
        )}
      </div>
    ))}

    {chatLoading && (
      <div className="chat-loading">
        <span>Locipher is thinking</span>
        <div className="chat-dots">
          <div className="chat-dot"/>
          <div className="chat-dot"/>
          <div className="chat-dot"/>
        </div>
      </div>
    )}
  </div>

  <div className="chat-input-row">
    <input
      className="chat-input"
      placeholder="Ask a follow-up question..."
      value={chatInput}
      onChange={(e) => setChatInput(e.target.value)}
      onKeyDown={(e) => { if (e.key === "Enter") askFollowUp(); }}
    />
    <button className="chat-send" onClick={askFollowUp} disabled={chatLoading}>
      Send
    </button>
  </div>
</div>

            <div className="result-actions">
              <button className="action-btn action-btn-secondary" onClick={() => { 
                setResult(null);
                setQuery('');
                setChatMessages([]);
                setChatInput('');
              }}>
                <IconRefresh />
                Search another variant
              </button>
              <button className="action-btn action-btn-primary" onClick={handleDownload}>
                <IconDownload />
                Download report
              </button>
              <button className="action-btn action-btn-secondary" onClick={handleShare}>
  ➤ Share
</button>
            </div>
          </div>
        )}
      </div>

      <p className="disclaimer" style={{ marginBottom: '0', paddingBottom: '24px' }}>
  Locipher is for educational purposes only and does not constitute medical advice.
  Always consult a qualified genetic counselor or physician regarding your results.
</p>
 <footer style={{ background: '#2a1f1a', padding: '60.2px 64px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 700, fontStyle: 'italic', color: '#fcf7d9' }}>locipher</span>
  <span style={{ color: 'rgba(252,247,217,0.2)' }}>·</span>
  <span style={{ fontSize: '12px', color: 'rgba(252,247,217,0.4)' }}>locipher.vercel.app · Built by Ojal Mishra · Powered by ClinVar + Groq AI · © 2026 · For educational purposes only.</span>
</footer>
    </motion.div>
    
  );
}