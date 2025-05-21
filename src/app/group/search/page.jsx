import { searchGroup } from "@/app/actions/actions";
import SearchForm from "@/component/Search";
import { retrieveSessionData } from "@/lib/session";

export default async function SearchGroupPage({ searchParams }) {
  const data = await retrieveSessionData();
  const tag = searchParams?.search;
  const errorData = searchParams?.error;

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
    <div className="h-screen flex items-center justify-center">
      <div>
        <div className="text-center text-2xl">Group Search</div>
        <SearchForm groups={groups} tag={tag} sessionData={data} errors={errors} />
      </div>
    </div>
  );
}
