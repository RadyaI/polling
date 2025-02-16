import axios from "axios"

export async function getIp() {
    try {
        await axios.get("https://send-email-liard.vercel.app/ip")
            .then((res) => {
                return res.data
            })
    } catch (error) {
        console.log(error.message)
    }
}