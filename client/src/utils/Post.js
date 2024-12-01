import axios from "axios";

const TaskApi = axios.create({
    baseURL:'http://127.0.0.1:8000/post/'
})

export const deleteTask = (id) => TaskApi.delete(`/${id}`)
export const updateTask = (id,task) => TaskApi.put(`/${id}/`,task)