"use client"

import { useState } from "react"

const useToggle = (initailState = true) => {

    const [toggle, setToggle] = useState(initailState);

    const handleToggle = () => {
        setToggle(!toggle)
    }

    return { toggle, handleToggle }

}

export default useToggle