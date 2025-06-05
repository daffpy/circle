import { retrieveSessionData } from "@/lib/session"
import { DisplayBasicGroup } from "@/component/View"
import {getGroupData} from "@/scripts/utility"

export default async function GroupPage(){
    const data = await retrieveSessionData()

    const groups = await getGroupData()
    
    return <div className="h-screen flex items-center justify-center">
        <div className="flex gap-x-5">
            {groups.map((g,idx) => (
                <DisplayBasicGroup key={idx} group={g} sessionData={data}/>

            ))}
        </div>
    </div>
}