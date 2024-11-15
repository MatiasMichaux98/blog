import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import "../../styles/Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  //Cargar los posts al montar el coponente
  const loadPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/post/");
      console.log("Datos de posts:", response.data); // Verifica la estructura de los datos
      setPosts(response.data);
    } catch (error) {
      setError("Error al cargar los posts: " + error.message);
      console.error("Error al cargar los posts:", error);
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
    <div className="home-menu">
      <div className="home-sidebar">
        <Sidebar />
      </div>
      <div className="Homebody">
         <div className="topbar">
            <nav className="push-right">
              <ul>
                <li>
                  <a href="/home">Ver todos los post</a>
                </li>
                <li>
                  <a href="/create-post">Crear nuevo Post</a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="content">
              {posts.map((post, index) => (
                <li key={index} className="list-name">
                  <div className="contenedor">
                    <div className="post-content">
                      <h3 className="post-title">{post.title}</h3>
                      <p className="post-description">{post.description}</p>
                      <p className="btn-left fa fa-comment"></p>
                      <p className="btn-right fa fa-heart"></p>
                    </div>
                  </div>
                </li>
              ))}
          </div>
      </div>
    </div>
  );
}

export default Home;

Home.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};
