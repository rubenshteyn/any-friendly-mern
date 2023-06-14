import axios from "axios";

export default class DeleteFavoriteAnimal {
    static async deleteAnimal(userId, animalId) {
        try {
            const response = await axios.post('/api/auth/deleteFavorite', {userId, animalId}, {
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
