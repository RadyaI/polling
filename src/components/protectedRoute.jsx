import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from '../config/firebase'

import { onAuthStateChanged } from 'firebase/auth'

export function Protected({ View }) {

    const router = useNavigate()

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Hai!")
            } else {
                router("/auth")
            }
        })

        return () => subscribe()
    }, [])

    return <View />
}