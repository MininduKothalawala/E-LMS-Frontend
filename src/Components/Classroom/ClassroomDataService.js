import axios from "axios";

const API_URL = 'http://localhost:8080/classroom';

class ClassroomDataService {

    getClassroom(id) {
        return axios.get(`${API_URL}/getbyid/${id}`)
    }

    downloadLec(id) {
        return axios.get(`${API_URL}/downloadLec/${id}`, {responseType: 'blob'})
    }

    downloadTute(id) {
        return axios.get(`${API_URL}/downloadTute/${id}`, {responseType: 'blob'})
    }

    getImage(id) {
        return axios.get(`${API_URL}/image/${id}`, {responseType: 'blob'})
    }

    addClassroom(data) {
        return axios.post(`${API_URL}/addClassroom`, data)
    }

    editClassroomWithoutFiles(data) {
        return axios.put(`${API_URL}/updatewithoutFiles`, data)
    }

    editClassroomWithFiles(data) {
        return axios.put(`${API_URL}/updatewithFile`, data)
    }

}

export default new ClassroomDataService();