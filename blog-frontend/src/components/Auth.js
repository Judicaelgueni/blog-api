import { useState } from "react";

const API_URL = "http://127.0.0.1:8000/api";

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const endpoint = isLogin ? "login" : "register";

    try {
      const res = await fetch(`${API_URL}/${endpoint}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur");
        return;
      }

      if (isLogin) {
        const user = {
          username: form.username,
          token: data.token,
        };

        localStorage.setItem("user", JSON.stringify(user));
        onLogin(user);
      } else {
        alert("Compte créé. Connecte-toi.");
        setIsLogin(true);
      }

      setForm({ username: "", password: "" });
      setError("");
    } catch {
      setError("Erreur réseau");
    }
  };

  return (
    <div style={styles.box}>
      <h3>{isLogin ? "Connexion" : "Inscription"}</h3>

      <input
        placeholder="Nom d'utilisateur"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Mot de passe"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        style={styles.input}
      />

      <button onClick={handleSubmit} style={styles.btn}>
        {isLogin ? "Se connecter" : "S'inscrire"}
      </button>

      <p style={styles.switch} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Créer un compte" : "J'ai déjà un compte"}
      </p>

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  box: {
    background: "#fff",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    border: "1px solid #ccc",
  },
  btn: {
    width: "100%",
    padding: 10,
    background: "#1e90ff",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  switch: {
    marginTop: 10,
    textAlign: "center",
    cursor: "pointer",
    color: "#1e90ff",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
};
