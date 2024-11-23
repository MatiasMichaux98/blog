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
    <div className="grid  grid-rows-1 sm:grid-cols-[0.3fr_3fr]  md:grid-cols-[0.3fr_3fr] laptop-md:grid-cols-[0.9fr_3fr]  lg:grid-cols-[0.3fr_3fr] bg-[#202020]">
      <div className="">
        <Sidebar />
      </div>
      <div className=" p-8 min-h-screen">
        <div className="container-profile">
          <div className="grid grid-cols-2 grid-rows-1 gap-0 p-8">
            <div className="flex justify-center ">
              <img
                className="  rounded-full w-20 h-20 medium:w-32 medium:h-32  sm:w-48 sm:h-48  border-2 border-[#9147FF]"
                src={profile?.image || "ruta/a/imagen/default.jpg"}
                alt="Perfil"
              />
            </div>

            <div className="col-span-1">
              <div className="profile-user-settings  ">
                <h1 className="profile-user-name text-lg text-white">
                  {profile?.full_name || "Usuario desconocido"}
                </h1>
                <div className="btn-settings flex flex-row gap-[10px]">
                  <Link className="btn-profile-edit 	" to="/editProfile">
                    <button className=" flex items-center p-1 pr-2 rounded-md text-white bg-[#9147FF] ">
                      <svg
                        className="w-4 h-4 mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
                        />
                      </svg>
                      Editar Perfil
                    </button>
                  </Link>
                  <Link className="btn-profile-edit " to="/editProfile">
                    <button
                      className="flex  items-center p-1 pr-2 rounded-md text-white bg-[#9147FF] "
                      aria-label="profile settings"
                    >
                      <i
                        className="fas fa-cog w-4 h-6 mr-1  content-center "
                        aria-hidden="true"
                      ></i>
                    </button>
                  </Link>
                </div>
              </div>
              <div className="profile-bio ">
                <span className="profile-real-name text-white text-base">
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
                  <li className="text-white text-lg">
                    <span className="profile-stat-count ">{posts.length}</span>{" "}
                    posts
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="border-neutral-700 p-4" />

          <div className="flex justify-center ">
            <div className="grid grid-cols-2 md:grid-cols-3 laptop-md:grid-cols-3 xl:grid-cols-3 gap-2 cursor-pointer ">
              {postsError ? (
                <div className="col-span-full text-center text-red-500 font-semibold text-lg">
                  {postsError}
                </div>
              ) : posts.length > 0 ? (
                posts.map((post, index) => (
                  <div key={index} className="">
                    <div className="  sm:max-w-64 lg:max-w-80 mx-auto  rounded-lg border-2 border-[#B366FF]">
                      <div className="grid grid-cols-1 gap-1 bg-[#ECE9E6] bg-custom-gradient">
                        <div className="relative bg-auto bg-center w-full h-[150px] overflow-hidden">
                          <img
                            src={post.image}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>

                        <div className="p-6 space-y-1">
                          <div className="categoria w-[90px] ">
                            <p
                              className={`rounded-lg flex justify-center text-white text-sm ${getColorClass(
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
                              className="rounded-full w-10 h-10 border-[#9147FF]"
                              src={profile.image}
                              alt="Perfil"
                            />
                            <span className="text-xs">{profile.full_name}</span>
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
