import axios from "axios";

export default class AddFavoriteAnimal {
    static async addAnimal(userId, animalId) {
        try {
            const response = await axios.post('/api/auth/addFavorite', {userId, animalId}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response
        } catch (e) {
            console.log(e)
        }
    }
}
