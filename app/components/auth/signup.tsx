"use client"

import Link from "next/link";
import { processSignup } from "@/lib/action";
import { useFormState } from "react-dom";

const SignUpForm = () => {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(processSignup, initialState)

    return(
        <form action={dispatch} className="flex flex-col bg-white p-8 rounded shadow-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
            <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                First Name
                </label>
                <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                placeholder="Enter your first name"
                />
                <div>
                    {state.errors?.firstName &&
                    state.errors.firstName.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
                </label>
                <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                placeholder="Enter your last name"
                />
                <div>
                    {state.errors?.lastName &&
                    state.errors.lastName.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="dob" className="block text-gray-700 text-sm font-bold mb-2">
                Date of Birth
                </label>
                <input
                type="date"
                id="dob"
                name="dob"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                />
                <div>
                    {state.errors?.dob &&
                    state.errors.dob.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
                </label>
                <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                placeholder="Enter your email"
                />
                <div>
                    {state.errors?.email &&
                    state.errors.email.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                Phone
                </label>
                <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                placeholder="Enter your phone number"
                />
                <div>
                    {state.errors?.phone &&
                    state.errors.phone.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                Address
                </label>
                <textarea
                id="address"
                name="address"
                rows={3}
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                placeholder="Enter your address"
                ></textarea>
                <div>
                    {state.errors?.address &&
                    state.errors.address.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-800"
                    placeholder="Enter your username"
                />
                <div>
                    {state.errors?.username &&
                    state.errors.username.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                    placeholder="Enter your password"
                />
                <div>
                {state.errors?.password &&
                    state.errors.password.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                    </p>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confPassword"
                    name="confPassword"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                    placeholder="Confirm your password"
                />
                <div>
                    {state.errors?.confPassword &&
                    state.errors.confPassword.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <button
            className="bg-green-800 text-white py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
            type="submit"
            >
            Register
            </button>

            <p className="mt-4 text-sm text-gray-600">
                Already have an account?   
                <Link href="/signin" className="text-green-800 underline">Sign in</Link>
            </p>

            <p className="mt-4 text-sm text-gray-600">
                <Link href="/registercompany" className="text-green-800 underline">Register a company</Link>
            </p>
        </form>
    )
}

export default SignUpForm;