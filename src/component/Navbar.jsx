'use client'; // if using App Router and you want interactivity (like toggling)
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const router = useRouter()
    const currentPath = router.pathname
    const [nav,setNav] = useState(false)
    const [scrollDir, setScrollDir] = useState("top");

    useEffect(() => {
        const threshold = 120;
        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const updateScrollDir = () => {
        const scrollY = window.pageYOffset;

        if (Math.abs(scrollY - lastScrollY) < threshold) {
            ticking = false;
            return;
        }
        const curr = window.pageYOffset;
        if(curr <= threshold){
            setScrollDir('top')
        }else if(curr > threshold){
            setScrollDir(scrollY > lastScrollY ? "down" : "up");
        }

        lastScrollY = scrollY > 0 ? scrollY : 0;
        ticking = false;
        };

        const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollDir);
            ticking = true;
        }
        };

        window.addEventListener("scroll", onScroll);

        //console.log(scrollY, scrollDir);

        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollDir]);

    const handleNav = () => {
        setNav(!nav)
    }
    return(
        <div>
            <div className={"w-full backdrop-blur-[4px] z-[1] ease-in-out fixed duration-200 top-0 inset-x-0 mx-auto" +
                            /*(scrollDir == 'top' ? '' : '') +*/
                            (scrollDir == 'down' ? ' translate-y-[-100%]' : '') + 
                            (scrollDir == 'up' ? ' translate-y-[0%] pt-0': '')}>   
                <div className={" flex justify-between items-center bg-white/50 px-1 pb-1 dark:bg-[#0E1116]/50"
                                + ((scrollDir == 'top' ? ' pt-5' : ''))}>
                    {currentPath === '/' ? (
                        <div className="flex mt-1">
                        <div className="ml-2 md:ml-0">
                            <Image width={100} height={100} src={"@/public/assets/icons/logoCircle.png"}/>
                        </div>
                        <div className="text-xl mt-2.5 underline">
                            Circle
                        </div>
                        </div>
                    ):(
                        <Link href='/'>
                        <div className="flex mt-1">
                        <div className="ml-2 md:ml-0">
                            <Image width={50} height={50} alt='pic' src="/logoCircle.png"/>
                        </div>
                        <div className="text-xl mt-2.5 underline">
                            Circle
                        </div>
                        </div>
                        </Link>

                    )}
                    <div className={"mr-4 md:mr-4 lg:mr-0 mt-2 text-slate-100"}>
                        Themetoggler
                    </div>
                </div>
            </div>
            <div className={nav ? "md:hidden fixed right-0 top-0 w-[65%] sm:w-[50%] md:w-[45%] h-screen bg-black p-10 ease-in duration-300 opacity-[.9] font-[STUSSY] z-[2]" : 'fixed right-[-100%] duration-400'}>
                <button onClick={handleNav} className="group border px-4 py-1 rounded-tl-[90%] rounded-tr-[50%] rounded-br-[75%] rounded-bl-[50%] hover:animate-pulse">
                    <div className=" text-[24px]">
                        x
                    </div>
                </button>
                <div className="mt-[100px] text-center">
                    <ul className="py-6">
                            {currentPath === '/guestbook' ?(
                                <span>
                                    <div className=" before:block before:absolute before:-inset-1 before:-skew-y-6 before:bg-[#e60067] relative inline-block">
                                    <li className="text-lg relative text-white">Guestbook</li></div>
                                </span>

                            ):(
                                <Link href='/guestbook'>
                                    <div className="group text-center inline-block  text-lg">
                                    <li className="group-hover:bg-[length:100%_100%] p-2 marker marker--mark">Guestbook</li></div>
                                </Link>
                            )}
                    </ul>
                    <ul className="py-6">
                            {currentPath === '/blog' ?(
                                <div className=" before:block before:absolute before:-inset-1 before:-skew-y-6 before:bg-[#e60067] relative inline-block">
                                    <li className="text-lg relative text-white">Blog</li></div>

                            ):(
                                <Link href='/blog'>
                                    <div className="group text-center inline-block  text-lg">
                                    <li className="group-hover:bg-[length:100%_100%] p-2 marker marker--mark">Blog</li></div>
                                </Link>
                            )}
                    </ul>
                </div>
                <div className="text-[#cbd5e0] absolute bottom-20">
                    @DAFfXcx
                </div>
            </div>
        </div>

    )
}