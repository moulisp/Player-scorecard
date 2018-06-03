/**
 * Templates string constants for scorecard component
 */

export default {
    header: "<header><img src='{{playerImageURL}}' alt='{{playerName}}'><div class='team' ><span class='badge-icon-{{currentTeam}}'> </span></div></header>",
    statsSection: "<section class='stats'><h1> {{playerName}} </h1><h3>{{positionInfo}}</h3><ul>{{listItem}}</ul></section>",
    listItem: "<li><dl><dt>{{title}}</dt><dd>{{value}} </dd></dl></li>",
    appearanceTitle: 'Appearances',
    goalsTitle: 'Goals',
    assistTitle: 'Assists',
    goalsPerMatchTitle: 'Goals per match',
    passesPerMinTitle: 'Passes per minute'
};