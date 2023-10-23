import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import axiosInstance from '../helpers/axiosInstance';
import CheckSession from '../helpers/CheckSession';
import Layout from '../helpers/Layout';
import Main from '../styles/Main';
const Profile = () => {


    //Protect
    const { lab_name, lab_id, refresh_token } = CheckSession()
    const [user_details, setDetails] = useState({}) //Empty
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    //use effect
       const {instance}  = axiosInstance()
       useEffect(() => {
        instance.post("/lab_profile", {
            lab_id: lab_id
        })
            .then(function (response) {
                console.log(response.data.message);
                setDetails(response.data.message) // Its an JSON Object
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setError(error.message)
                setLoading(false)
        })//end catch
    }, [lab_id]);// end useeffect


    //if user_details is empty
    const boolean = Object.keys(user_details).length > 0
    
    return ( 
        <div>
            <Layout/>
            <Main>
                <div className="main">
                    <h1>Profile</h1>
                    {loading && <div className="text-warning">Loading ... </div>}
                    {error && <div className="text-danger"> Error occured. Try Later </div>}
                    {
                        boolean ? (
                            <div className="card shadow card-body m-3 text-start col-md-6">
                                <span> <b>ID:</b>  {user_details.lab_id}</span> <br />
                                <span> <b> Email:</b> {user_details.email}</span> <br />
                                <span className='text-warning'> <b>Permit: </b> {user_details.permit_id}</span><br />
                                <span className='text-dark'> <b>Tel:</b>  {user_details.phone}</span><br />
                                <span className='text-dark'> <b>Registration:</b>  {user_details.reg_date}</span><br />
                                <br />
                                <button className='btn btn-info btn-sm'>Edit Details</button> <br />
                                <button className='btn btn-info btn-sm'>Change Password</button>
                            </div>
                        ) : (
                               <span>No Profile Data</span>
                        )
                    }

                </div>
            </Main>
        </div>
        

     );
}
 
export default Profile;