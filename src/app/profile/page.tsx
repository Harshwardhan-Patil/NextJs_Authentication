'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast"

type User = {
    _id: string,
    username: string,
    email: string,
}

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    const logout = async () => {
        const toastId = toast.loading('Logging out');
        try {
            const response = await axios.get('/api/users/logout');
            if (response.data.status === 200) {
                toast.success("Logout Successfully");
                router.push('/login');
            } else {
                toast(response.data.message)
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
        console.log("Starting Fetching")
        const getData = async () => {
            try {
                const response = await axios.get('/api/users/me');
                console.log(response.data);
                setUser(response.data.data);
            } catch (error) {
                if (error instanceof Error)
                    throw new Error(error.message);
            }
        }
        getData();
    }, [user])

    return (
        <>
            <div>
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                />
            </div>
            <div className="w-screen h-screen flex-col flex justify-center items-center">
            <h1>Welcome to the profile</h1>
                <div className="w-[50vw]">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-100">Information</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-200">Personal details.</p>
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-200">Id</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-300 sm:col-span-2 sm:mt-0">{user?._id}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-200">Username </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-300 sm:col-span-2 sm:mt-0">{user?.username}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-200">Email address</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-300 sm:col-span-2 sm:mt-0">{user?.email}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-200">About</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-300 sm:col-span-2 sm:mt-0">
                                    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                                    qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                                    pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            <button
                    className="p-2 rounded-sm bg-cyan-500 mt-4 hover:bg-cyan-600"
                onClick={logout}
            >Logout</button>
        </div>
        </>
    )
}