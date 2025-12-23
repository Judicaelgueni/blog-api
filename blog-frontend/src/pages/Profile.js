import { useAuth } from "../context/AuthContext";
import { API_URL } from "../api/api";
import { useEffect, useState } from "react";

export default function Profile() {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({ titre:"", contenu:"", image:null });
  const [editingId, setEditingId] = useState(null);

  // Charger les articles de l'utilisateur
  const fetchMyArticles = () => {
    fetch(`${API_URL}/articles/`)
      .then(res => res.json())
      .then(data =>
        setArticles(data.filter(a => a.auteur === user.username))
      );
  };

  useEffect(() => {
    fetchMyArticles();
  }, []);

  // CREATE / UPDATE
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("titre", form.titre);
    formData.append("contenu", form.contenu);
    if (form.image) formData.append("image", form.image);

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${API_URL}/articles/${editingId}/`
      : `${API_URL}/articles/`;

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Token ${user.token}`
      },
      body: formData
    });

    if (res.ok) {
      setForm({ titre:"", contenu:"", image:null });
      setEditingId(null);
      fetchMyArticles();
    }
  };

  // DELETE
  const deleteArticle = async (id) => {
    if (!window.confirm("Supprimer cet article ?")) return;

    await fetch(`${API_URL}/articles/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${user.token}`
      }
    });

    fetchMyArticles();
  };

  // EDIT
  const editArticle = (a) => {
    setForm({ titre:a.titre, contenu:a.contenu, image:null });
    setEditingId(a.id);
  };

  return (
    <div style={{ padding:"30px" }}>
      <h2>Profil – {user.username}</h2>

      {/* FORMULAIRE */}
      <div style={{ background:"#fff", padding:"20px", marginBottom:"30px", borderRadius:"8px" }}>
        <h3>{editingId ? "Modifier l'article" : "Créer un article"}</h3>

        <input
          placeholder="Titre"
          value={form.titre}
          onChange={e => setForm({...form, titre:e.target.value})}
          style={{ width:"100%", marginBottom:"10px", padding:"8px" }}
        />

        <textarea
          placeholder="Contenu"
          value={form.contenu}
          onChange={e => setForm({...form, contenu:e.target.value})}
          style={{ width:"100%", marginBottom:"10px", padding:"8px" }}
        />

        <input
          type="file"
          onChange={e => setForm({...form, image:e.target.files[0]})}
        />

        <br /><br />

        <button onClick={handleSubmit}
          style={{ background:"#1e90ff", color:"#fff", padding:"10px", border:"none" }}>
          {editingId ? "Mettre à jour" : "Publier"}
        </button>

        {editingId && (
          <button onClick={() => {
            setEditingId(null);
            setForm({ titre:"", contenu:"", image:null });
          }}
          style={{ marginLeft:"10px" }}>
            Annuler
          </button>
        )}
      </div>

      {/* LISTE DES ARTICLES */}
      <h3>Mes articles</h3>

      {articles.map(a => (
        <div key={a.id} style={{
          background:"#fff",
          padding:"15px",
          marginBottom:"15px",
          borderRadius:"6px"
        }}>
          {a.image && (
            <img src={a.image}
              style={{ width:"200px", height:"120px", objectFit:"cover" }} />
          )}

          <h4>{a.titre}</h4>
          <p>{a.contenu.slice(0,100)}...</p>

          <button onClick={() => editArticle(a)}>✏ Modifier</button>
          <button onClick={() => deleteArticle(a.id)} style={{ marginLeft:"10px" }}>
            🗑 Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}
