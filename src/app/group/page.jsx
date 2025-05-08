import { retrieveSessionData } from "@/lib/session"
import ViewGroup from "@/component/View"
import {getGroupData} from "@/scripts/utility"

export default async function GroupPage(){
    const data = await retrieveSessionData()

    const groups = await getGroupData()
    
    return <div className="h-screen flex items-center justify-center">
        <div className="grid grid-cols-3 gap-3 items-stretch">
            {groups.map((g,idx) => (
                <ViewGroup key={idx} group={g} join={true} sessionData={data}/>

            ))}
        </div>
    </div>
}