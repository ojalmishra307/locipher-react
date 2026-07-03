import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Logo = ({ isMobile }) => (
  <svg
    width={isMobile ? "42" : "48"}
    height={isMobile ? "42" : "48"}
    viewBox="0 0 34 34"
    fill="none"
  >
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

export default function LoadingScreen({ onComplete }) {
  const [show, setShow] = useState(true);

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 600);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#fcf7d9",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: isMobile ? "12px" : "11px",
            transform: isMobile ? "translateY(-5px)" : "none",
            zIndex: 99999,
            overflow: "hidden"
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Logo isMobile={isMobile} />
          </motion.div>

        
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: isMobile ? "24px" : "28px",
        fontWeight: 700,
        fontStyle: "italic",
        color: "#604734",
      }}
    >
      locipher
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      style={{
        fontSize: isMobile ? "16px" : "15px",
        color: "#c9848a",
        letterSpacing: "2px",
        textTransform: "uppercase",
      }}
    >
      Decipher your genes
    </motion.div>


  <motion.div
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1.8, delay: 0.3 }}
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "2px",
      background: "linear-gradient(90deg,#f0c5d4,#c9848a,#604734)",
      transformOrigin: "left",
    }}
  />
</motion.div>
      )}
    </AnimatePresence>
  );
}