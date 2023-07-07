import React from "react"
import "../../../css/styles.css"
export const SignInView = () => {

    return (
        <form>
            <h3>SIGN IN</h3>
            UserName:
            <input type="text" />
            Password:
            <input type="password" />
            Email:
            <input type="Email" />
            DateOfBirth:
            <input type="Date" />
            <button type="submit">
                Submit
            </button>
        </form >)

}