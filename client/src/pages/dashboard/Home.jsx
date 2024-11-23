import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { getColorClass } from "../../utils/getColorClass";

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [postsError] = useState("");

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
    <div className="grid grid-rows-1 sm:grid-cols-[0.3fr_3fr] md:grid-cols-[0.3fr_3fr] laptop-md:grid-cols-[0.9fr_3fr] lg:grid-cols-[0.3fr_3fr]  bg-[#202020]">
      {/* Sidebar */}
      <div className="1">
        <Sidebar />
      </div>
  
      {/* Main content */}
      <div className="p-8 h-full min-h-screen ">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-2 cursor-pointer">
            {postsError ? (
              <div className="col-span-full text-center text-red-500 font-semibold text-lg">
                {postsError}
              </div>
            ) : posts.length > 0 ? (
              posts.map((post, index) => (
                <div key={index} className="mb-4">
                  <div className="border-2 border-[#B366FF] rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-4 bg-[#ECE9E6] bg-custom-gradient">
                      <div className="p-6 space-y-3">
                        <div className="categoria w-[90px]">
                          <p
                            className={`rounded-lg flex justify-center text-white text-sm ${getColorClass(
                              post.category?.name || "Sin categoría"
                            )}`}
                          >
                            {post.category?.name || "Sin categoría"}
                          </p>
                        </div>
                        {/* Title */}
                        <h3 className="text-[24px] font-playfair-display line-clamp-1">
                          {post.title}
                        </h3>
                        <hr className="border-4 w-[15%] border-[#B366FF]" />
                        {/* Description */}
                        <p className="post-description-two text-sm text-[#212121] leading-relaxed line-clamp-3 font-quicksand text-lg">
                          {post.description}
                        </p>
                        <div className="flex justify-between items-center p-[0px_20px_10px_20px]">
                        <div className="flex justify-start items-center	gap-1 button-wrapper">
                        <img
                            className="rounded-full w-10 h-10 border-[#9147FF]"
                            src={post.profile?.image}  // Asegúrate de usar `post.profile` y no `post.Profile`
                            alt="Perfil"
                          />
                          <span className="text-xs">{post.full_name}</span>
                        </div>
                        <Link
                          className="text-sm hover:text-[#B366FF]"
                          to={`/post/${post.id}`}
                        >
                          Read More
                        </Link>
                      </div>
                      </div>
                      {/* Image */}
                      <div className="flex justify-center items-center">
                      <div className=" p-8 w-60 h-60 overflow-hidden rounded-lg shadow-md">
                        <img
                          src={post.image}
                          alt=""
                          className= " w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-white">
                No hay posts disponibles
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}  

export default Home;

Home.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};
