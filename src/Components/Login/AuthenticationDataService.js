import axios from 'axios'

class AthenticationDataService{

    getUser(indexno){
        return axios.get(`http://localhost:8080/api/adminuser/getadminuser/${indexno}`);
    }

}

export default new AthenticationDataService();