import { register } from "@/app/actions/actions";
import Link from "next/link";

export default async function RegisterPage({ searchParams }) {
    let error = {};
    const sp = await searchParams
    const errorData = sp.error

    if (errorData !== undefined) {
        try {
            error = JSON.parse(decodeURIComponent(errorData));
        } catch (e) {
            console.error("Failed to parse error", e);
        }
    }

    return (
        <div className="flex flex-col lg:flex-row h-screen">

        <div className="z-1 bg-[#FAF9F6] w-full lg:w-2/3 h-2/5 pt-20 lg:pt-0 lg:h-screen flex-col flex items-center justify-center">
            
            <div className="z-1">
                <div className="font-pacifico text-6xl lg:text-8xl text-[#F08700]">Circle</div>

            </div>
            <div className="mt-5 z-1 text-2xl lg:text-5xl px-10 font-bold tracking-tighter text-gray-900 font-archivo">
                <div>Find your real ones.</div>

            </div>

        </div>
        <div className="font-lexend border-t border-l-0 border-t-gray-900 lg:border-t-0 lg:border-l lg:border-l-gray-900 bg-[#FAF9F6] tracking-tighter w-full lg:w-1/3 h-3/5 lg:h-screen  flex items-center justify-center">
        <div className="z-1">
        <div className="text-center font-archivo tracking-tighter font-bold  text-4xl text-[#F08700]">Register</div>
        <form action={register} className="font-lexend text-gray-900 tracking-tighter text-center mt-8">
            <div>
                <label className="block">Name</label>
                <textarea name="name" placeholder="" style={{ resize: "none" }} className="border p-2 h-10 mt-2 rounded-lg text-sm" />
            </div>
            <div>
                <label className="block">Binusian Email</label>
                <textarea name="email" placeholder="@binus.ac.id" style={{ resize: "none" }} className="border p-2 h-10 mt-2 rounded-lg text-sm" />
            </div>
            <div>
                <label className="block">Password</label>
                <input name="password" type="password" style={{ resize: "none" }} className="border p-2 h-10 mt-2 rounded-lg text-sm" />
            </div>
            <div className="font-lexend text-left tracking-tighter mt-2 text-red-600 italic px-6">
            {Object.entries(error).map(([field,e], idx) => (
                <div key={idx}>
                    {field}: {e}
                </div>
            ))}
            </div>
            <button type="submit" className="cursor-pointer border p-2 mt-10 text-sm rounded-lg w-20 hover:bg-white hover:text-black">
                Submit
            </button>
            <Link href="/login">
                <div className="mt-5 italic">Already have an account?</div>
            </Link>
        </form>
        </div>
        </div>
    </div>
    );
}

