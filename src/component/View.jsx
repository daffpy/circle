import { joinGroup } from "@/app/actions/actions"

export default async function ViewGroup({group, sessionData, join}){
    
    return(
        <div  className="border mt-2 mb-2 p-2">
            <div>
                <div key={group.id}>
                    <div >
                        {group.name}
                    </div>
                    <div>Members:
                        {
                            group.users.map((m,i) => (
                                <div key={i} className="my-2 text-red-500">
                                    {m.user.name}
                                </div>
                            ) 
                            )
                        }
                    </div>
                    {join ? (
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
