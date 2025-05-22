import { createGroup } from "@/app/actions/actions";
import { retrieveSessionData } from "@/lib/session";

export default async function CreateGroupPage({ searchParams }) {
    const data = await retrieveSessionData();
    let error = {};
    const sp = await searchParams
    const errorData = sp.error

    if (errorData !== undefined) {
        try {
            error = JSON.parse(decodeURIComponent(errorData));
            console.log(error)
        } catch (e) {
            console.error('Failed to parse error', e);
        }
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div>
                <div className="text-center text-2xl">Create</div>
                <form action={createGroup} className="text-center mt-8">
                    <div>
                        <label className="block">Group Name</label>
                        <textarea name="name" style={{ resize: "none" }} className="border p-2 h-10 mt-2 rounded-lg text-sm" />
                    </div>
                    <div>
                        <label className="block">Group Description</label>
                        <textarea name="desc" style={{ resize: "none" }} className="border p-2 h-10 mt-2 rounded-lg text-sm" />
                    </div>
                    <div>
                        <label className="block">Add Tag</label>
                        <textarea name="tag" style={{ resize: "none" }} className="border p-2 h-10 mt-2 rounded-lg text-sm" />
                    </div>
                    <div>
                        <label className="block">Owner ID</label>
                        <textarea
                            readOnly={true}
                            name="id"
                            defaultValue={data.id}
                            style={{ resize: "none", outline: "none" }}
                            className="border p-2 h-10 mt-2 rounded-lg text-sm text-gray-400"
                        />
                    </div>
                    {Object.entries(error).map(([field,e], idx) => (
                        <div key={idx}>
                            {field}: {e}
                        </div>
                    ))}
                    <button type="submit" className="cursor-pointer border p-2 mt-10 text-sm rounded-lg w-20 hover:bg-white hover:text-black">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
