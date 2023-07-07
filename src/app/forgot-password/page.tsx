'use client'

import axios from "axios";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

export default function ForgotPassword() {
    const router = useRouter();
    const [user, setUser] = useState({
        password: '',
        confirmPassword: ''
    })
    const [token, setToken] = useState('');


    async function handlePassword() {
        const toastId = toast.loading('Changing Password');
        try {
            const response = await axios.post('/api/users/forgot-password', { password: user.password, token });
            console.log(response.data);
            if (response.data.status === 200) {
                toast.success('Password Changed Successfully');
                router.push('/login');
            } else {
                toast(response.data.message);
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                console.log(error.message);
            }
        } finally {
            toast.remove(toastId);
        }
    }

    useEffect(() => {
        const urlToken = location.search.split('=')[1];
        setToken(urlToken);
    }, [])

    return (
        <>
            <div><Toaster
                position="bottom-right"
                reverseOrder={false}
            /></div >
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">
                        Change Password
                    </h2>
                </div>

                <div className="mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-200">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-200">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="confirmPassword"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={user.confirmPassword}
                                    onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer disabled:cursor-not-allowed focus-visible:outline-indigo-600"
                                disabled={user.password.length <= 0 && user.confirmPassword.length <= 0}
                                onClick={handlePassword}
                            >
                                Change Password
                            </button>
                    </div>
                </div>
            </div>
        </>
    )
}