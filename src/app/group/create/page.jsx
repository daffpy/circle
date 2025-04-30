import { createGroup } from "@/app/actions/actions";
import { retrieveSessionData } from "@/lib/session";

export default async function CreateGroupPage(){
    const data = await retrieveSessionData()
    return <div className="h-screen flex items-center justify-center">
        <div>
        <div className="text-center text-2xl">create</div>
        <form action={createGroup} className="text-center mt-8">
            <div>
                <label className="block">Group Name</label>
                <textarea name="name" placeholder="" style={{resize: "none"}} className=" border p-2 h-10 mt-2 rounded-lg text-sm"></textarea>
            </div>
            <div>
                <label className="block">Group Description</label>
                <textarea name="desc" placeholder="" style={{resize: "none"}} className=" border p-2 h-10 mt-2 rounded-lg text-sm"></textarea>
            </div>
            <div>
            <label className="block">Owner ID</label>
                <textarea readOnly={true} name="id" value={data.id} style={{resize: "none", outline: 'none'}} className=" border p-2 h-10 mt-2 rounded-lg text-sm text-gray-400"></textarea>
            </div>
            <button type="submit" className="cursor-pointer border p-2 mt-10 text-sm rounded-lg w-20 hover:bg-white hover:text-black">Submit</button>
        </form>
        </div>
    </div>
}