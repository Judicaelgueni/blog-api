import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    setError("");
    setSuccess("");

    if (form.password !== form.password2) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors de l'inscription");
        return;
      }

      setSuccess("Compte créé avec succès 🎉");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setError("Erreur réseau");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h2>Inscription</h2>

        <input
          placeholder="Nom d'utilisateur"
          style={styles.input}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Mot de passe"
          style={styles.input}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          style={styles.input}
          onChange={(e) =>
            setForm({ ...form, password2: e.target.value })
          }
        />

        <button onClick={submit} style={styles.btn}>
          S'inscrire
        </button>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
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
    width: 380,
    padding: 30,
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  btn: {
    width: "100%",
    padding: 12,
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  error: {
    marginTop: 15,
    color: "red",
  },
  success: {
    marginTop: 15,
    color: "green",
  },
};
