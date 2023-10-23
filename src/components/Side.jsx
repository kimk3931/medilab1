import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import { AiOutlineAppstore,AiFillAccountBook, AiFillAlert, AiOutlineLogout } from "react-icons/ai"
import {AiOutlineBank, AiOutlinePlusCircle, AiOutlineUser} from "react-icons/ai"
import {AiTwotoneCopy}  from "react-icons/ai"
import { Link } from "react-router-dom"
import ReactLogout from '../helpers/ReactLogout';
//sudo npm install react-router-dom@latest
//style
const Section = styled.section`
     background-color: #00a6ff;
     display: flex;
     position: fixed;
     overflow: auto;
     z-index: 1;
     flex-direction: column;
     width: 25vw;
     left: 0;
     height: 100%;
     align-items: center;
     padding-top:10px;
     .top{
        display:flex ;
        flex-direction: column;
        width: 100%;
        .brand{
             width: 100%;
             display: flex;
             justify-content:center;
             align-items: center;
             span{
                font-size: 1.5rem;
                color: white;
                font-weight:bold;
             }  
            svg{
                color: aliceblue;
                font-size: 2rem;
                margin-right: 2px;
            }
        }//end brand
       
        .links{
            display: flex;
            flex-direction: column;
            ul{
                list-style-type: none;
                padding: 1rem;
                li {
                  padding: 0.5rem;
                  margin:5px;
                  border-radius: 0.5rem;
                  text-align: left;
                  &:hover{
                    background-color: black;
                    a{
                         color: white;
                         text-decoration: none  ;
                    }
                  }//end hover
                  a{
                    color:#fafcfd;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    svg{
                        fill: #f76c8a;
                        font-size: 1.5rem;
                        margin-right: 10px;
                    } 
                  }
                }//end li
            }//end ul     
            .active{
                 background-color: black;
            }
            
        }//end links
     } //end top 

     .bottom{
        width: 90%;
        display: flex;
        flex-direction: column;
        padding: 10px;
        justify-content: center;
        background-color: #f76c8a;
        align-items: center;
        border-radius : 10px;
            svg{
                fill: #fafcfd;
                font-size: 3rem;
            }
            span{
                color: white;
            }
        }//end bottom
        .logout{
            display:flex;
            background-color: white;
            padding: 5px; width: 6em; display: inline;
            margin-top: 10px; margin-bottom: 10px;
            a{
                text-decoration: none;   
            }
        }
`
//Style End here
const Side = () => {
    //Hooks
const { logout } = ReactLogout();
const [currentLink, setCurrentLink] = useState(1)
    console.log("Current: "+currentLink)
    return ( 
        <Section>
            <div className="top">
                <div className="brand">
                    <AiOutlineBank />
                    <span>MEDILAB</span>
                </div>
                
                <div className="links">
                    <ul>
                        <li className={currentLink === 1 ? "active" : "none"}
                            onClick={() => setCurrentLink(1)}>
                            
                              <Link to="/"><AiOutlinePlusCircle/>Dashboard</Link>
                        </li>
                        <li className={currentLink === 2 ? "active" : "none"}
                            onClick={() => setCurrentLink(2)}>
                            
                              <Link to="/profile"><AiOutlineAppstore/>My Profile</Link>
                        </li>
                        <li className={currentLink === 3 ? "active" : "none"}
                            onClick={() => setCurrentLink(3)}>
                              <Link to="/add_tests"><AiTwotoneCopy/>Add Tests</Link>
                        </li>
                        <li>
                            <Link to="/lab_tests"><AiOutlineUser />Lab Tests</Link>
                        </li>
                        <li>
                              <Link to="/mybookings"><AiOutlinePlusCircle/>My Bookings</Link>
                        </li>
                        <li>
                              <Link to="/add_nurses"><AiFillAccountBook/>Add Nurses</Link>
                        </li>

                        <li>
                              <Link to="/nurses"><AiFillAlert/>Nurses</Link>
                        </li>
                    </ul>                    
                </div>
            </div>    
            {/* End Topdiv */}
            <div className="bottom">
                <AiOutlineAppstore />
                <span>Unlock for more features. <button>Go Pro</button></span> <br />
                <br />
                <span><strong>Upgrade Now</strong></span>
            </div>

            <div className="p-4">
                <button onClick={logout} className="btn btn-dark btn-sm">
                    <AiOutlineLogout /> Logout
                </button>
            </div>

        </Section>

     );
}






 
export default Side;