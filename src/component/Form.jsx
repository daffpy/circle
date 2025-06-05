'use client'
import { useState } from "react";
import { createGroup } from "@/app/actions/actions";
import { retrieveSessionData } from "@/lib/session";

export default async function LoginFormWrapper() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formAction = e.target.action;
        console.log('Form action:', formAction);
    };

    return (

        <form onSubmit={handleSubmit} action={login} className="text-center mt-8">
            <div>
                <label className="block">Binusian Email</label>
                <textarea name="email" placeholder="@binus.ac.id" style={{ resize: "none" }} className=" border p-2 h-10 mt-2 rounded-lg text-sm"></textarea>
            </div>
            <div>
                <label className="block"> Password</label>
                <textarea name="password" style={{ resize: "none" }} className="border p-2 h-10 mt-2 rounded-lg text-sm"></textarea>
            </div>
            <button type="submit" className="cursor-pointer border p-2 mt-5 text-sm rounded-lg w-20 hover:bg-white hover:text-black">Submit</button>
            <Link href="/register">
                <div className="mt-5 italic">
                    Register instead?
                </div>
            </Link>
        </form>)

}

export function CreateForm({sessionData}){
    const [open, setOpen] = useState(false)
    const data = sessionData
    
    return(
        <>
        <div className="px-5 py-3">
        <button
        onClick={() => setOpen(true)}
        className="text-white text-[15px] font-lexend tracking-tight bg-[#F08700] w-full py-2 rounded-lg hover:bg-orange-600"
      >
        Create Group
      </button></div>
      {open && (
        <div className="fixed inset-0 z-50 backdrop-blur-xs bg-black/20 flex items-center justify-center">
            <div className="bg-white border border-gray-900 p-10 rounded-lg z-50 w-[70%] max-w-xl">
                <div className="text-center text-4xl py-2 mb-2 font-archivo font-bold tracking-tighter text-black">Create Group</div>
                <form action={createGroup} className="text-center text-gray-600 font-lexend tracking-tight text-sm">
                    <div>
                        <label className="block">Group Name</label>
                        <textarea name="name" style={{ resize: "none" }} className="border p-2 h-10 mt-2 rounded-lg text-sm" />
                    </div>
                    <div>
                        <label className="block">Group Description</label>
                        <textarea name="desc" style={{ resize: "none" }} className="border p-2 h-10 mt-2 rounded-lg text-sm" />
                    </div>
                    <div className="py-3">
                        <label className="block pb-2">Campus Location</label>
                        <select name="campus" className="border rounded-lg p-2.5">
                            <option value="syahdan">Syahdan Campus</option>
                            <option value="anggrek">Anggrek Campus</option>
                            <option value="kijang">Kijang Campus</option>
                        </select>
                    </div>
                    <div>
                        <label className="block">Add Tag</label>
                        <textarea name="tag" style={{ resize: "none" }} className="border p-2 h-10 mt-2 rounded-lg text-sm" />
                    </div>
                    <div>
                        <label className="block">Group Chat Link</label>
                        <textarea name="link" style={{ resize: "none" }} className="border p-2 h-10 mt-2 rounded-lg text-sm" />
                    </div>
                    <div>
                        <label className="block">Owner ID</label>
                        <textarea
                            readOnly={true}
                            name="id"
                            defaultValue={data.id}
                            style={{ resize: "none", outline: "none" }}
                            className="border p-2 h-10 mt-2 rounded-lg text-sm text-gray-400"
                        />
                    </div>
                    {/* {Object.entries(error).map(([field,e], idx) => (
                        <div key={idx}>
                            {field}: {e}
                        </div>
                    ))} */}
                    <div className="gap-x-5 flex justify-center">
                        <button
                        onClick={() => setOpen(false)}
                        className="bg-red-500 text-white cursor-pointer border p-2 mt-10 text-sm rounded-lg w-20 hover:bg-white hover:text-black">
                        Cancel
                    </button>
                    <button type="submit" className="cursor-pointer border p-2 mt-10 text-sm rounded-lg w-20 hover:bg-white hover:text-black">
                        Submit
                    </button>

                    </div>
                </form>
            </div>
        </div>


      )}
        
        </>
    )
}