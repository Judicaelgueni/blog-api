import { Link } from "react-router-dom";

export default function ArticleCard({ art }) {
  return (
    <div style={{
      background:"#fff",
      padding:"15px",
      borderRadius:"8px",
      boxShadow:"0 3px 6px rgba(0,0,0,.1)"
    }}>
      {art.image && (
        <div style={{ height:"180px", overflow:"hidden", borderRadius:"5px" }}>
          <img src={art.image} alt=""
            style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        </div>
      )}

      <h3>{art.titre}</h3>
      <p>{art.contenu.slice(0,100)}...</p>

      <small>✍ {art.auteur} | 🕒 {new Date(art.created_at).toLocaleDateString()}</small>

      <br />
      <Link to={`/article/${art.id}`}>Lire la suite</Link>
    </div>
  );
}
