'use client'

import { supabase } from "@/lib/supabase";
import { Session } from '@supabase/supabase-js';
import {useEffect, useState} from 'react';


export const LogoutUser = async () => {

    const [user, setuser] = useState<Session| null>(null);
    const logOut= async ()=>{
        try {
            const {error} = await supabase.auth.signOut()
            if (error) throw error;
            console.log(error, "erreur logout")
        } catch (err:any) {
            console.error('Error during logout:', err);
        }

        }


        useEffect(() => {

            const fetchSession = async () => {
                const { data, error } = await supabase.auth.getSession()
    
                if (error) {
                    console.error('Error fetching session: ', error)
                    console.log(error, "erreur session fetching")
                } else {
                    setuser(data.session)
                }
            }
            fetchSession()
        }, []);


    return ( <div>
<button onClick={logOut} className="hover:scale-125 transition-all z-20" > logout bb </button>

{user ?  
<h1> {user.user.email}</h1>
: <h1> not user</h1> }
    </div> );
}
 
 LogoutUser;