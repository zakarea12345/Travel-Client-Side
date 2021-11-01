import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import ReviewAllBooking from './ReviewAllBooking';

const ManageAllBookings = () => {
    const [booking, setBooking] = useState([]);
    useEffect(()=>{
        fetch(`https://secret-plains-62892.herokuapp.com/orders`)
        .then(res => res.json())
        .then(data => setBooking(data))
    },[]);
    const handleRemove = key => {
        
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            const url = `https://secret-plains-62892.herokuapp.com/${key}`
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully');
                        const newBooking = booking.filter(book =>  book._id !== key);
                        setBooking(newBooking);;
                    }
                });
        }
    
    };
    const handleApproveStatus = key => {
        const url = `http://localhost:5000/orders/${key}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    alert('Booking Updated Successfully');
                    // For Refreshing Page
                    window.location.reload();
                }
            })
    }
    return (
        <div>
            <Container>
                <Row>
                    {
                        booking.map(bookingDetails=> <ReviewAllBooking bookingDetails={bookingDetails} key={bookingDetails._id} handleRemove={handleRemove} handleApproveStatus={handleApproveStatus}></ReviewAllBooking>)
                    }
                </Row>
            </Container>
        </div>
    );
};

export default ManageAllBookings;