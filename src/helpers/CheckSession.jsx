import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const CheckSession = () => {
    const navigation = useNavigate()//**
    console.log("Loads")
    //useEffect runs at least  once when page loads   
        const lab_name = localStorage.getItem("lab_name")
        const lab_id = localStorage.getItem("lab_id")
        const refresh_token = localStorage.getItem("refresh_token")
        useEffect(() => {
            console.log("useEffect")
            //check if above are empty
          
            if (!lab_name && !lab_id && !refresh_token) {
                console.log("Works")
                localStorage.clear();
                return navigation("/signin")
            }
        }, [lab_name, lab_id, refresh_token, navigation]);
    
    //return your var
    return {lab_name, lab_id, refresh_token}
}
 
export default CheckSession;