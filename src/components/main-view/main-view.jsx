
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap"
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login/login";
import { SignInView } from "../signIn/signIn";
import { ProfileView } from "../profile-view/profile";
import { BaseUrl } from "../../constants/constant";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { SearchBar } from "../search-bar/searchbar"

import "../../index.scss"

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);

    const [employees, setEmployees] = useState(["Shyam", "Ram"])
    const [checked, setChecked] = useState(false)
    const handleChange = () => {
        setChecked(!checked)
        setEmployees(prevSelected => {
            if (prevSelected.includes("hari")) {
                return prevSelected.filter(name => name !== "hari")
            } else {
                return prevSelected.concat("hari")
            }
        })
    }

    return (
        <>
        <h3>Please select one or more users.</h3>
           <div style={{background:"white", padding:"10px"}}>
            <div className="card" style={{ padding: "16px", border: "1px solid black", position: "relative" }}> 
            <div className="userDirectory" style={{ position: "absolute", top: "-20px", left:"1", padding:"0px 8px",background:"white" }}>User Directory</div>
                    <div className="1stLevelCard" style={{ background: "lightGray", padding: "8px", marginBottom: "3px", display: "flex", justifyContent: "space-between", }}>CEO
                        <input type="checkbox"
                            checked={checked}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="2ndLevelCard" style={{ background: "lightGray", padding: "8px", marginLeft: "18px", marginBottom:"3px", display:"flex", justifyContent:"space-between"}}>
                        HR
                        <input type="checkbox"
                        />
                    </div>
                    <button onClick={() => console.log('selected Employees',employees)
                        
                    }
                        style={{ position: "absolute", bottom: "0", right: "0", marginBottom: "-50px", padding: " 0px 8px" }}>
               Submit Selection 
                </button>
                </div>
            </div> 
        </>
    );
}