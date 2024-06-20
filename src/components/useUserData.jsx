import { useEffect, useState } from 'react'
import api from '../api';
import { jwtDecode } from "jwt-decode"
import { ACCESS_TOKEN } from '../constants';

const useUserData = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            const decoded = jwtDecode(token)
            console.log(decoded)
            const id = decoded.user_id
            api.get(`/api/user/${id}`)
                .then(res => {
                    setUserData(res.data)
                    console.log(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [])

    return userData;
}

export default useUserData
