import { retrieveSessionData } from "@/lib/session";
import Link from "next/link";

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
        <Link href="/group/create">
          <div className="p-3 mt-5 border">
            CREATE GROUP
          </div>
        </Link>
        <Link href="/group/view">
          <div className="p-3 mt-5 border">
            VIEW GROUP
          </div>
        </Link>
        <Link href="/group">
          <div className="p-3 mt-5 border">
            SEARCH GROUP
          </div>
        </Link>

        </div>

      </div>
    </div>
  );
}
