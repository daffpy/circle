
import Link from "next/link";
import NewNavbar from "@/component/NewNavbar";

export default async function Main() {
  return (
    <div>
      <NewNavbar/>
    <div className="relative flex flex-col lg:flex-row h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className=" absolute inset-0 bg-top bg-cover scale-100 z-0"
        style={{ backgroundImage: "url('/newbg.jpg')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-purple-700/10 z-0" />

      {/* Content Layer */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center text-center">
        <div className=" mt-5 text-5xl lg:text-8xl tracking-tighter px-10 font-archivo font-bold">
          <div className="text-yellow-300 drop-shadow-lg drop-shadow-black/60 ">
            Find your real ones.

          </div>
        </div>
        <div className="flex flex-row gap-x-3">
          <Link href="/register" className=" rounded-3xl py-2 px-3 lg:py-3 lg:px-4 mt-10 text-sm lg:text-base font-lexend text-gray-900 bg-white">
          Create Account
          </Link>
          <Link href="/home" className=" rounded-3xl py-2 px-3 lg:py-3 lg:px-4 mt-10 text-sm lg:text-base font-lexend text-gray-900 bg-white">
          Open Circle
          </Link>

        </div>
    
      </div>
    </div>
    </div>
    )
}
