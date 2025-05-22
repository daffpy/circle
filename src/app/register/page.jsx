import { register } from "@/app/actions/actions";
import Link from "next/link";

export default async function RegisterPage({ searchParams }) {
    let error = {};
    const sp = await searchParams
    const errorData = sp.error

    if (errorData !== undefined) {
        try {
            error = JSON.parse(decodeURIComponent(errorData));
            console.log(error);
        } catch (e) {
            console.error("Failed to parse error", e);
        }
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div>
                <div className="text-center text-2xl">Register</div>
                <form action={register} className="text-center mt-8">
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
                        <textarea name="password" style={{ resize: "none" }} className="border p-2 h-10 mt-2 rounded-lg text-sm" />
                    </div>
                    {Object.entries(error).map(([field,e], idx) => (
                        <div key={idx}>
                            {field}: {e}
                        </div>
                    ))}
                    <button type="submit" className="cursor-pointer border p-2 mt-10 text-sm rounded-lg w-20 hover:bg-white hover:text-black">
                        Submit
                    </button>
                    <Link href="/login">
                        <div className="mt-5 italic">Already have an account?</div>
                    </Link>
                </form>
            </div>
        </div>
    );
}
