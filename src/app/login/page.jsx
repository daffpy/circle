import { login } from "../actions/actions"
import Link from "next/link"
import {listErrorLogin} from "@/scripts/utility"

export default async function LoginPage({searchParams}){
    let error = {};
    const sp = await searchParams
    const errorData = sp.error

    if (errorData !== undefined) {
        try {
            error = JSON.parse(decodeURIComponent(errorData));
            console.log(error)
        } catch (e) {
            console.error('Failed to parse error', e);
        }
    }



    return <div className="h-screen flex items-center justify-center">
        <div>
        <div className="text-center text-2xl">LOGIN</div>
        <form action={login} className="text-center mt-8">
            <div>
                <label className="block">Binusian Email</label>
                <textarea name="email" placeholder="@binus.ac.id" style={{resize: "none"}} className=" border p-2 h-10 mt-2 rounded-lg text-sm"></textarea>
                {//<label className="block mb-4 italic text-red-500">{error.email ? error.email : ""}</label>
                }
            </div>
            <div>
            <label className="block"> Password</label>
                <textarea name="password" style={{resize: "none"}} className="border p-2 h-10 mt-2 rounded-lg text-sm"></textarea>
            </div>
            {Object.entries(error).map(([field,e], idx) => (
                <div key={idx}>
                    {field}: {e}
                </div>
            ))}
            <button type="submit" className="cursor-pointer border p-2 mt-5 text-sm rounded-lg w-20 hover:bg-white hover:text-black">Submit</button>
            <Link href="/register">
                <div className="mt-5 italic">
                    Register instead?
                </div>
            </Link>
        </form>
        </div>
    </div>
}