import { useEffect, useState } from "react"
import axios from "axios";
import { Grid, Card } from "@mui/material";
import planets from "../planets.json"
import vehicles from "../vehicles.json"
// import venus from "../assets/venus.png"
// import saturn from "../assets/saturn.png"
// import mars from "../assets/mars.png"
// import mercury from "../assets/mercury.png"
// import earth from "../assets/earth.png"
// import neptune from "../assets/neptune.png"
// import rocket from "../assets/rocket.png"
// import plane from "../assets/plane.png"
// import ship from "../assets/ship.png"
// import ufo from "../assets/ufo.png"
console.log("data", vehicles);
console.log("data", planets)

export default function Game() {
    const [planets, setPlanets] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [token, setToken] = useState("")

    async function getToken() {
        try {
            const res = await axios.post("https://findfalcone.geektrust.com/token", null, {
                headers: {
                    'Accept': 'application/json'
                }
            })
            if (res.status === 200) {
                const token = res.data.token;
                localStorage.setItem("token", token)
                return token
            } else {
                console.log("status not 200, can't obtain token")
            }

        } catch (error) {
            console.log(error);
        }

    }
    async function getPlanets() {
        try {
            const res = await axios.get("https://findfalcone.geektrust.com/planets");
            if (res.status === 200) {
                const data = res.data;
                console.log(data)
                setPlanets(data)
            } else {
                console.log("res not 200, cant get planets data")
            }

        } catch (error) {
            console.log(error)
        }

    }
    async function getVehicles() {
        try {
            const res = await axios.get("https://findfalcone.geektrust.com/vehicles");
            if (res.status === 200) {
                const data = res.data;
                console.log(data)
                return data
            } else {
                console.log("res not 200, cant get planets data")
                return
            }

        } catch (error) {
            console.log(error)
            return
        }
    }


    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem("token")
        console.log(localStorage.getItem("token"));
        if (tokenFromLocalStorage) {
            setToken(tokenFromLocalStorage)
        }
        else {
            const tokenFroAPI = getToken();
            setToken(tokenFroAPI)
        }

        const planetsData = getPlanets();
        getVehicles()
    }, [])

    return (
        <>
            <h1 className="title">
                Finding Falcone
            </h1>
            <main>
                <h3 style={{ textAlign: "center" }}>Select 4 planets to send Vehicles</h3>
                <Grid container spacing={2}>
                </Grid>
            </main>
        </>
    )
}