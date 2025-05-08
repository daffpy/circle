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
        let tag = await prisma.tag.findFirst({
          where:{
            name: params.get('tag')
          }
        })
        if(tag === null){
          tag = await prisma.tag.create({
            data:{
              name: params.get('tag')
            }
          })
        }
        
        const newGroup = await prisma.group.create({
          data: {
            name: params.get('name'),
            desc: params.get('desc'),
          },
        });
      
        await prisma.userGroup.create({
          data: {
            userId: parseInt(params.get('id')),
            groupId: newGroup.id,
          },
        });

        await prisma.tagGroup.create({
          data:{
            tagId: tag.id,
            groupId: newGroup.id
          }
        })
      
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

export async function searchGroup(tagName) {
  const tag = await prisma.tag.findFirst({
    where: {
      name: tagName
    }
  });

  if (!tag) {
    return null;
  }

  const tagGroups = await prisma.tagGroup.findMany({
    where: {
      tagId: tag.id
    },
    include: {
      group: {
        include: {
          users: {
            include: {
              user: true
            }
          }
        }
      }
    }
  });

  return tagGroups.map(tg => tg.group);
}
