import React, { useEffect, useState, useReducer } from 'react';
import { Link, useLocation } from 'react-router-dom';

import navbarReducer, { OVERVIEW, OVERVIEW_SCROLL, GAME_DETAILS, GAME_DETAILS_SCROLL, PAGE_NOT_FOUND, PAGE_NOT_FOUND_SCROLL } from './navbarReducer';

import './Navbar.css';

/*
    Call the callback function only if scrollPixel is between 0 & 10s
*/
function optimize (callback) {
    let scrollPixel;
    return function() {
        if (!scrollPixel || scrollPixel < 10) {
            callback();
        }
        scrollPixel = window.scrollY;
    }
}

const Navbar = (): JSX.Element => {
    const { pathname } = useLocation();
    const BLACK_LOGO: string = "https://sunday.gg/wp-content/themes/sunday/dist/images/sunday.svg";
    const WHITE_LOGO: string = "https://sunday.gg/wp-content/themes/sunday/dist/images/sunday-white.svg";
    const [sticky, setSticky] = useState<"sticky" | "">("");
    const [state, dispatch] = useReducer(
        navbarReducer, 
        {
            bgColorClass: '',
            headerText: '',
            logoColor: '',
            headerTextColor: ''
        }
    );

    useEffect(() => {
        const dispatchActionByPathname = (scrolled = false) => {
            if (scrolled) {
                if (pathname === "/") {
                    dispatch({ type: OVERVIEW_SCROLL });
                } else if (pathname.match(/game\/\d+$/)) {
                    dispatch({ type: GAME_DETAILS_SCROLL });
                } else {
                    dispatch({ type: PAGE_NOT_FOUND_SCROLL });
                }
            } else {
                if (pathname === "/") {
                    dispatch({ type: OVERVIEW });
                } else if (pathname.match(/game\/\d+$/)) {
                    dispatch({ type: GAME_DETAILS });
                } else {
                    dispatch({ type: PAGE_NOT_FOUND });
                }
            }
        }
        
        const handleScroll = (): void => {
            if (window.scrollY > 9) {
                dispatchActionByPathname(true);
                setSticky("sticky");
            } else {
                dispatchActionByPathname();
                setSticky("");
            }
        };
        const optimizedScroll = optimize(handleScroll);

        // For initial scroll status
        optimizedScroll();

        window.addEventListener('scroll', optimizedScroll);
        return () => {
            window.removeEventListener('scroll', optimizedScroll);
        }
    }, [pathname]);

    return (
        <div className={`navbar ${state.bgColorClass} ${sticky}`}>
            <Link to={"/"}>
                <img className="company-logo" src={state.logoColor === "white-icon"? WHITE_LOGO: BLACK_LOGO} alt="logo" height={75} width={75} />
            </Link>
            <div className={`navbar-header ${state.headerTextColor}`}>
                <h1>{state.headerText}</h1>
            </div>
        </div>
    )
}

export default Navbar;
