import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Result(){
    const [result, setResult] = useState(null);
    const hours = localStorage.getItem("totalTime");
    const navigate = useNavigate();

    useEffect(()=> {
    let pairList = JSON.parse(localStorage.getItem("data"));
     let planetList = []
     let vehicleList = [];
     for(let i = 0; i <  pairList.length; i++){
        planetList.push(pairList[i][0])
        vehicleList.push(pairList[i][1])
     }
    
     getResult(planetList, vehicleList)
    }, [])

    async function getResult(planetsList, vehiclesList) {
        console.log(planetsList, vehiclesList);
        const bodyReq = {
          token: localStorage.getItem("token"),
          planet_names: planetsList,
          vehicle_names: vehiclesList,
        };
      
        try {
          const response = await fetch("https://findfalcone.geektrust.com/find", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyReq),
          });
      
          if (response.status === 200) {
            const data = await response.json();
            console.log(data.status);
            setResult(data);
          } else {
            console.log("Response status is not 200");
          }
        } catch (error) {
          console.log(error);
        }
      }
      
    function handleReset(){
        localStorage.removeItem("data");
        localStorage.removeItem("totalTime")
        navigate("/game");

    }

    return(
       result && <div className="result-container">
        <div className="result-box">
       { result.status === "success" ? 
       <div>
       <h4>Congratulations!</h4>
       <p>You found Al Falcone.</p>
       </div>
       :
       <div>
       <h4> Better luck next Time</h4>
       <p>Sorry! You couldn&apos;t find Al Falcone.</p>
       </div>
        }
        <p>Total time taken is {hours} hours</p>
        <button onClick={handleReset}>Reset</button>
        </div>
        </div>
    )
}