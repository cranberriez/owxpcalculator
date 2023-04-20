let xp_values = {
    weekly: 5000,
    daily: 3000,
    game_avg: 1200,
    game_bonuses: 100,
    bp: 1,
}

let curr_date = new Date()
let season_start_unix = 1681236000
let season_start = new Date(season_start_unix * 1000)
let season_end_unix = 1686592800
let season_end = new Date(season_end_unix * 1000)
let days_remaining = Math.ceil( Math.abs(curr_date - season_end) / (1000 * 60 * 60 * 24) )
let total_days = Math.ceil(Math.abs(season_start - season_end) / (1000 * 60 * 60 * 24) + 2)
let total_weeks = Math.ceil(total_days / 7)
let bp_per_week = 80 / total_weeks

$(function() {
    $("#days_remaining").text(days_remaining)
    $("#total_days").text(total_days)

    for (let i = 0; i < total_weeks - 1; i++) {
        $("#week_list").append(
            `<li class="week-to-week">
                <p class="tier">${bp_per_week * (i + 1)}</p>
                <p class="week">${i + 1}</p>
                <p class="days-left">${total_days - ((7 * i) + 1)}</p>
            </li>`
        )
    }
})

