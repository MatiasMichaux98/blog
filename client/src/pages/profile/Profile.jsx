import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "../../styles/Profile.css";
import React from "react";
import Sidebar from '../../components/Sidebar'
function Profile () {
    const [profile, setProfile] = useState(null); // para los datos del perfil
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [posts, setPosts] = useState([]); // Estado para almacenar los posts del usuario
    const [postsError, setPostsError] = useState('');

    // obtención del token id del usuario
    const token = localStorage.getItem('accessToken');
    const userId = token ? jwtDecode(token).user_id : null; // usa jwtDecode para extraer el id del usuario del token JWT

    // Función para cargar los posts del usuario
    const fetchUserPosts = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8000/user/${userId}/posts/`);
            setPosts(response.data);
        } catch (error) {
            setPostsError('Error al cargar los posts del usuario');
            console.error('Error al cargar los posts:', error);
        }
    }, [userId]);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!userId) {
                setError('Usuario no autenticado');
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`http://localhost:8000/profile/${userId}/`);
                setProfile(response.data || {}); // Asegúrate de que profile tenga un valor aunque esté vacío
                await fetchUserPosts();
            } catch (error) {
                setError('Error al cargar el perfil');
                console.error('Error al cargar el perfil:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [userId, fetchUserPosts]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
            
            <div className="Profile-main">
                <div className="content-menu-two">
                    <Sidebar />
                </div>
                <div className="Profilebody">   
                    <div className="container-profile">
                        
                        <div className="profile">
                            <div className="profile-image">
                                <img src={profile?.image || 'ruta/a/imagen/default.jpg'} alt="Perfil" /> 
                            </div>
                            
                            <div className="contenido-main">
                                <div className="profile-user-settings">
                                    <h1 className="profile-user-name">{profile?.full_name || 'Usuario desconocido'}</h1>
                                    <Link className="btn-profile-edit" to="/editProfile">
                                        <button className="textoBtnEdit">Editar Perfil</button>
                                    </Link>
                                    <Link className="btn profile-settings-btn" to="/editProfile">
                                        <button className="btn-settings" aria-label="profile settings">
                                            <i className="fas fa-cog" aria-hidden="true"></i>
                                        </button>
                                    </Link>
                                </div>
                                <div className="profile-bio">
                                    <span className="profile-real-name">
                                        {(profile?.bio || '').split('\n').map((line, index) => (
                                            <React.Fragment key={index}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </span>
                                </div>
                                <div className="profile-stats">
                                    <ul>
                                        <li><span className="profile-stat-count">{posts.length}</span> posts</li>
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                        <hr className="barra"/>

                        <div className="user-posts">
                        <div className="postcomplete">
                            {postsError ? (
                                <div>{postsError}</div>
                            ) : posts.length > 0 ? (
                                posts.map((post, index) => (
                                    <li key={index} className="list-name-two">
                                    <div className="contenedor-two">
                                        <div className="post-content-two">
                                        <h3 className="post-title-two">{post.title}</h3>
                                        <p className="post-description-two">{post.description}</p>
                                        <div className="btn-figure-two">
                                            <p className="btn-left-two fa fa-comment"></p>
                                            <p className="btn-right-two fa fa-heart"></p>
                                        </div>
                                        </div>
                                    </div>
                                    </li>
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

export default Profile
