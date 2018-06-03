import numbersUtils from "../utils/numbersUtils";
import HTMLUtils from '../utils/htmlUtils';
import scorecardTemplate from "../templates/scorecard";
const scorecard = {};

let playersList = [];

//Array to maintain the list of stats displayed on the screen
//each object have a title along with a getvalue function which handle the value calculation logic
//Add/removal of any stats(object) will automatically render in the HTML
//Example of data driven approach 
let statsDisplayList = [{
    title: scorecardTemplate.appearanceTitle,
    getValue: function (stats) {
        let statsNames = ["appearances"];
        return getStatsValuesOf(stats, statsNames);
    }
}, {
    title: scorecardTemplate.goalsTitle,
    getValue: function (stats) {
        let statsNames = ["goals"];
        return getStatsValuesOf(stats, statsNames);
    }
}, {
    title: scorecardTemplate.assistTitle,
    getValue: function (stats) {
        let statsNames = ["goal_assist"];
        return getStatsValuesOf(stats, statsNames);
    }
}, {
    title: scorecardTemplate.goalsPerMatchTitle,
    getValue: function (stats) {
        let totalMatchStatsNames = ["losses", "wins", "draws"];
        let totalGoalStatsNames = ["goals"];
        let goalsPerMatch = getStatsValuesOf(stats, totalGoalStatsNames) / getStatsValuesOf(stats, totalMatchStatsNames);
        return numbersUtils.toTwoFixedDecimal(goalsPerMatch);
    }
}, {
    title: scorecardTemplate.passesPerMinTitle,
    getValue: function (stats) {
        let totalPassStatsNames = ["fwd_pass", "backward_pass"];
        let totalMinStatsNames = ["mins_played"];
        let passesPerMin = getStatsValuesOf(stats, totalPassStatsNames) / getStatsValuesOf(stats, totalMinStatsNames);
        return numbersUtils.toTwoFixedDecimal(passesPerMin);
    }
}]

let playersDropdown = document.getElementById("scorecardDropdown");

/**
 * On change event listener for playerslist dropdown  
 */
playersDropdown.addEventListener("change", () => {
    populatePlayerDetails();
});


/**
 * Populate players list dropdown with palyers details 
 */
scorecard.setPlayersDropDown = () => {
    playersList.forEach(player => {
        let option = document.createElement('option');
        option.value = player.player.id;
        option.innerHTML = getPlayerDisplayName(player);
        playersDropdown.appendChild(option);
    });

    //populate scorecard after loading the players list to dropdown 
    populatePlayerDetails();

}

/**
 * Returns the diplayname of the passed in player
 * 
 * @param {object} player 
 */
let getPlayerDisplayName = player => {
    if (player.player.name) {
        let firstName = player.player.name.first ? player.player.name.first.trim() : "";
        let lastName = player.player.name.last ? player.player.name.last.trim() : "";
        return firstName + " " + lastName;
    }
    return "";
}


/**
 * Populate the scorecard with players details
 * based on the value seleted in the dropdown 
 */
const populatePlayerDetails = () => {
    let playerID = playersDropdown.value;
    let playerDetail = getPlayerByID(playerID);

    //Construct header from template
    let header = HTMLUtils.replaceTemplate(scorecardTemplate.header, {
        playerName: getPlayerDisplayName(playerDetail),
        playerImageURL: "assets/p" + playerID + ".png",
        currentTeam: playerDetail.player.currentTeam.name.replace(/ /g, '')
    })

    //Construct list items from template
    let listItems = "";
    statsDisplayList.forEach(function (stat) {
        listItems += HTMLUtils.replaceTemplate(scorecardTemplate.listItem, {
            title: stat.title,
            value: stat.getValue(playerDetail.stats) //getStatsValuesOf(playerDetail.stats, stat.statsNames)
        })
    });

    //Construct 
    let statsSection = HTMLUtils.replaceTemplate(scorecardTemplate.statsSection, {
        playerName: getPlayerDisplayName(playerDetail),
        positionInfo: playerDetail.player.info.positionInfo.split(" ").pop(),
        listItem: listItems
    })

    document.querySelector("section.playerDetails").innerHTML = header + statsSection;
}

/**
 * Returns the player details from the passed in playerID
 * 
 * @param {Number} id 
 */
let getPlayerByID = id => {
    return playersList.filter(player => player.player.id == id).pop();
};

/**
 * Returns the sum of values of key(s) passed in statsNameArray from stats
 * 
 * @param {ObjectArray} stats 
 * @param {StringArray} statsNameArray 
 */
let getStatsValuesOf = (stats, statsNameArray) => {
    return stats.reduce((a, b) => {
        return (statsNameArray.indexOf(b.name) > -1) ? a + b.value : a;
    }, 0)
};

/**
 * Set player details to the scorecard component 
 * 
 * @param {ObjectArray} playersData 
 */
scorecard.setPlayers = playersData => {
    playersList = playersData;
    //when ever players list changes, repopulate the dropdown
    scorecard.setPlayersDropDown()
}
export default scorecard;