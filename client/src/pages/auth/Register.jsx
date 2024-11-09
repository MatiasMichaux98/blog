import { useState } from "react"
import axios from "../../utils/axiosConfig"
import { useNavigate } from "react-router-dom";

function Register() {
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
  };

    const handleSubmit = async (e) => {
      e.preventDefault(); 
      if (!username || !email || !password || !password2) {
        setError('Por favor complete todos los campos.');
        return;
    }
    if (!validateEmail(email)) {
        setError('Por favor, introduce un email válido.');
        return;
    }
    if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.');
        return;
    }
    if (password !== password2) {
        setError('Las contraseñas no coinciden.');
        return;
    }
      try {
          await axios.post("/register/", {
          username, // Envío de parámetros como objeto
          email,
          password,
          password2,
        });
        console.log("Usuario registrado exitosamente!");
        navigate("/home")
      } catch (error) {
        console.error("Error al registrar usuario:", error.message);
      }
    };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input type="text" 
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}/>
        <input type="email" 
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" 
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
        <input type="password" 
        placeholder="repet-password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}/>
        <button type="submit">register</button>
      </form>
    </div>
  )
}

export default Register
