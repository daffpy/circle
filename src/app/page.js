import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { retrieveSessionData } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const data = await retrieveSessionData()
  return (
    <div>
      <div className="h-screen flex justify-center items-center">
        <div>
        <div>
          logged in as
          <div>{data.name}</div>
          <div>({data.email})</div>

        </div>
        <div className="p-3 mt-5 border">
          CREATE GROUP
        </div>

        </div>

      </div>
    </div>
  );
}
