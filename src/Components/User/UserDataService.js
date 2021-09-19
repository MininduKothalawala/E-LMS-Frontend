import axios from "axios";

const API_URL = 'http://localhost:8080/api/adminuser';

class UserDataService {


    filterByType(type) {
        return axios.get(`${API_URL}/getuser/${type}`)
    }

    searchByAddedUser(indexno) {
        return axios.get(`${API_URL}/getadminuser/${indexno}`)
    }

    getUser(indexno){
        return axios.get(`http://localhost:8080/api/adminuser/getadminuser/${indexno}`);
    }

    editTemplate(data) {
        return axios.put(`${API_URL}/update`, data)
    }


}

export default new UserDataService();