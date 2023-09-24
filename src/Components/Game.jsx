import { useEffect, useState } from "react"
import axios from "axios";
import { Grid } from "@mui/material";
import PropTypes from 'prop-types';

// import planetsArr from "../planets.json"
// import vehiclesArr from "../vehicles.json"
import { planetsArr, vehiclesArr } from "../images"
// import venus from "../assets/venus.png"
// import saturn from "../assets/saturn.png"
// import mars from "../assets/mars.png"
// import mercury from "../assets/mercury.png"
// import earth from "../assets/earth.png"
//import neptune from "../assets/neptune.png"
// import rocket from "../assets/rocket.png"
// import plane from "../assets/plane.png"
// import ship from "../assets/ship.png"
// import ufo from "../assets/ufo.png"
// console.log("data", vehiclesArr);
// console.log("data", planetsArr)

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
                return data;
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
                return data
            } else {
                console.log("res not 200, cant get vehicles data")
                return
            }

        } catch (error) {
            console.log(error)
            return
        }
    }
 console.log(vehicles)

    useEffect(() => {
        async function assembleData() {
            const tokenFromLocalStorage = localStorage.getItem("token") || ""
            setToken(tokenFromLocalStorage)
            console.log(localStorage.getItem("token"));
            if (!token) {
                const tokenFromAPI = await getToken();
                setToken(tokenFromAPI)
            }

            // combining pics planets image data with vehicles data api
            const planetsData = await getPlanets();
            const combinedPlanetsData = planetsData.map((planet, i) => {
                return (
                    {
                        ...planet, id: `planet${i}`,
                        path: planetsArr[i].path,
                        isClicked: false
                    }
                )
            })
            setPlanets(combinedPlanetsData)

            // combining pics vehicle image data with vehicles data api
            const vehiclesData = await getVehicles()
            const combinedVehiclesData = vehiclesData.map((vehicle, i) => {
                return (
                    {
                        ...vehicle, id: `vehicle${i}`,
                        path: vehiclesArr[i].path,
                        isClicked: false
                    }
                )
            })
            setVehicles(combinedVehiclesData)
        }
        assembleData()
    }, [token])

    return (
        <>
            <h1 className="title">
                Finding Falcone
            </h1>
            <main className="game-main">
                <h3 style={{ textAlign: "center" }}>Select 4 planets to send Vehicles</h3>
                <Grid container spacing={2} mt={6} >
                 <GameUI 
                 planets={planets} setPlanets={setPlanets} 
                 vehicles={vehicles} setVehicles={setVehicles}/> 
                </Grid>
            </main>
        </>
    )
}

function GameUI({planets, setPlanets, vehicles}){
    GameUI.propTypes = {
        planets: PropTypes.array.isRequired,
        setPlanets: PropTypes.func.isRequired,
        vehicles: PropTypes.array.isRequired,
      };

    function handlePlanetClick(id) {
        setPlanets((prev) => {
          return prev.map((p) => {
            if (p.id === id) {
              return { ...p, isClicked: !p.isClicked };
            } else {
              return p;
            }
          });
        });
      }
      function handleShipClick(p_id, v_id){
        console.log(p_id, v_id)
      }
    
      return (
        <>
          {planets.map((planet) => (
            <Grid item xs={12} sm={6} md={4} p={2} className="main-container" key={planet.id}>
              <div className="planet-container" onClick={() => handlePlanetClick(planet.id)}>
                <img src={planet.path} className="planet-img" alt="image-from-freepik" />
                <div className="planet-info-container">
                  <h4 className="planet-name">{planet.name}</h4>
                  <p className="planet-info">Distance-{planet.distance}m</p>
                </div>
              </div>
              {planet.isClicked && (
                <div className="all-v-div">
                  {vehicles.map((v) => (
                    <div className="v-div" key={v.id} 
                    onClick={()=>handleShipClick(v.id, planet.id)}>
                      <img src={v.path} className="v-img" alt="image-from-freepik" />
                      <div className="v-info-container">
                        <h4 className="v-name">{v.name}</h4>
                        <p className="v-info">
                          Max-Distance= {v.max_distance}m<br />
                          Units= {v.total_no} <br />
                          speed= {v.speed}m/h
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Grid>
          ))}
        </>
      );
}