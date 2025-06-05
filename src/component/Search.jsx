"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { SearchGroupIcon } from "./Icon"
import ViewGroup from "@/component/View"

export default function SearchForm({groups,tag, sessionData}){
    return(
        <div>
            <form action="/group/search" method="get" className="mt-8">
                <div>
                <label className="block">Search by Tag</label>
                <textarea
                    style={{resize:"none"}}
                    type="text"
                    name="search"
                    className="border p-2 h-10 mt-2 rounded-lg text-sm"
                />
                </div>
                <button type="submit" className="cursor-pointer border p-2 mt-4 mb-10 rounded-lg w-20 hover:bg-white hover:text-black">
                    Search
                </button>
            </form>
            <div className="">
                {groups?.length > 0 ? (
                    groups.map((group, idx) => (
                    <ViewGroup
                        key={idx}
                        group={group}
                        sessionData={sessionData}
                        join={true}
                    />
                    ))
                ) : (
                    <p>No groups found for: <strong>{tag}</strong></p>
                )}
            </div>

        </div>
    )
}

export function SearchChoice(){
    const [open, setOpen] = useState(false)
    const router = useRouter()
    
    return(
        <>
        <div className="">
        <button
        onClick={() => setOpen(true)}
        className="stroke-black w-5 h-5"
        >
        <SearchGroupIcon/>
        </button></div>
        {open && (
        <div className="fixed inset-0 text-white z-50 backdrop-blur-xs bg-black/20 flex items-center justify-center">
            <div className="bg-white w-1/3 rounded-lg">
                <div className="flex-col p-6 font-lexend tracking-tighter text-[15px]">
                    <div className="text-black py-4 font-archivo font-bold tracking-tighter text-3xl">
                        How do you want to search?
                    </div>

                    <div className="bg-amber-500 text-center p-3 mb-3"
                    onClick={() => router.push("/group/search")}
                    >
                        via Tag
                    </div>
                    <div
                    onClick={() => router.push("/group")}
                    className="bg-fuchsia-400 text-center p-3">
                        View All
                    </div>

                    <div
                    className="p-3 mt-3 w-18 rounded-xl bg-red-500 text-white"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </div>
                </div>
            </div>
            
            
            
        </div>


        )}
        
        </>
    )
}