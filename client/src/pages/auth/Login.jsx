import { useState } from "react";
import axios from "../../utils/axiosConfig";
import { useNavigate, } from "react-router-dom";
import "../../App.css";
import PropTypes from "prop-types";
import "../../styles/Authentication.css"
import '@fortawesome/fontawesome-free/css/all.min.css';


function Login({ handleLogin }) {
  const [isRegistering, setIsRegistering] = useState(false)//para alternar entre login y register 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[password2, setPassword2] = useState('');
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (isRegistering && (!username || !password2))) {
      setError("Por favor complete los campos");
      return;
    }
    if (!validateEmail(email)) {
      setError("Por favor, introduce un email valido");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al  menos 6 caracteres");
      return;
    }
    if(isRegistering && password !== password2){
      setError("Las contraseñas no coinciden");
      return
    }
    
    try {
      if (isRegistering) {
        await axios.post("/register/", { username, email, password,password2 });
        console.log("Usuario registrado");
        navigate("/home");
      } else {
        const response = await axios.post("/token/", { email, password });
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        console.log("Datos enviados");
        handleLogin();
        navigate("/home");
      }
    } catch (error) {
      console.log("Error en autenticación", error);
      setError("Error en autenticación, por favor intente de nuevo.");
    }
  };
  return (
    <>
     <div className="mainBody">
      <div className="container" id="container">
          {/* Formulario de registro */}
          {isRegistering ? (
            <div className="form-container sign-up-container">
              <form className="mainForm" onSubmit={handleSubmit}>
                {error && <p className="text-red-500">{error}</p>}
                <h1 className="mainH1">Inscríbete con:</h1>
                <div className="Social-container">
                  <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                </div>
                <span>o usa tu cuenta</span>
                <input
                  className="mainInput"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  className="mainInput"
                  type="email"
                  placeholder="Ex. james@bond.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="mainInput"
                  type="password"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  className="mainInput"
                  type="password"
                  placeholder="******"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
                <button className="btnAuth" type="submit">Registrarse</button>
              </form>
            </div>
          ) : (
            // Formulario de inicio de sesión
            <div className="form-container sign-in-container">
              <form className="mainForm" onSubmit={handleSubmit}>
                {error && <p className="text-red-500">{error}</p>}
                <h1 className="mainH1">Iniciar Sesión</h1>
                <div className="Social-container">
                  <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                </div>
                <span>o usa tu cuenta</span>
                <input
                  className="mainInput"
                  type="email"
                  placeholder="Ex. james@bond.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="mainInput"
                  type="password"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button  className="btnAuth" type="submit">Iniciar Sesión</button>
              </form>
            </div>
          )}
          {/* Contenedor de superposición */}
          <div className="overlay-container">
            <div className="overlay">
              {isRegistering ? (
                <div className="overlay-panel ">
                  <h1>bienvenido de nuevo!</h1>
                  <p className="mainP">Para mantenerse conectado con nosotros, inicie sesión con su cuenta personal </p>
                  <button onClick={() => setIsRegistering(false)}>¿Ya tienes cuenta? Inicia sesión</button>
                </div>
              ) : (
                <div className="overlay-panel ">
                  <h1>hola Amigo!</h1>
                  <p className="mainP">Introduce tus datos personales y comienza tu viaje con nosotros.
                  </p>
                  <button onClick={() => setIsRegistering(true)}>
                    ¿No tienes una cuenta? Registrate
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
     </div>
    </>
  );
  
}

export default Login;

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
