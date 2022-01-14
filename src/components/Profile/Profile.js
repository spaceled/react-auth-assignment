import React from 'react';
import { useNavigate, useParams } from 'react-router';

const Profile = () => {
    let navigate = useNavigate();
    let {username} = useParams();
    return (
        <div>
            <h1>This is {username}
                <button 
                onClick={() => {
                    navigate('/about');
                    }}> About</button></h1>
        </div>
    );
};

export default Profile;