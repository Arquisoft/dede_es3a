import { SessionProvider, useSession } from "@inrupt/solid-ui-react";
import { Console } from "console";
import { useState } from "react";
import FormLogIn from "./FormLogIn";

const Login_v2 = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const {session} = useSession();

    session.onLogin(() => {
        setIsLoggedIn(true);
    })

    session.onLogout(() => {
        setIsLoggedIn(false);
    })

    return(
        <SessionProvider sessionId="">
            {(!isLoggedIn) ? <FormLogIn/> : console.log("Se conecta XD")};
        </SessionProvider>
    )
}
export default Login_v2;