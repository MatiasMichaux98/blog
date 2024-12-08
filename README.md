🖥️ Proyecto React + Django + PostgreSQL
 **Tecnologías utilizadas**
- **Frontend**: [ReactJS]
- **Backend**: [Django]
- **Base de Datos**: [PostgreSQL]
- **APIs**: Django REST Framework

  Antes de comenzar, asegúrate de tener instalados los siguientes componentes:
1. [Python >=3.9.x]
2. [Node.js >=14.x]
3. PostgreSQL (instalarlo y configurarlo en tu pc )

**Instalación**
clona el repositorio en tu máquina:
git clone https://github.com/tu_usuario/tu_proyecto.git

Configurar el entorno virtual para Django
# Crear entorno virtual
1. pip install virtualenv 
2. luego usa venv\Scripts\activate para activar el entorno

# Instala las dependencias de Django:
- pip install -r requirements.txt

# Configurar la base de datos PostgreSQL
  Crea el archivo .env en el directorio principal con los datos de tu base de datos PostgreSQL:
- **DB_NAME=nombre_basedatos**
- **DB_USER=tu_usuario**
- **DB_PASSWORD=tu_contraseña**
- **DB_HOST=localhost**
- **DB_PORT=5432**
  
Luego crea la base de datos en PostgreSQL:
- **CREATE DATABASE nombre_basedatos;**
  
# Aplicar migraciones
  luego en consola dentro del entorno virtual pone los siguientes comandos 
 - **python manage.py makemigrations**
 - **python manage.py migrate**
# Por ultimo iniciar el servidor Django
- **con el comando --> python manage.py runserver**

# Configuracion del front 
  En la carpeta client, instala las dependencias necesarias:
- **cd ../client**
- **npm install**
  
# Ejecutar el servidor de desarrollo para React
- **npm start**
