import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function PostDetail() {
  const { id } = useParams(); // params para obtner el id de la url 
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/post/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error al cargar el post:", error);
      }
    };
    loadPost()
  }, [id]);

  return (
    <div>
      {post ? (
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <p><strong>Categoría:</strong> {post.category.name}</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default PostDetail;
