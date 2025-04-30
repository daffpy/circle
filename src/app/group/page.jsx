import { retrieveSessionData } from "@/lib/session"
import prisma from "@/lib/db"
import {joinGroup} from "@/app/actions/actions"

export default async function GroupPage(){
    const data = await retrieveSessionData()

    const members = await prisma.userGroup.findMany({
        include:{
            user: true
        }
    })

    console.log(members)


    const groups = await prisma.group.findMany()
    
    return <div className="h-screen flex items-center justify-center">
        <div>
        {groups.map((idx, i) => 
            (
                <div key={idx.id} className="border p-2 my-2">
                    <div className="">
                        {idx.name}
                    </div>
                    <div className="my-4">
                        {idx.desc}
                    </div>
                    <div>Members:
                        {
                            //array tutorial: https://www.youtube.com/watch?v=PojpwEbOQJg
                            //filter the query
                            members.filter((m) =>
                                m.groupId == idx.id
                            ).map((m,i) => ( //loop the query
                                <div key={i} className="my-2 text-red-500">
                                    {m.user.name}
                                </div>
                            ) 
                            )
                        }
                    </div>
                    <form action={joinGroup.bind(null, data.id, idx.id)} className="mt-5">
                        <button type="submit">
                            Join
                        </button>
                    </form>
                </div>

            )
        )}
        </div>
    </div>
}