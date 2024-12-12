
import UserSupabase from "@/components/auth/user";
import Cadre from "@/components/try/cadre";
import FormTry from "@/components/try/Formtry";
import { LogoutUser } from "@/components/try/LogoutTest";



const TestUi = () => {
    return ( <div>
  <h1>test page</h1>
  <div className="md:w-1/2 w-[700px]">
<FormTry/>
<Cadre/>
  </div>
<UserSupabase/>
<LogoutUser/>
    </div> );
}
 
export default TestUi;