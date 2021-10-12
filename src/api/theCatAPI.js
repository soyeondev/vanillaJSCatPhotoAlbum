const API_ENDPOINT = "https://api.thecatapi.com/v1";

const request = async (url) => {
    try {
        const repsonse = await fetch(url);
        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            const errData = await response.json();
            throw errData;
        }
    } catch(e) {
        throw {
            message: e.message,
            status: e.status,
        }
    }
}

const api = {
    fetchCats: async (keyword) => {
        try {
            const breeds = await request(
                `${API_ENDPOINT}/breeds/search?q=${keyword}`
            );
            const requests = breeds.map(async (breed) => {
                return await request (
                    `${API_ENDPOINT}/images/search?limit=20&breed_ids=${breed.id}`
                )
            });
            const responses = await Promise.all(requests);
            const result = responses.reduce((acc, cur) => {
                
            });
        } catch(e) {
            return e;
        }
    }
}

export default api;