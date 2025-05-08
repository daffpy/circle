import { searchGroup } from "@/app/actions/actions"
import SearchForm from "@/component/Search"
import { retrieveSessionData } from "@/lib/session"


export default async function SearchGroupPage({searchParams}){
    const data = await retrieveSessionData()
    const tagName = await searchParams
    const tag = tagName.search

    const groups = await searchGroup(tag);
    return (<div className="h-screen flex items-center justify-center">
        <div>
        <div className="text-center text-2xl">Group Search</div>
            <SearchForm groups={groups} tag={tag} sessionData={data}/>
        </div>
    </div>)
}