import ViewGroup from "@/component/View"
import { retrieveSessionData } from "@/lib/session"
import { getGroupDetailsById } from "@/scripts/utility"


export default async function ViewGroupDetailPage({ params }){
    const { slug } = await params
    const data = await retrieveSessionData()
    const group = await getGroupDetailsById(parseInt(slug))
    return (
    <div className="h-screen flex items-center justify-center">
        <ViewGroup sessionData={data} group={group} join={false}></ViewGroup>
    </div>)
}