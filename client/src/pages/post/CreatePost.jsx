import axios from "axios"
import { useEffect, useState } from "react"

function CreatePost() {
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[category, setCategory] = useState('');
    const[tags, setTags] = useState('');
    const[image, setImage] = useState(null);
    const[categories, setCategories] = useState([]);

    //cargar las categorias al montar el componente
    const loadCategories = async () => {
        try{
            const response = await axios.get('http://localhost:8000/categories/');
            setCategories(response.data)
        }catch(error){
            console.error('Error al cargar las categorías:', error);
        }
    };

    useEffect(() => {
        loadCategories()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description',description)
        formData.append('category', category)
        formData.append('tags',tags)
        if (image) formData.append('image', image)
        
        const token = localStorage.getItem('accessToken')
        
        try{
            await axios.post('http://localhost:8000/create-post/', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            })
            alert('Post creado exitosamente!');
            console.log('token',token)
        }catch(error){
            console.error('Error al crear el post:', error.response ? error.response.data : error.message);
            alert('Error al crear el post');
        }
    }
  return (
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
        </select>
        <input type="text" placeholder="Tags" value={tags} onChange={(e) => setTags(e.target.value)} required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Create Post</button>
    </form>
  )
}

export default CreatePost
