import axios from "axios";

const API_URL = 'http://localhost:8080/classroom';

class ClassroomDataService {

    // //get all types of templates
    // getAllTemplates() {
    //     return axios.get(`${API_URL}/all`)
    // }
    //
    //get template by ID
    getClassroom(id) {
        return axios.get(`${API_URL}/getbyid/${id}`)
    }
    //
    // //get template by type
    // filterByType(type) {
    //     return axios.get(`${API_URL}/findByType/${type}`)
    // }
    //
    // //get template by added user
    // searchByAddedUser(username) {
    //     return axios.get(`${API_URL}/findByUser/${username}`)
    // }
    //
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

    // addResearchTemplate(data) {
    //     return axios.post(`${API_URL}/upload/research`, data)
    // }
    //
    // editDescription(data) {
    //     return axios.put(`${API_URL}/updateDesc`, data)
    // }
    //
    editClassroom(data) {
        return axios.put(`${API_URL}/`, data)
    }
    //
    // deleteTemplate(id, imgId, fileId) {
    //     return axios.delete(`${API_URL}/${id}/${imgId}/${fileId}`)
    // }

}

export default new ClassroomDataService();