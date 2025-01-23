import axiosInstance from '../utils/axiosInstance'

class ImageService {
  async getImages() {
    try {
      const response = await axiosInstance.get('/images/get-images')
      // Store user details and token in localStorage
      localStorage.setItem('images', response.data)
      return response.data.data
    } catch (error) {
      throw error.response ? error.response.data : error
    }
  }
}

export default new ImageService()
