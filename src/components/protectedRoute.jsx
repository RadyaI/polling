import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from '../config/firebase'

import { onAuthStateChanged } from 'firebase/auth'

export function Protected({ View }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }
        })

        return () => subscribe()
    }, [])

    return isLoggedIn ? <View /> : <Navigate to={"/"} replace />
}