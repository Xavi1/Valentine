import { useState } from "react";
import { motion } from "framer-motion";
import React from "react";

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    minWidth: "100vw",
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #ffccd5, #ffe5ec)",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    overflow: "hidden",
    padding: "20px",
    boxSizing: "border-box",
  },
  floatingHeart: {
    position: "absolute",
    fontSize: "clamp(20px, 4vw, 32px)",
    opacity: 0.6,
    pointerEvents: "none",
    userSelect: "none",
    zIndex: 1,
  },
  card: {
    backgroundColor: "white",
    padding: "clamp(30px, 8vw, 50px)",
    borderRadius: "24px",
    textAlign: "center",
    boxShadow: "0 20px 60px rgba(255, 77, 109, 0.15)",
    width: "100%",
    maxWidth: "460px",
    position: "relative",
    boxSizing: "border-box",
    zIndex: 10,
  },
  title: {
    fontSize: "clamp(24px, 6vw, 32px)",
    marginBottom: "clamp(10px, 3vw, 15px)",
    color: "#333",
    fontWeight: "700",
    lineHeight: "1.3",
  },
  heart: {
    fontSize: "clamp(56px, 12vw, 72px)",
    marginBottom: "clamp(20px, 5vw, 30px)",
    filter: "drop-shadow(0 4px 8px rgba(255, 77, 109, 0.2))",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    position: "relative",
    minHeight: "80px",
    marginTop: "20px",
  },
  button: {
    padding: "16px 48px",
    borderRadius: "16px",
    border: "none",
    color: "white",
    fontSize: "clamp(16px, 4vw, 20px)",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    minWidth: "160px",
    touchAction: "manipulation",
    WebkitTapHighlightColor: "transparent",
    userSelect: "none",
  },
  noWrapper: {
    display: "inline-block",
    touchAction: "none",
  },
  success: {
    fontSize: "clamp(24px, 6vw, 36px)",
    fontWeight: "800",
    color: "#ff4d6d",
    padding: "20px",
    lineHeight: "1.4",
  },
};

const FloatingHearts: React.FC = () => {
  const hearts = ["❤️", "💕", "💖", "💗", "💓", "💝","🐵", "🍌","🐒"];
  const floatingHearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    emoji: hearts[Math.floor(Math.random() * hearts.length)],
    leftPosition: Math.random() * 100,
    animationDelay: Math.random() * 10,
    duration: 15 + Math.random() * 10,
    size: 0.6 + Math.random() * 0.8,
  }));

  return (
    <>
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          style={{
            ...styles.floatingHeart,
            left: `${heart.leftPosition}%`,
            fontSize: `calc(${heart.size}em * 1.5)`,
          }}
          initial={{ 
            y: window.innerHeight + 50, 
            opacity: 0,
            rotate: 0,
            x: 0,
          }}
          animate={{
            y: -100,
            opacity: [0, 0.7, 0.7, 0],
            rotate: [0, 10, -10, 5, -5, 0],
            x: [0, 30, -30, 20, -20, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.animationDelay,
            ease: "linear",
            opacity: {
              duration: heart.duration,
              times: [0, 0.1, 0.9, 1],
            },
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
            x: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </>
  );
};

const App: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);

  const moveButton = () => {
    setNoAttempts(prev => prev + 1);
    const maxMove = Math.min(150, window.innerWidth * 0.15);
    const randomX = Math.floor(Math.random() * maxMove * 2 - maxMove);
    const randomY = Math.floor(Math.random() * maxMove * 1.5 - maxMove * 0.75);
    setPosition({ x: randomX, y: randomY });
  };

  const handleYesClick = () => {
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
    setAccepted(true);
  };

  return (
    <div style={styles.page}>
      <FloatingHearts />
      <motion.div 
        style={styles.card}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1]
        }}
      >
        {!accepted ? (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              style={styles.title}
            >
              Will you be my Valentine?
            </motion.h1>
            
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 0.4,
                ease: [0.34, 1.56, 0.64, 1],
                type: "spring",
                stiffness: 200
              }}
              style={styles.heart}
            >
              ❤️
            </motion.div>

            <div style={styles.buttonContainer}>
              <motion.button
                style={{ 
                  ...styles.button, 
                  backgroundColor: "#ff4d6d",
                  position: "relative",
                  zIndex: 2,
                }}
                onClick={handleYesClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1 + (noAttempts * 0.08)
                }}
                transition={{ 
                  duration: 0.6,
                  delay: 0.6,
                  scale: { type: "spring", stiffness: 300, damping: 15 }
                }}
              >
                Yes 💖
              </motion.button>

              <motion.div
                animate={{ 
                  x: position.x, 
                  y: position.y,
                  opacity: noAttempts > 4 ? 0 : 1,
                  scale: 1 - (noAttempts * 0.05),
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400,
                  damping: 25,
                  mass: 0.8
                }}
                onMouseEnter={moveButton}
                onTouchStart={(e) => {
                  e.preventDefault();
                  moveButton();
                }}
                style={{
                  ...styles.noWrapper,
                  pointerEvents: noAttempts > 4 ? "none" : "auto",
                }}
                initial={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
              >
                <button
                  style={{ 
                    ...styles.button, 
                    backgroundColor: "#6c757d",
                  }}
                >
                  No 😢
                </button>
              </motion.div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.34, 1.56, 0.64, 1],
              type: "spring",
              stiffness: 200
            }}
            style={styles.success}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              YAY!!! 🎉💘
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ fontSize: "clamp(18px, 4vw, 24px)", marginTop: "10px" }}
            >
              You just made my day!
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default App;