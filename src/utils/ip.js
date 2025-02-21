import axios from "axios"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../config/firebase"

export async function getIp() {
    try {
        const ip = await axios.get("https://send-email-liard.vercel.app/ip")
        return ip.data
    } catch (error) {
        console.log(error.message)
    }
}

export async function checkIpAlreadyVote(pollingId) {
    try {
        const get = await getDocs(query(
            collection(db, "userAnswer"),
            where("ip", "==", await getIp()),
            where("pollingId", "==", pollingId)
        ))

        return !get.empty
        
    } catch (error) {
        console.log(error.message)
    }
}