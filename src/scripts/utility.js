import prisma from "@/lib/db"

export async function getGroupData(where = null){
    const query = {
        include:{
            users:{
                include:{
                    user:true
                }
            },
            tags:{
                include:{
                    tag:true
                }
            }
        }
    }
    if(where){
        query.where = where
    }
    
    const data = await prisma.group.findMany(query)

    return data
}

export async function getGroupDataByID(id){
    const data = await prisma.user.findMany(
        {
            relationLoadStrategy: 'join',
            where:{
                id: id

            },
            include:{
                groups: {
                    include:{
                        group: {
                            include:{
                                users:{
                                    include:{
                                        user: true
                                    }
                                },
                                tags: {
                                    include:{
                                        tag: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    )
    return data
}

export async function getGroupDetailsById(id){
    const data = await prisma.group.findFirst({
        where: {
            id: id
        },
        include: {
            users: {
                include: {
                    user: true // this gets actual User data from the join table
                }
            },
            tags: {
                include:{
                    tag: true
                }
            }
        }
    })
    return data
}