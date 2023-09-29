import { useEffect, useState } from "react"
import { Grid } from "@mui/material";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { planetsArr, vehiclesArr } from "../images"

export default function Game() {
    const [planets, setPlanets] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [token, setToken] = useState("");
    const [planetClicked, setPlanetClicked] = useState(null);
    const [selectedpair, setSelectedPair] = useState([])
    const [totalTime, setTotalTime] = useState(0)
    const navigate = useNavigate()

    async function getToken() {
      try {
        const response = await fetch("https://findfalcone.geektrust.com/token", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (response.status === 200) {
          const data = await response.json();
          const token = data.token;
          localStorage.setItem("token", token);
          return token;
        } else {
          console.log("Status not 200, can't obtain token");
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    async function getPlanets() {
      try {
        const response = await fetch("https://findfalcone.geektrust.com/planets");
        if (response.status === 200) {
          const data = await response.json();
          return data;
        } else {
          console.log("Response not 200, can't get planets data");
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    async function getVehicles() {
      try {
        const response = await fetch("https://findfalcone.geektrust.com/vehicles");
        if (response.status === 200) {
          const data = await response.json();
          return data;
        } else {
          console.log("Response not 200, can't get vehicles data");
          return;
        }
      } catch (error) {
        console.log(error);
        return;
      }
    }
    

    useEffect(() => {
        async function assembleData() {
            const tokenFromLocalStorage = localStorage.getItem("token") || ""
            setToken(tokenFromLocalStorage)
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
                        isClicked: false,
                        hasMaxDistance: true
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

    useEffect(() => {
      if (selectedpair.length === 4) {
        console.log("yes");
        const selectedCombo = JSON.stringify(selectedpair);
        localStorage.setItem("data", selectedCombo);
        localStorage.setItem("totalTime", totalTime)
        setTimeout(()=> {
          navigate("/result")
        }, 500)
        
      }
    }, [selectedpair]);
  
    return (
        <>
            <main className="game-main">
                <h3 style={{ textAlign: "center" }}>Click a planet to send Ship</h3>
                <h4 style={{ textAlign: "center" }}>Total Time: {totalTime} hours</h4>
                <Grid container spacing={2} mt={6} >
                 <GameUI 
                 planets={planets} 
                 setPlanets={setPlanets} 
                 setPlanetClicked={setPlanetClicked} 
                 vehicles={vehicles} 
                 setVehicles={setVehicles}/> 
                </Grid>
              {
               planetClicked ? 
                <ModalUI
                setPlanetClicked={setPlanetClicked}
                setVehicles={setVehicles} 
                vehicles={vehicles} 
                setSelectedPair ={setSelectedPair}
                planetClicked={planetClicked}
                setTotalTime={setTotalTime}
                totalTime={totalTime}
                />
                :
                ""
              }
            </main>
        </>
    )
}

function GameUI({planets, setPlanets, vehicles,  setPlanetClicked}){
    GameUI.propTypes = {
        planets: PropTypes.array.isRequired,
        vehicles: PropTypes.array.isRequired,
        setPlanets: PropTypes.func.isRequired,
        setPlanetClicked: PropTypes.func.isRequired
      };

      useEffect(() => {
        setPlanets((prev) => {
          return prev.map((p) => {
            if (vehicles.some((v) => v.total_no > 0 && v.max_distance >= p.distance)) {
              return p; 
            } else {
              return { ...p, hasMaxDistance: false };
            }
          });
        });
      }, [vehicles, setPlanets]);
      

    function handlePlanetClick(id) {
        setPlanets((prev) => {
          return prev.map((p) => {
            if (p.id === id) {
              setPlanetClicked({ ...p, isClicked: !p.isClicked })
              return { ...p, isClicked: !p.isClicked };
            } else {
              return p;
            }
          });
        });
      }
       
      return (
        <>
          {planets.map((planet) => (
            <Grid item xs={12} sm={6} md={4} 
            className="main-container" 
             key={planet.id}>
              <div 
               className={planet.isClicked || !planet.hasMaxDistance? "planet-container p-fade" : "planet-container"} 
              onClick={() => handlePlanetClick(planet.id)}>
                <img 
                className={planet.isClicked ? "p-img-fade planet-img" : "planet-img"} 
                src={planet.path}  alt="image-from-freepik" />
                <div className="planet-info-container">
                  <div className="planet-info-body">
                  <h4 className="planet-name">{planet.name}</h4>
                  <p className="planet-info">Distance-{planet.distance}m</p>
                  </div>
                </div>       
              </div>
              {!planet.hasMaxDistance && !planet.isClicked && <p className="no-v-msg">!No ship available to cover the distance</p>}
            </Grid>
          ))}
        </>
      );
}

function ModalUI({setPlanetClicked, setVehicles, setSelectedPair, planetClicked, vehicles, setTotalTime, totalTime}){
  ModalUI.propTypes = {
    vehicles: PropTypes.array.isRequired,
    setPlanets: PropTypes.func.isRequired,
    setPlanetClicked: PropTypes.func.isRequired,
    setSelectedPair: PropTypes.func.isRequired,
    planetClicked: PropTypes.object.isRequired,
    setTotalTime:  PropTypes.func.isRequired,
    setVehicles: PropTypes.func.isRequired,
    totalTime: PropTypes.number.isRequired
  }
  
  function handleShipClicked(v){
    setSelectedPair(prev =>[...prev, [ planetClicked.name,  v.name]])
    setVehicles(prev=> prev.map(el => {
      if(el.id === v.id){
        let currentTime = totalTime + planetClicked.distance / el.speed   
        setTotalTime(currentTime)
        console.log(el, "element number", el.total_no)
        return{...el, "total_no" : el.total_no -1} 
      }
      return el  
    }))
    setPlanetClicked(null)
  }
  return(
    <div className="modal-container">
      <div className="modal">
        <div className="modal-content">
          <h3 className="heading-modal">
            Select a ship to send on the planet-{planetClicked.name}</h3>
            <div className="planet-container-modal">
              <img src={planetClicked.path} className="planet-img resize" alt="image-from-freepik" />
              <div className= "planet-info-container-modal">
                <h4 className="planet-name">{planetClicked.name}</h4>
                <p className="planet-info">Distance-{planetClicked.distance}m</p>
              </div>
            </div>
          <div className="all-v-div">
            {vehicles.map((v) => (
                <div className={v.total_no === 0 || planetClicked.distance > v.max_distance ? "v-fade v-div" : "v-div"} key={v.id}
                onClick={()=> handleShipClicked(v)}
                >
                  <img src={v.path} className="v-img" alt="image-from-freepik" />
                  <div className="v-info-container">
                      <h4 className="v-name">{v.name}</h4>
                      <p className="v-info">
                        Max-Distance= {v.max_distance}m<br />
                        Units= {v.total_no} <br />
                        speed= {v.speed}m/h
                        {planetClicked.distance > v.max_distance && <p>!Ship distance is less</p>}
                      </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )

}