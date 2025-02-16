import axios from "axios"

export async function getIp() {
    try {
        const ip = await axios.get("https://send-email-liard.vercel.app/ip")
        return ip.data
    } catch (error) {
        console.log(error.message)
    }
}