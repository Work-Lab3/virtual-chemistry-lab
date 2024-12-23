'use client'

import { createContext, useContext, useState } from "react";

const context = createContext()

export function Appwrapper({ children }) {
    const [color, setColor] = useState('#a7c7cb')

    return (
        <context.Provider value={{
            color, setColor
        }}>
            {children}
        </context.Provider>
    )
}

export function useColor(){
    return useContext(context);
} 