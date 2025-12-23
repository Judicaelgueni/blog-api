import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../api/api";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/articles/${id}`)
      .then(res => res.json())
      .then(data => setArticle(data))
      .catch(err => console.error("Erreur fetch article:", err));
  }, [id]);

  if (!article) return <p>Chargement...</p>;

  return (
    <div style={{ padding:"30px", maxWidth:"800px", margin:"0 auto" }}>
      <h1>{article.titre || article.title}</h1>

      {article.image && (
        <img src={article.image} alt={article.titre || article.title}
          style={{ width:"100%", maxHeight:"400px", objectFit:"cover", margin:"20px 0" }} />
      )}

      <p>{article.contenu || article.content}</p>
      <small>✍ {article.auteur || article.author}</small>
    </div>
  );
}

