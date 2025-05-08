import ViewGroup from "@/component/View"

export default async function SearchForm({groups,tag, sessionData}){
    return(
        <div>
            <form action="/group/search" method="get" className="text-center mt-8">
                <div>
                <label className="block">Search by Tag</label>
                <textarea
                    style={{resize:"none"}}
                    type="text"
                    name="search"
                    className="border p-2 h-10 mt-2 rounded-lg text-sm"
                />
                </div>
                <button type="submit" className="cursor-pointer border p-2 mt-4 mb-10 rounded-lg w-20 hover:bg-white hover:text-black">
                    Search
                </button>
            </form>
            <div className="p-4">
                {groups?.length > 0 ? (
                    groups.map((group, idx) => (
                    <ViewGroup
                        key={idx}
                        group={group}
                        sessionData={sessionData}
                        join={true}
                    />
                    ))
                ) : (
                    <p>No groups found for: <strong>{tag}</strong></p>
                )}
            </div>

        </div>
    )
}