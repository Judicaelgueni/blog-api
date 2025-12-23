import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const res = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError("Identifiants incorrects");
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({ username: form.username, token: data.token })
      );

      navigate("/");
      window.location.reload();
    } catch {
      setError("Erreur réseau");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h2>Connexion</h2>

        <input
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={styles.input}
        />

        <button onClick={submit} style={styles.btn}>Se connecter</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
  },
  box: {
    width: 350,
    padding: 30,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
  },
  btn: {
    width: "100%",
    padding: 10,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
  },
};
