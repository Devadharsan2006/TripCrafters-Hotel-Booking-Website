import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout()
{
    return(
        <div className="px-8 py-4 flex flex-col">
            <Header/>
            <Outlet/>
        </div>
    )
}