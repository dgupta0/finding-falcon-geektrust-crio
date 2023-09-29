import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Result(){
    const [result, setResult] = useState(null);
    const hours = localStorage.getItem("result");
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

    async function getResult(planetsList, vehiclesList){
        console.log(planetsList, vehiclesList)
        let bodyReq = {
            "token" : localStorage.getItem("token"),
            "planet_names" : planetsList,
            "vehicle_names" : vehiclesList
        }
        try {
            const res = await axios.post("https://findfalcone.geektrust.com/find", bodyReq,
                {
                    headers: {
                    Accept : "application/json",
                    "Content-Type": "application/json"
                    }
               })
            const data = res.data 
            console.log(data.status)   
            setResult(data)
        } catch (error) {
            console.log(error)
        }
    }
    function handleReset(){
        localStorage.removeItem("data");
        localStorage.removeItem("result")
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