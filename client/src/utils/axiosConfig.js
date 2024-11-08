import axios from "axios";

// Configuración de la URL base de la API
axios.defaults.baseURL = 'http://localhost:8000';

// Agrega el token de acceso a cada solicitud
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Maneja errores 401 (no autorizado) e intenta refrescar el token si es posible

// Interceptor para manejar el refresh token
axios.interceptors.response.use(
    response => response, // Retorna la respuesta tal cual si no hay errores
    async error => {
        const originalRequest = error.config;

        // Verifica si el usuario no está autorizado y si la solicitud no ha sido reintentada (_retry)
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');

            try {
                // Envía la solicitud para refrescar el token
                const res = await axios.post('/token/refresh/', { refresh: refreshToken });
                localStorage.setItem('accessToken', res.data.access);
                originalRequest.headers['Authorization'] = 'Bearer ' + res.data.access;
                return axios(originalRequest); // Reintenta la solicitud original
            } catch (refreshError) {
                console.error('Error al refrescar el token', refreshError);
                // Redirige al login si no se puede refrescar el token
                window.location.href = '/login'; // Ajusta según la ruta de tu login
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error); // Rechaza el error original
    }
);

export default axios;
