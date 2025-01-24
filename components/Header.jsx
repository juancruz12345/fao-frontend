
import { useLocation } from "react-router-dom";


import { NavSecondary } from "./NavSecondary";
import { NavPrimary } from "./NavPrimary";

export function Header() {

  const location = useLocation()

  const isHome = location.pathname === "/";

  return (
    <div>
      {
        isHome ? 

    <NavPrimary></NavPrimary>

     :

    <NavSecondary></NavSecondary>
     
      }
    </div>
  );
}
