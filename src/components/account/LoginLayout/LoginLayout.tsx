"use client"

import { useState } from "react"

import Login from "../Login/Login"
import Register from "../Register/Register"
import Reset from "../Reset/Reset"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
  RESET = "reset",
}

const LoginLayout = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <>
      {currentView === "sign-in" ? (
        <Login setCurrentView={setCurrentView} />
      ) : (
        <>
          {currentView === "reset" ? (
            <Reset setCurrentView={setCurrentView} />
          ) : (
            <Register setCurrentView={setCurrentView} />
          )}
        </>
      )}
    </>
  )
}

export default LoginLayout
