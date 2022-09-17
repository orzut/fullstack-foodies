import React from "react";
import { Cart } from "./Cart";
import Search from "./Search";

export const Header = () => {
  return (
    <div>
      <Search />
      <div className="flex mf: flex-row flex-col items-end justify-between">
      </div>
    </div>
  );
};
