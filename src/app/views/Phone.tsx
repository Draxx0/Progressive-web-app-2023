import { useState,} from "react";
import MenuScreen from "./MenuScreen";
import PlayerScreen from "./PlayerScreen";


const Phone = () => {
    const [username, setUsername] = useState<string>("");

    return ( 
        <>
        {/* <MenuScreen username={username} setUsername={setUsername}/> */}
        <PlayerScreen/>
        </>
     );
}
 
export default Phone;