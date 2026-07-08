import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthorProfile = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Ensure you send cookies/headers if handling JWT via cookies
                const response = await axios.get('http://localhost:3000/api/client/profile', { withCredentials: true });
                setProfile(response.data.data);
            } catch (error) {
                console.error("Not authenticated or server error");
                // Redirect user to sign-in page if backend rejects the request
                navigate('/signin'); 
            }
        };

        fetchProfile();
    }, [navigate]);

    if (!profile) return <p>Loading your profile...</p>;

    return (
        <div className="profile-section">
            <h2>Welcome, {profile.fullname}!</h2>
            <p>Email: {profile.email}</p>
            {/* Render author biography or custom stats here */}
        </div>
    );
};

export default AuthorProfile;