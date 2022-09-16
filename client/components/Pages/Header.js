import React from 'react'
import { Cart } from './Cart'
import { Search } from './Search'
import { AiOutlineShoppingCart } from 'react-icons/ai';


export const Header = () => {
  return (
    <div>
        <Search />
      <div className='flex mf: flex-row flex-col items-end justify-between'>
        <AiOutlineShoppingCart className="text-[30px]" />
      </div>
    </div>
  )
}
