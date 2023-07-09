'use client'
import Link from "next/link"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "react-hot-toast"

export default function SignUpPage() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        username: ''
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const onSignUp = async () => {
        const toastId = toast.loading('Please wait while Registering')
        try {
            const response = await axios.post('/api/users/signup', user);
            if (response.status === 200) {
                toast.success("Please check your email to verify your email address.", { duration: 6000 });
            } else {
                toast.error(response.data.message);
            }
        } catch (error: any) {
            if (error instanceof Error) {
                toast.error(error.message);
                console.log(error.message);
            }
        } finally {
            toast.remove(toastId);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])
    return (
        <>
            <div>
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                />
            </div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">
                        Register
                    </h2>
                </div>

                <div className="mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-200">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={user.username}
                                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-200">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-200">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={buttonDisabled}
                                onClick={onSignUp}
                            >
                                Register
                        </button>
                    <p className="mt-4">Already Register? <Link className="text-indigo-600" href={'/login'}>Login</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}