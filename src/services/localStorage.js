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

  updateUser: (user) => {
    try {
      console.log('Updating user in localStorage:', user);
      const users = localStorageService.getUsers();
      const index = users.findIndex(u => u.id === user.id);
      
      console.log('Found user at index:', index, 'with ID:', user.id);
      
      if (index !== -1) {
        users[index] = {
          ...users[index],
          ...user,
          id: user.id
        };
        
        console.log('Updated user object:', users[index]);
        
        localStorage.setItem(localStorageService.USERS_KEY, JSON.stringify(users));
        return users[index];
      } else {
        console.warn('User with ID', user.id, 'not found in localStorage');
      }
      return null;
    } catch (error) {
      console.error('Error updating user in localStorage:', error);
      throw error;
    }
  },

  deleteUser: (userId) => {
    try {
      console.log('Deleting user from localStorage with ID:', userId);
      const users = localStorageService.getUsers();
      const filteredUsers = users.filter(user => user.id !== userId);
      
      if (users.length !== filteredUsers.length) {
        localStorage.setItem(localStorageService.USERS_KEY, JSON.stringify(filteredUsers));
        return true;
      } else {
        console.warn('User with ID', userId, 'not found in localStorage for deletion');
        return false;
      }
    } catch (error) {
      console.error('Error deleting user from localStorage:', error);
      throw error;
    }
  }
};

export default localStorageService;
