import "./ThemeChanger.scss"

import { AppDispatch, AppState } from "../state"
import React, { ReactElement, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { updateDarkMode } from "../state/user"
import { useColorMode } from "@chakra-ui/react"

const ThemeChanger = (): ReactElement => {
  const dispatch = useDispatch<AppDispatch>()
  const { colorMode, toggleColorMode } = useColorMode()
  const { isDarkMode } = useSelector((state: AppState) => state.user)

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <div className="themeChanger">
      <button
        onClick={(): void => {
          dispatch(updateDarkMode(!isDarkMode))
          if (
            (isDarkMode && colorMode === "dark") ||
            (!isDarkMode && colorMode === "light")
          ) {
            toggleColorMode()
          }
        }}
      >
        {isDarkMode ? "☾" : "☀"}
      </button>
    </div>
  )
}

export default ThemeChanger
