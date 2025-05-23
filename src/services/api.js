import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/users';

const apiService = {
  getUsers: async (limit = 10, skip = 0, searchQuery = '') => {
    try {
      let url = `${BASE_URL}?limit=${limit}&skip=${skip}`;

      if (searchQuery) {
        url = `${BASE_URL}/search?q=${encodeURIComponent(searchQuery)}&limit=${limit}&skip=${skip}`;
      }

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
};

export default apiService;