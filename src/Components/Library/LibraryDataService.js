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

}

export default new LibraryDataService();