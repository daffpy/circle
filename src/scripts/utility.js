export async function getGroupData(where = null){
    const query = {
        include:{
            users:{
                include:{
                    user:true
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