import { useNavigate } from "react-router-dom";    
const ReactLogout = () => {
    //logout function
    const navigation = useNavigate()
    const logout = () => {
        localStorage.clear();
        navigation("/signin")
    };

    return { logout }; // Export the logout function
}
 
export default ReactLogout;