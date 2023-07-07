'use client'
import Link from "next/link"
import React, { useEffect, useState, useTransition } from 'react'
import axios from "axios"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
    // const [isPending, startTransition] = useTransition();
    const [isPending, setPending] = useState(false);
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: '',
        username: ''
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const onSignUp = async () => {
        // startTransition(async () => {
        try {
            setPending(true);
            const response = await axios.post('/api/users/signup', user);
            console.log(response.data);
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setPending(false);
        }
        // })

    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])
    return (
        <div className="flex flex-col justify-center items-center p-5">
            <h1 className="text-4xl text-orange-400">{isPending ? "Processing" : "Register"}</h1>
            <div className="mt-5 flex justify-center flex-col gap-3">
                <div>
                    <label className="block text-center mt-2" htmlFor="username">username</label>
                    <input
                        className="p-2 text-black"
                        id="username"
                        placeholder="username"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                </div>
                <div>

                    <label className="block text-center" htmlFor="email">email</label>
                    <input
                        className="p-2 text-black"
                        id="email"
                        placeholder="email"
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
                        placeholder="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>

                <button
                    className="bg-orange-400 block mt-3 p-2 rounded disabled:cursor-not-allowed"
                    disabled={buttonDisabled}
                    onClick={onSignUp}
                >
                    Register
                </button>
                <p>Already Register? <Link className="text-orange-400" href={'/login'}>Login</Link></p>
            </div>
        </div>
    )
}