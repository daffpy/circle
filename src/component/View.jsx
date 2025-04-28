import { retrieveSessionData } from "@/lib/session"
import prisma from "@/lib/db"

export default async function ViewGroup(){
    const data = await retrieveSessionData()
    const groups = await prisma.user.findMany(
        {
            relationLoadStrategy: 'join',
            where:{
                id: data.id

            },
            include:{
                groups: {
                    include:{
                        group: true
                    }
                }
            }
        }
    )

    return(
        <div>
            <div>
                
            </div>
            <div>
                {groups.map(user => (
                    <div key={user.id} className="">
                        {user.groups.map(link => (
                            <div key={link.groupId} className="border mt-2 mb-2 p-2">
                                {link.group.name}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}