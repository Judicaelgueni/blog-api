import { useEffect, useState } from "react";
import { API_URL } from "../api/api";
import ArticleCard from "../components/ArticleCard";

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/articles/`)
      .then(res => res.json())
      .then(data => setArticles(data));
  }, []);

  return (
    <div style={{ padding:"30px" }}>
      <h2>Articles récents</h2>

      <div style={{ display:"grid", gap:"20px" }}>
        {articles.map(a => <ArticleCard key={a.id} art={a} />)}
      </div>
    </div>
  );
}
