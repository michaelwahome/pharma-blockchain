import Link from "next/link";

const Page = () => {
  return (
    <div className="grid grid-cols-12 h-screen items-center bg-gray-100">
        <div className="col-start-2 col-span-10 md:col-start-3 md:col-end-10 lg:col-start-4 lg:col-end-9">
            <div className="bg-green-800 p-4 mb-3">
                <Link href="/" className='text-white font-bold text-xl'>
                PharmaTrace
                </Link>
            </div>

            <form className="flex flex-col bg-white p-8 rounded shadow-md w-full">
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

                <button
                className="bg-green-800 text-white py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                type="submit"
                >
                Login
                </button>

                <p className="mt-4 text-sm text-gray-600">
                    Don't have an account?   
                    <Link href="/signup" className="text-green-800 underline">Sign up</Link>
                </p>
            </form>
        </div>
    </div>
  );
};

export default Page;