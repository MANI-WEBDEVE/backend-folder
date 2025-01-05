import  { useEffect } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import InputFiled from '@/components/InputFiled';

const Home = () => {
    useEffect(() => {
        const token = Cookies.get('token');
        console.log('Token:', token);
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log('Decoded Token:', decodedToken);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }, []);

    return (
        <>
            <InputFiled />
        </>
    );
};

export default Home;