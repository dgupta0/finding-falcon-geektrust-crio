
import queen from "../assets/falcone.png";
import gameplay from "../assets/game.png"
import { useNavigate } from "react-router-dom";

export default function Rules() {
    localStorage.clear()
    const navigate = useNavigate()
    return (
        <main>
            <div className="problem-div">
                <div className="problem-body">
                    <p className="content">
                        <b>Our problem</b> is set in the planet of Lengaburu- <br />in the distant
                        distant galaxy of Tara B. After the recent war with neighbouring
                        planet Falicornia, King Shan has exiled the Queen of Falicornia
                        for 15 years.
                    </p>
                    <p className="content">
                        Queen Al Falcone is now in hiding. But if King Shan can find
                        her before the years are up, she will be exiled for another 15
                        years….</p>
                    <p className="content">
                        King Shan has received intelligence that Al Falcone is in hiding in one of these 6 planets - <b>DonLon, Enchai, Jebing,
                            Sapir, Lerbin & Pingasor.</b> However he has limited resources at his disposal & can send his army to only 4 of these
                        planets.
                    </p>
                </div>
                <img src={queen} alt="pic from geektrust" className="king" />
            </div>
            <h3 className="content h3">
                Now it is your responsibilty to help King Shan find Al Falcone!
            </h3>
            <div className="vehicles">
                <img className="gameplay-img" src={gameplay} alt="pic from geektrust" />
            </div>
            <p className="content content-rule">
                RULES: <br/>
                For each planet, select one vehicle
                according to the description given. <u>Remember if no ship has distance more than the planet,
                you will not be able to send the ship and planet will become disabled.</u>
                The moment you pick a planet, your ship will be launched. No backsies allowed!
            </p>
            <h3 className="rule msg"> May the force be with you.</h3>
            <button className="start"
                onClick={() => navigate("/game")}
            >Start</button>
        </main>

    )

}