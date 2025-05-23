const localStorageService = {
  USERS_KEY: 'local_users',

  getUsers: () => {
    try {
      const users = localStorage.getItem(localStorageService.USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error getting users from localStorage:', error);
      return [];
    }
  },

  addUser: (user) => {
    try {
      const users = localStorageService.getUsers();

      const maxId = users.reduce((max, u) => Math.max(max, u.id || 0), 0);
      const newUser = { ...user, id: maxId + 1 };
      
      users.push(newUser);
      localStorage.setItem(localStorageService.USERS_KEY, JSON.stringify(users));
      return newUser;
    } catch (error) {
      console.error('Error adding user to localStorage:', error);
      throw error;
    }
  },
};

export default localStorageService;
