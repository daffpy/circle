

import { retrieveSessionData } from "@/lib/session";
import Link from "next/link";
import { endSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { CreateForm } from "@/component/Form";
import { SearchChoice } from "@/component/Search";
import {ViewGroup, DisplayGroup} from "@/component/View";
import { getGroupDataByID } from "@/scripts/utility"
import { SearchGroupIcon, ProfileIcon, DMIcon } from "@/component/Icon";


export default async function Home() {
  const data = await retrieveSessionData()
  if(data == null){
    return redirect("/login")
  }
  const groups = await getGroupDataByID(data.id)

  return (
    <div className="flex flex-row h-screen">
        
    
        <div className="z-1 text-black bg-[#FAF9F6] w-1/3 pt-0 h-screen">
        <div className="flex-col flex gap-y-5 h-full">
            <div className="border-b border-b-gray-900 ">
            <div className="px-5">
                <div className="py-5 flex gap-y-5 flex-col lg:flex-row items-center justify-between">
                    <div className="font-pacifico font-bold text-xl text-[#F08700]">
                        Circle
                    </div>
                    <div className=" flex flex-row items-center gap-x-5">
                        <div>
                            <SearchChoice/>
                        </div>
                        <div className="w-5 h-5 stroke-2">
                            <DMIcon strokeWidth={3}/>
                        </div>

                    </div>
                    
                </div>
            </div>
            </div>
            <div className="!grow">
                {groups?.map(user => 
                        <div key={user.id} className=" px-4 flex overflow-y-auto flex-col gap-y-2">
                            {user.groups?.map((g,idx) =>(
                                <DisplayGroup key={idx} group={g.group} 
                                />
                            ))}
                        </div>
                    )}
                 <CreateForm sessionData={data}/>
            </div>
            <div className=" border-t p-5 border-t-gray-900 flex flex-row justify-between font-lexend tracking-tight">
                <div className="flex gap-x-3">
                <div className="w-6 h-6">
                    <ProfileIcon/>
                </div>
                <label>{data.name}</label>
                </div>
            </div>

        </div>

        </div>
        <div className="font-lexend border-l border-l-gray-900 bg-[#FAF9F6] tracking-tighter w-2/3 h-screen  flex items-center justify-center">
        <div className="z-1">
        
        </div>
        </div>
    </div>
  );
}