'use client'
import Link from "next/link"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const [isPending, setPending] = useState(false);
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const onLogin = async () => {
        try {
            setPending(true);
            const response = await axios.post('/api/users/login', user);
            console.log(response.data);
            if (response.data.status === 200)
                router.push('/profile');
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setPending(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])


    return (
        <div className="flex flex-col justify-center items-center p-5">
            <h1 className="text-4xl text-orange-400">{isPending ? 'processing' : 'Login'}</h1>
            <div className="mt-5 flex justify-center flex-col gap-3">
                <div>

                    <label className="block text-center" htmlFor="email">email</label>
                    <input
                        className="p-2 text-black"
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-center mt-2" htmlFor="password">password</label>
                    <input
                        className="p-2 text-black"
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>
                <button
                    className="bg-orange-400 block mt-3 p-2 rounded disabled:cursor-not-allowed"
                    disabled={buttonDisabled}
                    onClick={onLogin}
                >
                    Login
                </button>
                <p>Not Register yet? <Link className="text-orange-400" href={'/signup'}>Register</Link></p>
            </div>
        </div>
    )
}