import axios from "axios";

export default class AnimalService {
    static async getAll(userId, role, query) {
        const response =  await axios.get(`/api/animal/${query}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {userId, role}
        })
        console.log(response)
        return response
    }
}
