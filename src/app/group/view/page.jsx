import ViewGroup from "@/component/View"
import { retrieveSessionData } from "@/lib/session"
import { getGroupDataByID } from "@/scripts/utility"


export default async function ViewGroupPage(){
    const data = await retrieveSessionData()
    const groups = await getGroupDataByID(data.id)
    return <div className="h-screen flex items-center justify-center">
        <div>
        <div className="text-center text-2xl">Group</div>
        {groups?.map(user => (
            <div key={user.id}>
                {user.groups?.map((g,idx) =>(
                    <ViewGroup key={idx} sessionData={data} group={g.group} join={false}></ViewGroup>
                ))}
            </div>
        ))}
        </div>
    </div>
}