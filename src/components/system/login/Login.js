import "./Login.css"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PageLogin() {
    let [userEmail, setUserEmail] = useState("")
    let [password, setPassword] = useState("") 
    let [nameOfSchool, setNameOfSchool] = useState("mySchoolNew") 

    let [errorMasage, setErrorMasage] = useState("") 

    let navigate = useNavigate();


    function mySubmit() {
        let data = {email: userEmail, password: password, nameOfSchool: nameOfSchool}
        
        axios.post("http://localhost:4000/system/login", data)
            .then(
                (data)=>{
                    // console.log(data.data);
                    localStorage.tokenOfUser = JSON.stringify(data.data.token)
                    setErrorMasage("")
                    setUserEmail("")
                    setPassword("")
                    let location = data.data.level_permission
                    navigate("/" + location);
                }
                ,(err) => {
                    setErrorMasage(err.response.data)
                }
            )
        ;
    }

    
    return(
        <div className="PageLogin">
            <div className="container">
                <div className="screen">
                    <div className="screen__content">
                        <h2 className="button h2__">Log In</h2>
                        <form action="" className="from" onSubmit={(e)=>{
                            e.preventDefault()
                            mySubmit()
                        }}>
                            <p className="errorMasage">{errorMasage && <span className="_errorMasage">* </span>} {errorMasage}</p>
                            <p>orel@gmail.com</p>
                            <p>shira@gmail.com</p>
                            <p>aliya@gmail.com</p>
                            <p>aviya@gmail.com</p>
                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                <input required  onChange={(e)=>{setUserEmail(e.target.value)}} value={userEmail} type={"text"} className="login__input" placeholder="Email"/>
                            </div>
                            <div  className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input required onChange={(e)=>{setPassword(e.target.value)}} value={password} type={"password"} className="login__input" placeholder="Password"/>
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                <input required value={nameOfSchool} type={"text"} className="login__input" placeholder="Name of school"/>
                            </div>
                            
                            <button className="button login__submit">
                                <span className="button__text">Log In Now</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>		

                            <button className="button toRegister_toLogin__button" onClick={()=>{navigate('/registration')}} >To Register</button>				
                        </form>
                    </div>

                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4"></span>
                        <span className="screen__background__shape screen__background__shape3"></span>		
                        <span className="screen__background__shape screen__background__shape2"></span>
                        <span className="screen__background__shape screen__background__shape1"></span>
                    </div>		
                </div>
            </div>
        </div>
    )
}

export default PageLogin