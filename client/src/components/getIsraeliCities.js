// getIsraeliCities.js
import axios from 'axios';

const getIsraeliCities = async () => {
    const data = {
        resource_id: 'b7cf8f14-64a2-4b33-8d4b-edb286fdbd37', 
        limit: 1500
    };

    try {
        const response = await axios.get('https://data.gov.il/api/action/datastore_search', { params: data });
        return response.data.result.records;
    } catch (error) {
        console.error('Error fetching Israeli cities:', error);
        return [];
    }
};

export default getIsraeliCities;
