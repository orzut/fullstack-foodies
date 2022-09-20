import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store';
import { FaUserAlt } from "react-icons/fa";
import { GiBackwardTime } from 'react-icons/gi';
import { AiFillHeart, AiFillSetting } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import './UserButton.css';

function UserButton() {
    const [isActive, setIsActive] = useState(false)
    const dropDownRef = useRef();
    const clickMenuRef = useRef(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const pageClickEvent = (e) => {
            if (isActive && !clickMenuRef.current) {
                clickMenuRef.current = !clickMenuRef.current;
            } else if (isActive && clickMenuRef.current) {
                clickMenuRef.current = !clickMenuRef.current;
                setIsActive(!isActive);
            }
        };
        // If the item is active (ie open) then listen for clicks
        if (isActive) {
            window.addEventListener('click', pageClickEvent);
        }
        // When the item is closed, make sure clickMenuRef is false (initial state)
        if (!isActive && clickMenuRef.current) {
            clickMenuRef.current = false;
        }
        return () => {
            window.removeEventListener('click', pageClickEvent);
        };
    }, [isActive]);

    const handleClick = (ev) => {
        setIsActive(!isActive)
    }

    const handleLogout = (ev) => {
        dispatch(logout());
    }

    return (
        <div>
            <div onClick={handleClick}>
                <FaUserAlt className="nav-icon" />
            </div>
            <nav className={`menu ${isActive? 'active' : ''}`} ref={dropDownRef}>
                <ul>
                    <li>
                        <Link to='/past-orders'>
                            <div className='menu-list-item'>
                                <GiBackwardTime className="menu-icon"/>
                                <div className='menu-text'>Past Orders</div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to='/saved'>
                            <div className='menu-list-item'>
                                <AiFillHeart className="menu-icon"/>
                                <div className='menu-text'>Saved</div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to='/account'>
                            <div className='menu-list-item'>
                                <AiFillSetting className="menu-icon"/>
                                <div className='menu-text'>Account</div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <a onClick={handleLogout}>
                            <div className='menu-list-item'>
                                <BiLogOut className="menu-icon"/>
                                <div className='menu-text'>Logout</div>
                            </div>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
};

export default UserButton;