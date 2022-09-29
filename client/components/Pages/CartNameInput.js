import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { addSavedOrders } from '../../store/savedOrders';
import './CartNameInput.css';

const CartNameInput = ({setIsNameInputActive, setIsFavorited}) => {
    const [cartName, setCartName] = useState('')
    const dispatch = useDispatch();

    const handleChange = (ev) => {
        setCartName(ev.target.value)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        dispatch(addSavedOrders(cartName))
        setIsNameInputActive(false)
    }

    const handleExit = (ev) => {
        ev.preventDefault();
        setCartName('')
        setIsFavorited(false)
        setIsNameInputActive(false)
    }

    return (
      <form className='class-name-input-form' onSubmit={handleSubmit}>
          <input type='text' placeholder='Enter Cart Name' value={cartName} onChange={handleChange}/>
          <div className='class-name-input-form-buttons'>
              <button type='submit'>Save</button>
              <button onClick={handleExit}>Cancel</button>
          </div>
      </form>
  )
};

export default CartNameInput;