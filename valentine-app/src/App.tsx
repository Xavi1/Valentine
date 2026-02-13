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
    fontFamily: "Arial, sans-serif",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    overflow: "hidden",
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    width: "90%",
    maxWidth: "500px",
    position: "relative",
  },
  title: {
    fontSize: "28px",
    marginBottom: "10px",
    color: "#333",
  },
  heart: {
    fontSize: "48px",
    marginBottom: "30px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    position: "relative",
    minHeight: "60px",
    marginTop: "20px",
  },
  button: {
    padding: "15px 40px",
    borderRadius: "12px",
    border: "none",
    color: "white",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "transform 0.2s",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  noWrapper: {
    display: "inline-block",
  },
  success: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#ff4d6d",
    padding: "20px",
  },
};

const App: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const moveButton = () => {
    const randomX = Math.floor(Math.random() * 300 - 150);
    const randomY = Math.floor(Math.random() * 200 - 100);
    setPosition({ x: randomX, y: randomY });
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {!accepted ? (
          <>
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={styles.title}
            >
              Will you be my Valentine?
            </motion.h1>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={styles.heart}
            >
              ❤️
            </motion.div>

            <div style={styles.buttonContainer}>
              <button
                style={{ 
                  ...styles.button, 
                  backgroundColor: "#ff4d6d",
                }}
                onClick={() => setAccepted(true)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Yes 💖
              </button>

              <motion.div
                animate={{ x: position.x, y: position.y }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={moveButton}
                onMouseLeave={() => setPosition({ x: 0, y: 0 })}
                style={styles.noWrapper}
              >
                <button
                  style={{ ...styles.button, backgroundColor: "#6c757d" }}
                >
                  No 😢
                </button>
              </motion.div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={styles.success}
          >
            YAY!!! 🎉💘 You just made my day!
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default App;