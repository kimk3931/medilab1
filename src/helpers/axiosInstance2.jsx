import axios from 'axios';
 console.log("Loads10")
const axiosInstance2 = axios.create({
  baseURL: 'https://modcom.pythonanywhere.com/api', // Replace with your API's base URL
  timeout: 30000, // Adjust the timeout as needed (in milliseconds)
  headers: {
    'Content-Type': 'application/json'
  },
});

export default axiosInstance2;