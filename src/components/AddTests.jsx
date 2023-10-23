import { useState } from "react";
import styled from "styled-components"
import axios from "axios";
import Main from "../styles/Main";
import Layout from "../helpers/Layout";
import axiosInstance from "../helpers/axiosInstance";
import CheckSession from "../helpers/CheckSession";
import { useNavigate } from "react-router-dom";
const AddTests = () => {
    //Protect
    const { lab_name, lab_id, refresh_token } = CheckSession()
    const navigate = useNavigate()
    
        //User Must be loggen in 
        //const lab_id = localStorage.getItem("lab_id")
        //const refresh_token = localStorage.getItem("refresh_token")
        //Hooks
   
        const [test_name, setName] = useState(null)
        const [test_description, setDescription] = useState(null)
        const [test_cost, setCost] = useState(null)
        const [test_discount, setDiscount] = useState(null)
        const [availability, setAvailability] = useState(null)
        const [more_info, setInfo] = useState(null)
        const [loading, setLoading] = useState(false)
        const [success, setSuccess] = useState(null)
        const [failure, setFailure] = useState(null)
     
        //submit
      const {instance}  = axiosInstance()
        const submit = (e) => {
            e.preventDefault();
            setLoading(true)
            setSuccess(null)
            setFailure(null)
            console.log("submitting")
            //Post
            instance.post('/add_tests', {
                lab_id: lab_id,
                test_name: test_name,
                test_description: test_description,
                test_cost: test_cost,
                test_discount: test_discount,
                availability: availability,
                more_info: more_info
            })
                .then(function (response) {
                    console.log(response.data);
                    setLoading(false)
                    setSuccess(response.data.message)
                    setName(''); setDescription(''); setCost(''); setDiscount(''); setAvailability('');
                    setInfo('');
                    //setEmail(''); setName(''); setPassword(''); setPhone(''); setPermit('');
                })
                .catch(function (error) {
                    console.log(error.message);
                    setLoading(false)
                    setFailure(error.message);
                });

        }//End submit

        return (
            <div>
                <Layout />
                <Main>
                    <form onSubmit={submit} className="card shadow p-4">
                        <div className="card-body">
                            {loading && <div className="text-warning"> Please Wait..</div>}
                            {success && <div className="text-success"> {success}</div>}
                            {failure && <div className="text-danger"> {failure}</div>}
                            <input type="text" placeholder="Enter Test Name" value={test_name}
                                onChange={(e) => setName(e.target.value)} required
                                className="form-control" /> <br />
                                
                            <input type="text" placeholder="Enter Test Desc" value={test_description}
                                onChange={(e) => setDescription(e.target.value)} required
                                className="form-control" /> <br />
                                
                            <input type="text" placeholder="Enter Test Cost" value={test_cost}
                                onChange={(e) => setCost(e.target.value)} required
                                className="form-control" /> <br />
                                
                            <input type="text" placeholder="Enter Test Discount" value={test_discount}
                                onChange={(e) => setDiscount(e.target.value)} required
                                className="form-control" /> <br />
                                
                            <input type="text" placeholder="Enter Test Availability" value={availability}
                                onChange={(e) => setAvailability(e.target.value)} required
                                className="form-control" /> <br />
                                
                            <input type="text" placeholder="Enter More" value={more_info}
                                onChange={(e) => setInfo(e.target.value)} required
                                className="form-control" /> <br />
                                
                            <button className="btn btn-dark">Add Test</button>
                        </div>
                    </form>
                </Main>
            </div>
        
        );

    
  
}

export default AddTests;