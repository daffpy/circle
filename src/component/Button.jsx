import { joinGroup } from "@/app/actions/actions"
export default async function JoinButton(props){
    return(
        <form action={joinGroup.bind(null, props.userid, idx.id)}>
            <button type="submit">
                Join
            </button>
        </form>
    )
}