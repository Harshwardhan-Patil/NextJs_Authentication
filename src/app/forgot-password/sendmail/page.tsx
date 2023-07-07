'use client'
import axios from 'axios';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';


export default function SendMail() {
    const [email, setEmail] = useState('');

    async function handleEmail() {
        const toastId = toast.loading('Sending');
        try {
            const response = await axios.post('/api/users/sendmail', { email })
            if (response.data.status === 200) {
                toast.success("Please check your email.", { duration: 60000 });
            } else {
                toast(response.data.message);
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                console.log(error.message)
            }
        } finally {
            toast.remove(toastId);
        }
    }

    return (
        <>
            <div><Toaster
                position="bottom-right"
                reverseOrder={false}
            /></div >
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">
                        Send Email
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={email.length <= 0}
                                onClick={handleEmail}
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}