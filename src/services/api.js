import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/users';

const apiService = {
  getUsers: async (limit = 10, skip = 0, searchQuery = '', metadata) => {
    try {
      let url = `${BASE_URL}?limit=${limit}&skip=${skip}`;
      if (searchQuery) {
        const isPhoneSearch = metadata?.isPhoneSearch || /^[0-9\s\-+]+$/.test(searchQuery);
        if (isPhoneSearch) {
          const allUsers = await axios.get(`${BASE_URL}?limit=100`);
          
          let numericQuery = searchQuery;
          if (metadata?.phoneQuery) {
            numericQuery = metadata.phoneQuery;
          }
          numericQuery = numericQuery.replace(/[\s\-+]/g, '');
          const filteredUsers = allUsers.data.users.filter(user => {
            if (!user.phone) return false;
            const normalizedPhone = user.phone.replace(/[\s\-+]/g, '');
            const matches = normalizedPhone.includes(numericQuery);
            
            
            return matches;
          });          
          const paginatedUsers = filteredUsers.slice(skip, skip + limit);
          
          return {
            users: paginatedUsers,
            total: filteredUsers.length,
            skip,
            limit
          };
        } else {
          url = `${BASE_URL}/search?q=${encodeURIComponent(searchQuery)}&limit=${limit}&skip=${skip}`;
        }
      }
      
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  addUser: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/add`, userData);
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },
  
  updateUser: async (userId, userData) => {
    try {
      console.log(`Simulating update for user ID: ${userId}`);
      const response = await axios.put(`${BASE_URL}/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },
  
  deleteUser: async (userId) => {
    try {
      console.log(`Simulating deletion for user ID: ${userId}`);
      const response = await axios.delete(`${BASE_URL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
};

export default apiService;
