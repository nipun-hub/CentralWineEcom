import axiosInstance from '../utils/axiosInstance'

class UserService {
  // Sign up a new user
  async signup(data) {
    try {
      const dto = {
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        email: data.email || null,
        password: data.password || null,
        isEmailVerified: true,
        userType: 1,
      }
      const response = await axiosInstance.post('/users/signup', dto)
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error
    }
  }

  // Login user
  async login(data) {
    try {
      const dto = {
        email: data.email || null,
        password: data.password || null,
      }
      console.log(data)
      const response = await axiosInstance.post('/users/login', dto)
      const { token, user } = response.data.data

      // Store user details and token in localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error
    }
  }

  // Logout user
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // Get current user from localStorage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token')
  }
}

export default new UserService()
