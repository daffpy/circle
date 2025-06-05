
import Link from 'next/link';

import Image from 'next/image';

export default function NewNavbar() {
    return(
        <nav className='absolute bg-white text-gray-900 top-0 left-0 flex w-full h-16 z-50 font-lexend text-base lg:text-lg items-center px-10 justify-between'>
            <Link href="/" className='bg-white px-5 py-1 hover:italic'>
                Circle
            </Link>
            <div className='flex items-center justify-between gap-8 '>
                <Link href="/register" className='bg-white px-5 py-1 hover:italic'>
                    Sign up
                </Link>
                <Link href="/login" className='bg-white px-5 py-1 hover:italic'>
                    Sign in
                </Link>
            </div>
        </nav>

    )
}