import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import {backendUrl, appendToUrl} from '../constants';
import { useLocalStorage } from '../hooks/useLocalStorage';

const OtpComponent = () => {
    const [otp, setOtp] = useState('');
    const {state} = useLocation();
    const navigate = useNavigate();

    const [getLocalStorage, setLocalStorage, removeLocalStorage] = useLocalStorage('token');

    const handleChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle OTP submission logic here
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({otp: otp, email: state.email, roll: state.roll, password: state.password}),
        };
        const response = await fetch(appendToUrl(backendUrl, 'auth/signup/jums/verify'), options);

        if(response.ok){
            const data = await response.json();
            console.log(data)
            setLocalStorage(data.token);
            navigate('/student-profile')
        }

        else{
            const data = await response.json();
            alert(data.message);
        }
        setOtp('');
    }
    

    return (
        <div className="mx-auto max-w-md bg-red-200 p-8 rounded-lg">
            <h2 className="text-red-800 font-bold mb-4">Enter OTP</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-red-800 rounded"
                    placeholder="Enter OTP"
                />
                <button type="submit" className="w-full bg-red-800 text-white p-2 rounded cursor-pointer">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default OtpComponent;