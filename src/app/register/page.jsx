import {register} from "@/app/actions/actions"

export default function RegisterPage(){
    return <div className="h-screen flex items-center justify-center">
        <div>
        <div className="text-center text-2xl">Register</div>
        <form action={register} className="text-center mt-8">
        <div>
                <label className="block">Name</label>
                <textarea name="name" placeholder="" style={{resize: "none"}} className=" border p-2 h-10 mt-2 rounded-lg text-sm"></textarea>
            </div>
            <div>
                <label className="block">Binusian Email</label>
                <textarea name="email" placeholder="@binus.ac.id" style={{resize: "none"}} className=" border p-2 h-10 mt-2 rounded-lg text-sm"></textarea>
            </div>
            <div>
            <label className="block">Password</label>
                <textarea name="password" style={{resize: "none"}} className="border p-2 h-10 mt-2 rounded-lg text-sm"></textarea>
            </div>
            <button type="submit" className="cursor-pointer border p-2 mt-10 text-sm rounded-lg w-20 hover:bg-white hover:text-black">Submit</button>
        </form>
        </div>
    </div>
}