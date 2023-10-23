import { useEffect } from "react"
import { useState } from "react"
import axiosInstance from "../helpers/axiosInstance"
import CheckSession from "../helpers/CheckSession"
import Layout from "../helpers/Layout"
import Main from "../styles/Main"
import NursesDialog from "./NursesDialog"
const MyBookings = () => {
     //Protect
    const { lab_name, lab_id, refresh_token } = CheckSession()
    //hooks
    const [bookings, setBookings] = useState(null) //Empty
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    //Add this  below
    const [filteredData, setFilteredData] = useState([]); 

    //hook for dialog open
    const [show, setShowDialog] = useState(false);
    const [invoice_no, setInvoice] = useState(null)

    
    //Search
    const [query, setQuery] = useState('')  // null
  const {instance}  = axiosInstance()
    useEffect(() => {
        instance.post("/view_bookings", {
            lab_id: lab_id
        })
            .then(function (response) {
                console.log(response.data);
                setBookings(response.data)//important
                setFilteredData(response.data);
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setError(error.message)
                setLoading(false)
        })//end catch
    }, [lab_id]);// end useeffect

 
    //add this
    const handleLiveSearch = (value) => {
       //ABove value comes from the typing 
    setQuery(value); //query has something as long someone is searching
    //check if lab tests are not empty
    const filtered = bookings && bookings.filter((item) =>
        item.appointment_date.toLowerCase().includes(value.toLowerCase()) ||
        item.invoice_no.toLowerCase().includes(value.toLowerCase()) 
    );
        //update setFilteredData with filtered items
    setFilteredData(filtered);
  };//end

  //***Add this function for MAP, call it in Map button down there */  
  const handleOpenMap = (latitude, longitude) => {
    const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(mapUrl, '_blank');
  };
  
    return ( 
        <div>
            <Layout />
            <Main>
                {/* add handleLiveSearch function onChange below */}
                <input type="text" placeholder="Search a date/Invoice No" value={query}
                    onChange={(e) => handleLiveSearch(e.target.value)}
                className = "form-control" /> 
                
                <table className="table table-striped bg-light p-5 m-1">
                     {loading && <div className="text-warning">Loading ... </div>}
                     {error && <div className="text-danger"> Error occured. Try Later </div>}
                    <thead>
                    <tr>
                       
                        <th>Date</th>
                        <th>Time</th>
                        <th>Member</th>
                        <th>Where Taken</th>
                        <th>Test</th>          
                        <th>Inv No</th>
                    </tr>
                    </thead>
                    <tbody>
                        {/* add this filteredData */}
                        {filteredData && filteredData.map((booking) => (
                            <tr className="mt-5" key={booking.book_id}>
                           
                                <td>{booking.appointment_date}</td>
                                <td>{booking.appointment_time}</td>
                                <td>{booking.member.surname}</td>
                                <td>{booking.where_taken}</td>
                                <td>{booking.test_details.test_name}</td>
                                <td>{booking.invoice_no}</td>
                                <td>
                                    {booking.status === 'Pending' ? (
                                        <td><button className="btn btn-warning btn-sm"
                                            onClick={() => {
                                                setShowDialog(true);
                                                setInvoice(booking.invoice_no)
                                            }}>Assign</button> <br /><br />
                                            
                                            <button className="btn btn-danger btn-sm">Decline</button></td>
                                    ) : booking.status === 'Allocated' ? (
                                        <td><button className="btn btn-dark btn-sm disabled">Allocated</button></td>
                                    ) : booking.status === 'Done' ? (
                                        <td><button className="btn btn-success btn-sm">Completed</button></td>
                                    ) : (
                                        <td><button className="btn btn-info btn-sm"> --NaN-- </button></td>
                                    )}
                                </td>
                                <td>
                                    {/* Chekc if there is a latitude */}
                                    {booking.latitude === '' ? (
                                         <td></td>
                                    ) : (
                                        // below means there are coordinates, 
                                        //Call function defined on Line 51 and pass latitude and longitude
                                        //see below, save , run and click Map on Bookings should take you to Google Maps
                                            <td><button onClick={() => handleOpenMap(booking.latitude,
                                                booking.longitude)}
                                                className="btn btn-primary btn-sm"> Map </button></td>
                                    )}
                                   
                                </td>
                         
                        </tr>    
                        ))}
                
                        <NursesDialog isOpen={show}
                            onClose={()=> setShowDialog(false)}
                        invoice_no = {invoice_no}/>

                    </tbody>
                 </table>
            
            </Main>
        </div>
        
     );
}
 
export default MyBookings