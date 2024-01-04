import { signOut } from "@/auth";
import Link from "next/link";

const SideNav = () => {
    return(
        <div className="bg-green-800 grid grid-rows-12 h-full text-white p-4">
            <div className="mb-4">
                <Link href="/user" className='text-white font-bold text-xl'>
                    PharmaTrace
                </Link>
            </div>

            <div className="row-start-3 flex flex-col mb-8">
                <Link href="#" className='my-2'>
                    Search for Product
                </Link>
                <Link href="#" className='my-2'>
                    Manage Account
                </Link>
            </div>

            <form
                action={async () => {
                    'use server';
                    await signOut();
                }}
                className="row-start-11 text-white"
            >   
                <button>Sign Out</button>
            </form>
        </div>
    )
}

export default SideNav;