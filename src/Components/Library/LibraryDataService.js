import axios from "axios";

const API_URL = 'http://localhost:8080/library';

class LibraryDataService {

    fetchLibraryResources() {
        return axios.get(`${API_URL}/`)
    }

    fetchLibraryResource(id) {
        return axios.get(`${API_URL}/${id}`)
    }

    addLibraryResource(resource) {
        return axios.post(`${API_URL}/`, resource)
    }

    editLibraryResource(resource) {
        return axios.put(`${API_URL}/edit`, resource)
    }

    deleteLibraryResource(id) {
        return axios.delete(`${API_URL}/${id}`)
    }

    downloadResource(id) {
        return axios.get(`${API_URL}/download/${id}`, {responseType: 'blob'})
    }

    filterByType(type) {
        return axios.get(`${API_URL}/filter/${type}`)
    }

    filterByGradeAndSubject(grade, subject) {
        return axios.get(`${API_URL}/filter/lib/${grade}/${subject}`)
    }

    searchResource(text) {
        return axios.get(`${API_URL}/search/${text}`)
    }

    fetchGradeList() {
        return axios.get("http://localhost:8080/Subject/")
    }

    fetchSubjectListForGrade(grade) {
        return axios.get(`http://localhost:8080/Subject/${grade}`)
    }
}

export default new LibraryDataService();