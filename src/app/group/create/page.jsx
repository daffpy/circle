import { createGroup } from "@/app/actions/actions";
import { retrieveSessionData } from "@/lib/session";

export default async function CreateGroupPage({ searchParams }) {
    const data = await retrieveSessionData();
    let errors = {};
    const errorData = searchParams?.error;

    if (errorData !== undefined) {
        try {
            errors = JSON.parse(decodeURIComponent(errorData));
        } catch (e) {
            console.error("Error parsing validation error data", e);
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
                    <div>
                        {errors.name && <div className="text-red-500 text-sm mt-1 italic">{errors.name}</div>}
                        {errors.desc && <div className="text-red-500 text-sm mt-1 italic">{errors.desc}</div>}
                        {errors.tag && <div className="text-red-500 text-sm mt-1 italic">{errors.tag}</div>}
                        {errors.id && <div className="text-red-500 text-sm mt-1 italic">{errors.id}</div>}
                    </div>
                    <button type="submit" className="cursor-pointer border p-2 mt-10 text-sm rounded-lg w-20 hover:bg-white hover:text-black">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
