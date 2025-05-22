"use server"

import prisma from "@/lib/db"
import { createSession, decrypt } from "@/lib/session"
import { redirect } from 'next/navigation'

export async function login(params) {

  const email = params.get("email")
  const pw = params.get("password")

  let errorObj = {}

  if(!email.includes("@binus.ac.id")){
    errorObj.email = "email must be a binusian email (@binus.ac.id)"
  }
  if(pw.length > 20){
    errorObj.password = "password must be under 20"
  }

  console.log(errorObj)


  if(errorObj != {}){
    const encodedErrors = encodeURIComponent(JSON.stringify(errorObj));
    redirect (`/login?error=${encodedErrors}`);
  }


    const user = await prisma.user.findUnique({
        where:{
            email: email

        }
    })

    await createSession(user.id)

    redirect('/')

    
}

export async function register(params){

  const name = params.get("name");
  const email = params.get("email");
  const pw = params.get("password");

  let errorObj = {};

  if (!name || name.trim() === ""){
    errorObj.name = "name is required";
  }
  if (!email.includes("@binus.ac.id")){
    errorObj.email = "email must be a binusian email (@binus.ac.id)";
  }
  if (pw.length > 20){
    errorObj.password = "password must be under 20 characters";
  }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser){
      errorObj.email = "email already registered";
    }

    console.log(errorObj);

    if (Object.keys(errorObj). length !== 0){
      const encodedErrors = encodeURIComponent(JSON.stringify(errorObj));
      redirect(`/register?error=${encodedErrors}`);
    }

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
