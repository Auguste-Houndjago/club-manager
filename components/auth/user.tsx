
import { createClient } from "@/lib/server";
import { supabase } from "@/lib/supabase";


const UserSupabase = async () => {


    


    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()

console.log(error, "erreur dans la recuperation de l user")




    return ( 
    
    <div>
<p>{data.user?.email  } et {data.user?.created_at}</p>

    </div> );
}
 
export default UserSupabase;



