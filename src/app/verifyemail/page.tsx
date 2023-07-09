'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";


export default function VerifyEmail() {
    const [token, setToken] = useState('');
    const router = useRouter();

    const verifyEmail = async () => {
        const toastId = toast.loading('Verifying');
        try {
            const response = await axios.post('/api/users/verifyemail', { token });
            if (response.status === 200) {
                toast.success('Verified', { duration: 10000 })
                router.push('/login');
            } else {
                toast(response.data.message)
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                throw new Error(error.message);
            }
        } finally {
            setToken('');
            toast.remove(toastId);
        }
    }

    useEffect(() => {
        const urlToken = location.search.split('=')[1];
        setToken(urlToken);
    }, [])

    useEffect(() => {
        if (token != '') {
            verifyEmail();
        }
    }, [token])


    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )


}
