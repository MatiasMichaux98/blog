import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import React from "react";
import "../../App.css";
import Sidebar from "../../components/Sidebar";
import { getColorClass } from "../../utils/getColorClass";

function Profile() {
  const [profile, setProfile] = useState(null); // para los datos del perfil
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]); // Estado para almacenar los posts del usuario
  const [postsError, setPostsError] = useState("");
  // obtención del token id del usuario
  const token = localStorage.getItem("accessToken");
  const userId = token ? jwtDecode(token).user_id : null; // usa jwtDecode para extraer el id del usuario del token JWT

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
        setProfile(response.data || {}); // Asegúrate de que profile tenga un valor aunque esté vacío
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
    <div className="grid grid-cols-1 grid-rows-[auto,1fr] bg-cover bg-center bg-no-repeat " style={{ backgroundImage: "url('https://w.wallhaven.cc/full/rr/wallhaven-rr9qzw.png')" }}>
      <div className="">
        <Sidebar />
      </div>
      <div className="mx-auto w-full max-w-5xl p-4 sm:p-6 md:p-8 min-h-screen  mt-6 sm:mt-8 rounded-lg bg-[#EBEBEB] ">
        <div className="container-profile">
          <div className="grid grid-cols-2 grid-rows-1 gap-0 p-8">
            <div className="flex justify-center ">
              <img
                className="  rounded-full w-20 h-20 md:w-32 md:h-32 lg:w-48 lg:h-48 border-2 border-[#000000]"
                src={profile?.image || "ruta/a/imagen/default.jpg"}
                alt="Perfil"
              />
            </div>

            <div className="col-span-1">
              <div className="profile-user-settings  ">
                <h1 className="profile-user-name text-lg text-[#000000]">
                  {profile?.full_name || "Usuario desconocido"}
                </h1>
                <div className="btn-settings flex flex-row gap-[0px]">
                  <Link className="btn-profile-edit bg-gradient-to-r from-[#6C6C6C] to-[#B3B3B3] 	" to="/editProfile">
                    <button className=" flex items-center p-1 pr-3 text-white text-sm md:text-base  hover:bg-gradient-to-r from-[#6E6E6E] to-[#2A2A2A] " >
                    <span id="collapse-icon" className="fa fa-gear fa-fw mr-3  "></span>
                      Editar Perfil
                    </button>
                  </Link>
                </div>
              </div>
              <div className="profile-bio ">
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
                    <span className="profile-stat-count ">{posts.length}</span>{" "}
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
                posts.map((post, index) => (
                  <div key={index} className="">
                    <div className="  sm:max-w-64 lg:max-w-80 mx-auto  rounded-lg border-2 border-[#B366FF]">
                      <div className="grid grid-cols-1 gap-1 bg-[#ECE9E6] bg-custom-gradient">
                        <div className="relative bg-auto bg-center w-full h-[150px] md:h-[200px] lg:h-[250px] overflow-hidden">
                          <img
                            src={post.image}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>

                        <div className="p-6 space-y-1">
                          <div className="flex justify-center categoria w-[90px] ">
                            <p
                              className={`hidden medium:block rounded-lg px-3 text-white text-sm ${getColorClass(
                                post.category?.name || "Sin categoría"
                              )}`}
                            >
                              {post.category?.name || "Sin categoría"}
                            </p>
                          </div>
                          <h3 className="text-[24px] font-playfair-display line-clamp-1">
                            {post.title}
                          </h3>
                          <hr className="border-4 w-[15%] border-[#B366FF]" />
                          <p className="post-description-two text-sm text-[#212121] leading-relaxed line-clamp-3 font-quicksand text-lg  ">
                            {post.description}
                          </p>
                        </div>
                        <div className="flex justify-between items-center p-[0px_20px_10px_20px]">
                          <div className="flex justify-start items-center	gap-1 button-wrapper">
                            <img
                              className="hidden sm:block rounded-full w-10 h-10 border-[#9147FF]"
                              src={profile.image}
                              alt="Perfil"
                            />
                            <span className="text-xs hidden sm:block">{profile.full_name}</span>
                          </div>
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
    </div>
  );
}

export default Profile;
