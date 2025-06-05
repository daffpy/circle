"use server"

import prisma from "@/lib/db"
import { createSession, decrypt } from "@/lib/session"
import { redirect } from 'next/navigation'

export async function login(params) {
  const email = params.get("email");
  const pw = params.get("password");

  let errorObj = {};

  if (!email.includes("@binus.ac.id")) {
    errorObj.email = "email must be a binusian email (@binus.ac.id)";
  }

  if (!email) {
  errorObj.email = "email is required";
} else if (!email.includes("@binus.ac.id")) {
  errorObj.email = "email must be a binusian email (@binus.ac.id)";
}

  if (pw.length > 20) {
    errorObj.password = "password must be under 20 characters";
  }

  if (!pw) {
  errorObj.password = "password is required";
  } else if (pw.length > 20) {
  errorObj.password = "password must be under 20 characters";
  }

  if (Object.keys(errorObj).length !== 0) {
    const encodedErrors = encodeURIComponent(JSON.stringify(errorObj));
    return redirect(`/login?error=${encodedErrors}`);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (!user) {
    const encodedErrors = encodeURIComponent(
      JSON.stringify({ email: "User not found" })
    );
    return redirect(`/login?error=${encodedErrors}`);
  }

  await createSession(user.id);
  return redirect('/home');
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

export async function createGroup(params) {
  const name = params.get("name");
  const desc = params.get("desc");
  const tag = params.get("tag");
  const campus = params.get("campus");
  const link = params.get("link");
  const userId = params.get("id");

  let errorObj = {};

  if (!name || name.trim() === "") {
    errorObj.name = "Group name is required";
  }

  if (!desc || desc.trim().length < 10) {
    errorObj.desc = "Description must be at least 10 characters";
  }

  if (!tag || tag.trim() === "") {
    errorObj.tag = "Tag is required";
  }

  if (Object.keys(errorObj).length > 0) {
    const encodedErrors = encodeURIComponent(JSON.stringify(errorObj));
    return redirect(`/group/create?error=${encodedErrors}`);
  }

  await prisma.$transaction(async (prisma) => {
    let foundTag = await prisma.tag.findFirst({
      where: {
        name: tag
      }
    });

    if (foundTag === null) {
      foundTag = await prisma.tag.create({
        data: {
          name: tag
        }
      });
    }

    const newGroup = await prisma.group.create({
      data: {
        name,
        desc,
        campus,
        link

      }
    });

    await prisma.userGroup.create({
      data: {
        userId: parseInt(userId),
        groupId: newGroup.id
      }
    });

    await prisma.tagGroup.create({
      data: {
        tagId: foundTag.id,
        groupId: newGroup.id
      }
    });

    return newGroup;
  });

}

export async function searchGroup(tagName) {
  const errorObj = {};

  if (!tagName || tagName.trim() === "") {
    errorObj.search = "Search tag cannot be empty.";
  }

  if (Object.keys(errorObj).length > 0) {
    const encodedErrors = encodeURIComponent(JSON.stringify(errorObj));
    return redirect(`/group/search?error=${encodedErrors}`);
  }

  const tag = await prisma.tag.findFirst({
    where: {
      name: tagName.trim()
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
          },
          tags:{
            include:{
              tag:true
            }
          }
        }
      }
    }
  });

  return tagGroups.map(tg => tg.group);
}

export async function joinGroup(uid,gid){
  await prisma.userGroup.create({
    data:{
      userId: uid,
      groupId: gid
    }
  })
}

export async function leaveGroup(uid, gid){
  await prisma.userGroup.delete({
    where: {
      userId_groupId: {
        userId: uid,
        groupId: gid,
      },
    },
  });

  const remainingMembers = await prisma.userGroup.count({
    where: {
      groupId: gid,
    },
  });

  if (remainingMembers === 0) {
    await prisma.tagGroup.deleteMany({
      where: {
        groupId: gid,
      },
    });

    await prisma.group.delete({
      where: {
        id: gid,
      },
    });
  }
}