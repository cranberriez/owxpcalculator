let xp_values = {
    weekly: 55000,
    daily: 9000,
    game_avg: 1085,
    game_bonuses: 100,
}

let curr_date = new Date()
let season_end_unix = 1675756800
let season_end = new Date(season_end_unix * 1000)
let days_remaining = Math.ceil( Math.abs(curr_date - season_end) / (1000 * 60 * 60 * 24) )


document.getElementById("days_remaining").innerText = days_remaining
document.getElementById("chal_possible_levels").innerText = ((xp_values.daily * days_remaining) + ( Math.ceil(days_remaining / 7) * xp_values.weekly )) / 10000


function calcLevels() {
    let curr_level = parseInt( document.getElementById("curr_level").value )
    let want_level = parseInt( document.getElementById("want_level").value )
    let daily_done = document.getElementById("daily_done").checked
    let weekly_done = document.getElementById("weekly_done").checked

    document.getElementById("curr_level").value = isNaN(curr_level) ? 0 : curr_level
    document.getElementById("want_level").value = isNaN(want_level) ? 0 : want_level

    let dailies_xp = (xp_values.daily * (daily_done ? days_remaining - 1 : days_remaining))
    let weekly_xp = ( Math.ceil((weekly_done ? days_remaining - 7 : days_remaining) / 7) * xp_values.weekly )
    let challenge_levels = (dailies_xp + weekly_xp) / 10000
    document.getElementById("chal_possible_levels").innerText = challenge_levels

    let levels_needed = (want_level - curr_level) - challenge_levels
    document.getElementById("chal_possible_levels").innerText = curr_level + challenge_levels

    let games_needed = (levels_needed * 10000) / xp_values.game_avg
    document.getElementById("games_needed").innerText = games_needed > 0 ? Math.ceil( games_needed ) : 0

    document.getElementById("games_per_day").innerText = games_needed > 0 ? Math.ceil(games_needed / days_remaining) : 0
}