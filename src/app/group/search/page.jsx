import { searchGroup } from "@/app/actions/actions";
import SearchForm from "@/component/Search";
import { DisplayBasicGroup } from "@/component/View";
import { retrieveSessionData } from "@/lib/session";

export default async function SearchGroupPage({ searchParams }) {
  const data = await retrieveSessionData();
  const tagName = await searchParams;
  const tag = tagName.search
  const error = await searchParams;
  const errorData = error.error

  let groups = null;
  let errors = {};

  if (errorData) {
    try {
      errors = JSON.parse(decodeURIComponent(errorData));
    } catch (e) {
      console.error("Failed to parse error data", e);
    }
  } else if (tag) {
    groups = await searchGroup(tag);
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center  text-black">
      <div className="w-1/3 px-8 h-screen flex justify-center items-center">
      <div>
        <div className="font-archivo font-bold tracking-tighter text-4xl">Group Search</div>
        <div className="font-lexend tracking-tight text-sm">
          <form action="/group/search" method="get" className="mt-8">
            <div>
              <label className="block">Search by Tag</label>
              <textarea
                style={{ resize: "none" }}
                type="text"
                name="search"
                className="border p-2 h-10 mt-2 rounded-lg text-sm"
              />
            </div>
            <button type="submit" className="cursor-pointer border p-2 mt-4 mb-10 rounded-lg w-20 hover:bg-white hover:text-black">
              Search
            </button>
          </form>
        </div>
        </div>
      </div>
      <div className="w-2/3 h-screen pt-10  border-t-black  border-t">
        <div className="">
          {groups?.length > 0 ? (
            groups.map((group, idx) => (
              <DisplayBasicGroup
                key={idx}
                group={group}
                sessionData={data}
                join={true}
              />
            ))
          ) : (
            <p>No groups found for: <strong>{tag}</strong></p>
          )}
        </div>

      </div>
    </div>
  );
}
