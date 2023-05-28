import "./header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCar, faTaxi, faPlane, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons'

import { useState } from 'react'
import { DateRange } from 'react-date-range';

import { format } from 'date-fns';

import {useNavigate} from "react-router-dom";

import {SearchContext} from "../../context/SearchContext";
import { useContext } from 'react';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { AuthContext } from "../../context/AuthContext";

const Header = ({type}) => {
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    const [destination,setDestination] = useState("")

    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })

    const handleOption = (name, operation) => {
        setOptions(prev => {
            return {
                ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1
            }
        })
    }

    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    const {dispatch} = useContext(SearchContext);


    const handleSearch = () => {
        dispatch({type:"NEW_SEARCH", payload:{destination, date, options}})
        navigate("/hotels",{state:{destination, date, options}})
    }

    return (
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode":"headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car Rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport Taxis</span>
                    </div>
                </div>

                {   type!=="list" &&
                    <>
                <h1 className="headerTitle">A lifetime of Discounts? It's Genius.</h1>
                <p className="headerDesc">Save 10% or more at participating properties – just look for the blue Genius label.</p>
                {
                    !user && 
                    <button className="headerBtn">Sign in / Register</button>
                }

                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className="headerIcon" />
                        <input type="text" placeholder="Where are you going?" 
                            className="headerSearchInput" onChange={e=>setDestination(e.target.value)} />
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                        <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">
                            {/* RUNTIME ERROR FIX THIS  */}
                            {`${format(date[0].startDate,"MM/dd/yyyy")} `}
                            {/* to ${format(date[0].startdate,"MM/dd/yyyy")} */}
                        </span>
                        {openDate && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            minDate={new Date()}
                            ranges={date}
                            className="Date"
                        />}
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                        <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchText">
                            {`${options.adult} adult | ${options.children} children | ${options.room} room`}
                            {openOptions && <div className="options">
                                <div className="optionItem">
                                    <span className="optionText">Adult</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" disabled={options.adult<=1} onClick={() => handleOption("adult", "d")}>-</button>
                                        <span className="optionCounterNumber">{options.adult}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Children</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" disabled={options.children<=0} onClick={() => handleOption("children", "d")}>-</button>
                                        <span className="optionCounterNumber">{options.children}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Room</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" disabled={options.adult<=1} onClick={() => handleOption("room", "d")}>-</button>
                                        <span className="optionCounterNumber">{options.room}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                                    </div>
                                </div>
                            </div>}
                        </span>
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerBtn" onClick={handleSearch}>Search</button>
                    </div>
                </div>
                </>
                }
            </div>
        </div>
    )
}

export default Header