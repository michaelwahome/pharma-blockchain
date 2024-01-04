"use client"

import Link from "next/link";
import { authenticate} from "@/lib/action";
import { useFormState, useFormStatus } from "react-dom";

const SignInForm = () =>{
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return(
        <form action={dispatch} className="flex flex-col bg-white p-8 rounded shadow-md w-full">
                <h1 className="text-2xl font-bold mb-4 -mt-4 text-center">
                  Welcome back!
                </h1>
                <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>

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
                </div>

                <SignInButton />

                <div className="flex h-8 items-end space-x-1">
                    {errorMessage && (
                        <>
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        </>
                    )}
                </div>

                <p className="mt-4 text-sm text-gray-600">
                    Don't have an account?   
                    <Link href="/signup" className="text-green-800 underline">Sign up</Link>
                </p>
            </form>
    )
}

function SignInButton() {
    const { pending } = useFormStatus();
   
    return (
      <button className="bg-green-800 text-white py-2 px-4 rounded-full hover:bg-green-600 
      focus:outline-none focus:ring focus:border-green-300 aria-disabled:cursor-not-allowed
      aria-disabled:opacity-50"
      type="submit"
      aria-disabled={pending}
      >
        Login
      </button>
    );
}

export default SignInForm;