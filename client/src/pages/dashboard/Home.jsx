import PropTypes from "prop-types"
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
function Home({handleLogout}) {
  const[posts, setPosts] = useState([])
  const[error, setError] = useState(null)

  //Cargar los posts al montar el coponente 
  const loadPosts = async () => {
    try {
          const response = await axios.get('http://localhost:8000/post/');
          console.log('Datos de posts:', response.data); // Verifica la estructura de los datos
          setPosts(response.data);
      } catch (error) {
          setError('Error al cargar los posts: ' + error.message);
          console.error('Error al cargar los posts:', error);
      }
  };
  useEffect(() => {
    loadPosts();
}, []);

 // Manejar errores de carga
 if (error) {
  return <div>{error}</div>;
}

  return (
    <div>
    <p>Hola BIENVENIDO</p>
    <button onClick={handleLogout}>Cerrar Sesión</button>
    <Link to="/profile">Ir a Perfil</Link>
    <h1>Blog Posts</h1>
    <div className="posts-list">
        {posts.map((post, index) => (
            <div key={index} className="post">
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <p><strong>Categoría:</strong> {post.category.name}</p>
                <p><strong>Tags:</strong> {post.tags}</p>
                {post.image && <img src={post.image} alt={post.title} />}
                
            </div>
        ))}
    </div>
</div>
  )
}

export default Home

Home.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};
