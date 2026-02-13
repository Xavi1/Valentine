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
    position: "relative",
  },
  title: {
    fontSize: "28px",
    marginBottom: "30px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    position: "relative",
    height: "100px",
  },
  button: {
    padding: "12px 24px",
    borderRadius: "12px",
    border: "none",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
  noWrapper: {
    position: "absolute",
  },
  success: {
    fontSize: "24px",
    fontWeight: "bold",
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
              Will you be my Valentine? ❤️
            </motion.h1>

            <div style={styles.buttonContainer}>
              <button
                style={{ ...styles.button, backgroundColor: "#ff4d6d" }}
                onClick={() => setAccepted(true)}
              >
                Yes 💖
              </button>

              <motion.div
                animate={{ x: position.x, y: position.y }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={moveButton}
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
