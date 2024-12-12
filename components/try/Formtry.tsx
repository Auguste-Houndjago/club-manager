import { supabase } from "@/lib/supabase";
import { Console } from "console";



export const updateUserSkill = async (userId: string , skill:string) =>{
console.log(userId, skill)
}




async function login(formData:FormData){
    'use server';
    const data = {
        email:formData.get('email') as string,
        password:formData.get('password') as string,
    }

    const { error}= await supabase.auth.signInWithPassword(data)

    if (error) {
        console.log(error)
    }
}



const FormTry = async () => {
    "use server";
const {data:user} = await supabase.auth.getUser()

const handleSkill = async (formData: FormData)=>{
    'use server';

    const  skill = formData.get('skill')

    console.log(skill)
    if (!skill) return 
    
    const {}= updateUserSkill(user.user?.email! as string , skill as string)
}


    return ( 

        <div>

<form action={handleSkill}>

    <input type="text" className="h-20 w-20 border-blue-700" name="skill" placeholder="skill" />
    <button type="submit" className="block border-2 ">
add skill
</button>
</form>


<div className="flex my-12 border-2 justify-center w-full">
    <form action={login} className="grid gap-y-4  grid-cols-1 ">
        <div className="grid">
            <input type="email" name="email" className="bg-slate-600/40 text-xl font-bold rounded-md" />
            <label htmlFor="email" className="bg-slate-600 text-xl font-bold rounded-md"> Email</label>
        </div>

        <div className="grid border-2">
            <input type="password" name="password" className="bg-slate-600/40 text-xl font-bold rounded-md" />
            <label htmlFor="password" className="bg-slate-600 text-xl font-bold rounded-md"> password</label>
        </div>
        <button className="border-2" type="submit">
            submit
        </button>
    </form>
</div>

        </div>
     );
}
 
export default FormTry;