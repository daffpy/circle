"use server"

import prisma from "@/lib/db"
import { createSession, decrypt } from "@/lib/session"
import { redirect } from 'next/navigation'

export async function login(params) {
    const user = await prisma.user.findUnique({
        where:{
            email: params.get("email")
        }
    })

    await createSession(user.id)

    redirect('/')

    
}

export async function register(params){
    await prisma.user.create({
        data:{
            name: params.get("name"),
            email: params.get("email"),
            password: params.get("password")
        }
    })

    redirect('/login')
}

export async function createGroup(params){
    await prisma.$transaction(async (prisma) => {
        const newGroup = await prisma.group.create({
          data: {
            name: params.get('name'),
            desc: params.get('desc')
          },
        });
      
        await prisma.userGroup.create({
          data: {
            userId: parseInt(params.get('id')),
            groupId: newGroup.id,
          },
        });
      
        return newGroup;
    });
}

export async function joinGroup(uid,gid){
  await prisma.userGroup.create({
    data:{
      userId: uid,
      groupId: gid
    }
  })
}