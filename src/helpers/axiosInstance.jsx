// axiosInstance.js

import axios from 'axios';
//let person = Person()
//We now have axiosInstance as a component
const axiosInstance = () => {
  const refresh_token = localStorage.getItem("refresh_token")
  console.log("Loads6")
  console.log("Token in instance v" + refresh_token)
  const instance = axios.create({
    baseURL: 'https://modcom.pythonanywhere.com/api', // Replace with your API's base URL
    timeout: 30000, // Adjust the timeout as needed (in milliseconds)
    headers: {
      'Content-Type': 'application/json', // Set the default content type for requests
      'Authorization': `Bearer ${refresh_token}`
    },
  });
  return {instance};//return instance from line 10
}
export default axiosInstance;//export component