import { useState } from "react";
import axios from "axios"
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Layout from "../helpers/Layout";
import Side from "./Side";
import axiosInstance2 from "../helpers/axiosInstance2";
const Signup = () => {
    //hooks
    const [lab_name, setName] = useState(null)
    const [permit_id, setPermit] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const [password, setPassword] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [failure, setFailure] = useState(null)

    //Validation
    const submit = (e) => {
        e.preventDefault();
        setLoading(true)
        setSuccess(null)
        setFailure(null)
        console.log("submitting")
            //Post
            axiosInstance2.post('/lab_signup', {
                lab_name: lab_name,
                permit_id: permit_id,
                email: email,
                phone: phone,
                password:password
            })
            .then(function (response) {
                console.log(response.data.message);
                setLoading(false)
                setSuccess(response.data.message)
                setTimeout((function () {
                    setSuccess('')
                }), 2000)
                
                setEmail(''); setName(''); setPassword(''); setPhone(''); setPermit('');
            })
            .catch(function (error) {
                console.log(error.message);
                setLoading(false)
                setFailure(error.message);
            });

    }//End submit
    return ( 
        <div className="form">
       
             <Section>
           
              {loading  && <div className="loading"> Please Wait..</div>}
              {success && <div className="success"> {success}</div>}  
              {failure && <div className="failure"> { failure}</div>}  
                <form onSubmit={submit} className="card shadow p-3 pt-4">
                    <h1>Register Lab</h1>
                     <div className="card-body">
                <input type="text" placeholder="Enter Lab Name" value={lab_name}
                            onChange={(e) => setName(e.target.value)} required
                        className="form-control"/> <br />
            
                <input type="text" placeholder="Enter Permit ID" value={permit_id}
                            onChange={(e) => setPermit(e.target.value)} required
                        className="form-control"/> <br />
                
                <input type="email" placeholder="Enter Email" value={email}
                            onChange={(e) => setEmail(e.target.value)} required
                            className="form-control" /> <br />
                
                <input type="tel" placeholder="Enter Phone" value={phone}
                            onChange={(e) => setPhone(e.target.value)} required
                        className="form-control"/> <br />
            
                <input type="password" placeholder="Enter Password" value={password}
                            onChange={(e) => setPassword(e.target.value)} required
                        className="form-control"/> <br />

                <button className="btn btn-dark">Create Account</button>
                    </div>
                     <Link to="/signin">Already have an Account, Login</Link>
                </form>
            </Section>
        </div>
     );
}
 
export default Signup;
const Section = styled.section`
     display: flex;
     flex-direction: column;
     position: relative;
     align-items: center;
     justify-content: center;
     top: 50px;
     overflow: auto;
`
