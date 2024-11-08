import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../../styles/Profile.css"
import React from 'react';

function Profile() {
    const[profile, setProfile] = useState(null)//para los datos del perfil
    const[loading, setLoading] = useState(true)
    const[error , setError] = useState('')

    //obtencion del token id del usuario
    const token = localStorage.getItem('accessToken')
    const userId = token ? jwtDecode(token).user_id : null //usa el jwtdecode para extraer el id del usuario del token JWT, si el token no esta , devolvera null, de lo contrario lo usara para el manejo de errores 

    useEffect(() => {
        const fetchProfile = async () => {
            if(!userId){
                setError('usuario no autenticado')
                return
            }

            try{
                const response = await axios.get(`http://localhost:8000/profile/${userId}/`)
                setProfile(response.data)
            }catch(error){
                setError('Error al cargar el perfil',error)
            }finally{
                setLoading(false)
            }
        }
        fetchProfile()
    },[userId])// Aquí `userId` asegura que el perfil se recargue al cambiar de usuario.

    if(loading) return <div>Cargando...</div>
    if(error) return <div>{error}</div>

  return (
    <div  className="Profilebody">
        <div className="container-profile">

            <div className="profile ">
                <div className="profile-image">
                    <img src={profile.image}  />
                </div>
                <div className="contenido">
                    <div className="profile-user-settings">
                        <h1 className="profile-user-name">{profile.full_name}</h1>
                        <Link className="btn-profile-edit " to="/editProfile">
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
                        {profile.bio.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                        ))}
                    </span>
                

                    </div>
                    <div className="profile-stats">
                        <ul>
                            <li><span className="profile-stat-count">164</span> posts</li>
                        </ul>
                    </div>
                </div>
            </div>

                
        </div>        
            
    </div>
       
    

  )
}

export default Profile
