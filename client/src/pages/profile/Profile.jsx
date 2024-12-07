import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import React from "react";
import "../../App.css";
import Sidebar from "../../components/Sidebar";
import { getColorClass } from "../../utils/getColorClass";
import EditProfileModal from "./EditProfile";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [postsError, setPostsError] = useState("");
  
  // Obtención del token id del usuario
  const token = localStorage.getItem("accessToken");
  const userId = token ? jwtDecode(token).user_id : null; // Usa jwtDecode para extraer el id del usuario del token JWT
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToid, setPostToid] = useState(null);
  const [isModalOpens, setIsModalOpens] = useState(false);

  const openModal = () => setIsModalOpens(true);
  const closeModal = () => setIsModalOpens(false);

// Función para actualizar el perfil desde el modal
    const updateProfile = (updatedProfile) => {
      setProfile(updatedProfile); // Actualiza el perfil con los nuevos datos
    };


  // Eliminar publicación
  const eliminarPublicacion = async () => {
    const Confirmado = window.confirm("¿Está seguro de eliminar?");
    if (!Confirmado) {
      return; // No se hace nada si el usuario cancela
    }

    try {
      const response = await axios.delete(
        `http://localhost:8000/post/${postToid}/`
      );
      if (response.status === 204) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== postToid)
        );
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error al eliminar publicación:", error);
    }
  };

  // Función para cargar los posts del usuario
  const fetchUserPosts = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/user/${userId}/posts/`
      );
      setPosts(response.data);
    } catch (error) {
      setPostsError("Error al cargar los posts del usuario");
      console.error("Error al cargar los posts:", error);
    }
  }, [userId]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setError("Usuario no autenticado");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8000/profile/${userId}/`
        );
        setProfile(response.data);
        await fetchUserPosts();
      } catch (error) {
        setError("Error al cargar el perfil");
        console.error("Error al cargar el perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId, fetchUserPosts]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      className="grid grid-cols-1 grid-rows-[auto,1fr] bg-cover bg-center bg-no-repeat "
      style={{
        backgroundImage:
          "url('https://w.wallhaven.cc/full/rr/wallhaven-rr9qzw.png')",
      }}
    >
      <div className="">
        <Sidebar />
      </div>
      <div className="mx-auto w-full max-w-5xl p-4 sm:p-6 md:p-8 min-h-screen mt-6 sm:mt-8 rounded-lg bg-[#EBEBEB] ">
        <div className="container-profile">
          <div className="grid grid-cols-2 grid-rows-1 gap-0 p-8">
            <div className="flex justify-center ">
              <img
                className="rounded-full w-20 h-20 md:w-32 md:h-32 lg:w-48 lg:h-48 border-2 border-[#000000]"
                src={profile?.image || "ruta/a/imagen/default.jpg"}
                alt="Perfil"
              />
            </div>

            <div className="col-span-1">
              <div className="profile-user-settings">
                <h1 className="profile-user-name text-lg text-[#000000]">
                  {profile?.full_name || "Usuario desconocido"}
                </h1>

                <a
                  href="#_"
                  className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
                >
                  <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                  <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                  <button onClick={openModal}
                  className="text-white"
                  >Editar Perfil</button>
                        <EditProfileModal
                            isOpen={isModalOpens}
                            onClose={closeModal}
                            currentProfile={profile}
                            updateProfile={updateProfile}
                        />
                  </span>
                </a>
              </div>
              <div className="profile-bio">
                <span className="profile-real-name text-[#000000] text-base">
                  {(profile?.bio || "").split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </span>
              </div>
              <div className="profile-stats">
                <ul>
                  <li className="text-[#000000] text-lg">
                    <span className="profile-stat-count">{posts.length}</span>{" "}
                    posts
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="border-neutral-700 p-4" />

          <div className="flex justify-center ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 cursor-pointer">
              {postsError ? (
                <div className="col-span-full text-center text-red-500 font-semibold text-lg">
                  {postsError}
                </div>
              ) : posts.length > 0 ? (
                posts
                  .slice()
                  .reverse()
                  .map((post, index) => (
                    <div key={index} className="">
                      <div className="sm:max-w-64 lg:max-w-80 mx-auto rounded-lg border-2 border-[#B366FF]">
                        <div className="grid grid-cols-1 gap-1 bg-[#ECE9E6] bg-custom-gradient">
                          <div className="relative bg-auto bg-center w-full h-[150px] md:h-[200px] lg:h-[250px] overflow-hidden">
                            <img
                              src={post.image}
                              alt=""
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>

                          <div className="p-6 space-y-1">
                            <div className="flex justify-between">
                              <p
                                className={`hidden medium:block rounded-lg px-3 text-white text-sm ${getColorClass(
                                  post.category?.name || "Sin categoría"
                                )}`}
                              >
                                {post.category?.name || "Sin categoría"}
                              </p>
                              <div className="  flex justify-start items-center gap-1 button-wrapper">
                                <button
                                  onClick={() => {
                                    
                                    setIsModalOpen(true);
                                    setPostToid(post.id);
                                  }}
                                >
                                  <i className="fas fa-ellipsis-v text-lg inline-block px-4"></i>
                                </button>
                              </div>
                            </div>
                            <h3 className="text-[24px] font-playfair-display line-clamp-1">
                              {post.title}
                            </h3>
                            <hr className="border-4 w-[15%] border-[#B366FF]" />
                            <p className="post-description-two text-sm text-[#212121] leading-relaxed line-clamp-3 font-quicksand text-lg">
                              {post.description}
                            </p>
                          </div>
                          <div className="flex justify-between items-center p-[0px_20px_10px_20px]">
                            <Link
                              className="text-sm hover:text-[#B366FF]"
                              to={`/post/${post.id}`}
                            >
                              Read More
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div>No hay posts disponibles</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    onClick={() => setIsModalOpen(false)} 
  >
    <div
      className="bg-[#262626] p-6 rounded-lg shadow-lg max-w-sm w-full"
      onClick={(e) => e.stopPropagation()} 
    >
      <div className="flex flex-col gap-4 divide-y divide-slate-700 items-center">
        <button
          onClick={() => {
            eliminarPublicacion();
            setIsModalOpen(false); 
          }}
          className="px-4 py-2 bg-[#262626] text-rose-600 rounded"
        >
          Eliminar
        </button>

        {postToid && (
          <div>
            <button className="px-4 py-2 bg-[#262626] text-white rounded">
                <Link to={`/editpost/${postToid}`} className="text-white">
                  
                    editar
                </Link>
            </button>

          </div>
        )}

        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 bg-[#262626] text-white rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Profile;
