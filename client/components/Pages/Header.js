import React from "react";
import { Search } from "./Search";

export const Header = () => {
  return (
    <div>
      <Search />
      <div className="flex mf: flex-row flex-col items-center justify-between">
        <img src='https://i.postimg.cc/Yq4LbMct/logo-no-background.png'
         alt='logo'
         height={100}
         width='25%'
         />
      </div>
    </div>
  );
};
