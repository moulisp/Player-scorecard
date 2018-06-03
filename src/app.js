import 'normalize.css/normalize.css';
import './style/app.sass';

import xhr from './utils/xhr';
import scorecard from "./components/scorecard"

/**
 * Loading players details on page load
 */
window.onload = () => {
    xhr.get("/data/player-stats.json",
        //Success callback function     
        response => {
            if (response) {
                let playersArray = JSON.parse(response).players;
                if (playersArray && playersArray.length) {
                    scorecard.setPlayers(playersArray);
                }
            }
        },
        //Error callback function
        error => {
            //error message needs to be shown on application level 
            console.log(error);
        });

}