import Link from "next/link";

const Page = () => {
  return (
    <div className="grid grid-cols-12 h-auto items-center bg-gray-100 py-5">
        <div className="col-start-2 col-span-10 md:col-start-3 md:col-end-10 lg:col-start-4 lg:col-end-9">
            <div className="bg-green-800 p-4 mb-3">
                <Link href="/" className='text-white font-bold text-xl'>
                PharmaTrace
                </Link>
            </div>

            <form className="flex flex-col bg-white p-8 rounded shadow-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Register a Company</h2>
                <div className="mb-4">
                    <label htmlFor="companyName" className="block text-gray-700 text-sm font-bold mb-2">
                    Company Name
                    </label>
                    <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                    placeholder="Enter the name of the company"
                    />
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
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                    <div className="flex items-center">
                    <label className="mr-4">
                        <input type="radio" name="role" value="manufacturer" className="mr-1 accent-green-600" />
                        Manufacturer
                    </label>
                    <label className="mr-4">
                        <input type="radio" name="role" value="distributor" className="mr-1 accent-green-600" />
                        Distributor
                    </label>
                    <label>
                        <input type="radio" name="role" value="retailer" className="mr-1 accent-green-600" />
                        Retailer
                    </label>
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
                    placeholder="Choose a username"
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
                    <Link href="/signup" className="text-green-800 underline">Register as a user</Link>
                </p>
            </form>
        </div>
    </div>
  );
};

export default Page;