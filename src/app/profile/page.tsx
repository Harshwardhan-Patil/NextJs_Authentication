'use client'
import axios from "axios"
import { useRouter } from "next/navigation"



export default function Profile() {
    const router = useRouter();
    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            router.push('/login');
        } catch (error) {
            if (error instanceof Error)
                console.log(error.message);

        }
    }
    return (
        <div className="w-screen h-screen flex-col flex justify-center items-center">
            <h1>Welcome to the profile</h1>
            <button
                className="p-2 rounded-sm bg-cyan-500 mt-4"
                onClick={logout}
            >Logout</button>
        </div>
    )
}