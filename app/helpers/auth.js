class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(cb) {
    this.authenticated = true;

    cb();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    const expireDateTime = localStorage.getItem('expiresAt');
    if (token && expireDateTime) {
      const expireAt = new Date(expireDateTime);
      const current = new Date();
      if (expireAt > current) {
        return true;
      }
    }
    return false;
  }
}

export default new Auth();
