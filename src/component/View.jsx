"use client"

import { joinGroup, leaveGroup } from "@/app/actions/actions"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MemberIcon, LocationIcon, LinkIcon } from "./Icon"

export default function ViewGroup({group, sessionData}){
    function userExists(userId) {
        return group.users.some(user => user.userId === userId);
    }
    const join = userExists(sessionData.id)

    return(
        <div  className="font-lexend tracking-tight border mt-2 mb-2 p-2 text-gray-900">
            <div>
                <div key={group.id}>
                    <div className="font-bold" >
                        {group.name}
                    </div>
                    <div>
                        {group.tags.map((t,idx)=>(
                            <div
                            className="font-semibold tracking-tighter bg-fuchsia-400 p-1 mt-2 w-fit rounded-xl mb-2"
                            key={idx}>
                                {t.tag.name}
                            </div>
                        ))}
                    </div>
                    <div className="py-1">
                        {group.desc}
                    </div>
                    <div className="flex items-center gap-x-2">
                        <div className="w-3 h-3">
                            <LocationIcon/>
                        </div>
                        <div>
                            {group.campus}
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <div className="w-3 h-3">
                            <LinkIcon/>
                        </div>
                        <a href={group.link} className="text-blue-600 underline">
                            {group.link}
                        </a>
                    </div>
                    
                    <div className="pt-5">Members:
                        {
                            group.users.map((m,i) => (
                                <div key={i} className="my-2 text-red-500">
                                    {m.user.name}
                                </div>
                            ) 
                            )
                        }
                    </div>
                    {!join ? (
                    <form action={joinGroup.bind(null, sessionData.id, group.id)} className="mt-5">
                        <button 
                        className="bg-black hover:bg-green-400 py-2 px-4 rounded-xl text-white"
                        type="submit">
                            Join
                        </button>
                    </form>):""
                    }
                    {join ? (
                    <form action={leaveGroup.bind(null, sessionData.id, group.id)} className="mt-5">
                        <button 
                        className="bg-black hover:bg-red-400 py-2 px-4 rounded-xl text-white"
                        type="submit">
                            Leave
                        </button>
                    </form>):""
                    }
                </div>
            </div>
        </div>
    )
}

export function DisplayGroup({group}){
    console.log(group)
    const router = useRouter()
    return(
        <div className="py-2 px-2 rounded-lg flex flex-row gap-x-4 items-center font-lexend tracking-tighter text-base font-semibold hover:bg-[#F08700]/30"
        onClick={() => router.push(`/group/${group.id}`)}
        >
            <Image width={100} height={100} src="/upbg.jpg" alt={group.id} className="border w-14 h-14 rounded-2xl hover:rounded-none flex items-center justify-center flex-shrink-0"/>
            <div className="flex w-full items-center justify-between gap-x-3">
                <div className="truncate lg:visible">
                    {group.name}
                </div>
                <div className="flex gap-x-3 collapse text-sm lg:visible bg-fuchsia-400/80 p-1.5 rounded-2xl">
                    {group.tags.map((m,idx) => (
                        <div key={idx}>{m.tag.name}</div>
                    ))}
                </div>

            </div>
    </div>
    )

}

export function DisplayBasicGroup({group, sessionData, join}){
    function userExists(userId) {
        return group.users.some(user => user.userId === userId);
    }
    join = userExists(sessionData.id)
    return(
        <div  className="border font-lexend tracking-tight text-sm rounded-lg mt-2 mb-2 p-2 text-gray-900 w-fit">
            <div>
                <div key={group.id}>
                    <div className="py-2 text-base font-bold">
                        {group.name}
                    </div>
                    <div>
                        {group.tags.map((t,idx)=>(
                            <div
                            className="font-semibold tracking-tighter bg-fuchsia-400 p-1 w-fit rounded-xl mb-2"
                            key={idx}>
                                {t.tag.name}
                            </div>
                        ))}
                    </div>
                    <div >
                        {group.desc}
                    </div>
                    <div className="flex items-center gap-x-2 py-2">
                        <div className="w-3 h-3">
                            <LocationIcon/>
                        </div>
                        <div>
                            {group.campus}
                        </div>
                        
                    </div>
                    <div className="flex items-center gap-x-2">
                        <div className="w-3 h-3">
                            <MemberIcon/>
                        </div>
                        <div>
                            {
                                group.users.length
                            }
                        </div>
                        
                        
                    </div>
                    {!join ? (
                    <form action={joinGroup.bind(null, sessionData.id, group.id)} className="mt-5">
                        <button type="submit">
                            Join
                        </button>
                    </form>):""
                    }
                </div>
            </div>
        </div>
    )
}