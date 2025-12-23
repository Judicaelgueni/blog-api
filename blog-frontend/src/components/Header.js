import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    setOpen(false);
  };

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>📝 Blog</Link>

      {/* bouton hamburger (mobile) */}
      <button
        onClick={() => setOpen(!open)}
        style={styles.burger}
      >
        ☰
      </button>

      {/* navigation */}
      <nav style={{
        ...styles.nav,
        ...(open ? styles.navOpen : {})
      }}>
        {!user ? (
          <>
            <Link onClick={() => setOpen(false)} to="/login" style={styles.link}>
              Connexion
            </Link>
            <Link onClick={() => setOpen(false)} to="/register" style={styles.btn}>
              Inscription
            </Link>
          </>
        ) : (
          <>
            <Link onClick={() => setOpen(false)} to="/profile" style={styles.link}>
              Mon profil
            </Link>
            <button onClick={logout} style={styles.logout}>
              Déconnexion
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "60px",
    background: "#0f172a",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    zIndex: 1000,
  },

  logo: {
    color: "#fff",
    textDecoration: "none",
    fontSize: 20,
    fontWeight: "bold",
  },

  burger: {
    display: "none",
    fontSize: 26,
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },

  nav: {
    display: "flex",
    gap: 15,
    alignItems: "center",
  },

  navOpen: {
    position: "absolute",
    top: "60px",
    left: 0,
    right: 0,
    background: "#0f172a",
    flexDirection: "column",
    padding: "20px",
    gap: 15,
  },

  link: {
    color: "#e5e7eb",
    textDecoration: "none",
  },

  btn: {
    background: "#2563eb",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: 6,
    textDecoration: "none",
  },

  logout: {
    background: "#ef4444",
    border: "none",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: 6,
    cursor: "pointer",
  },
};

/* Responsive (JS pur, sans CSS externe) */
const mediaQuery = window.matchMedia("(max-width: 768px)");
if (mediaQuery.matches) {
  styles.burger.display = "block";
  styles.nav.display = "none";
  styles.navOpen.display = "flex";
}

