let xp_values = {
    weekly: 5000,
    daily: 3000,
    game_avg: 1200,
    game_bonuses: 100,
    bp: 1,
}

$(function() {
    set_week_to_week(false)

    let toggleSwitch = $("#toggle");
    let stateElement = $("#level-switch-label");

    let storedValue = localStorage.getItem("OWXPtoggleSwitchValue");
    if (storedValue !== null) {
        toggleSwitch.prop("checked", storedValue === "true");
        stateElement.text(storedValue === "true" ? "Level 200" : "Level 80");
    }

    // Add event listener to the toggle switch
    toggleSwitch.change(function() {
        let value = toggleSwitch.prop("checked");
        stateElement.text(value ? "Level 200" : "Level 80");
        localStorage.setItem("OWXPtoggleSwitchValue", value);
        set_week_to_week(value)
    });
})


function set_week_to_week(level_200) {
    $(".week:not(.week-header)").remove()

    let curr_date = new Date()
    let season_start_unix = 1681236000
    let season_start = new Date(season_start_unix * 1000)
    let season_end_unix = 1686592800
    let season_end = new Date(season_end_unix * 1000)
    let days_remaining = Math.ceil( Math.abs(curr_date - season_end) / (1000 * 60 * 60 * 24) )
    let total_days = Math.ceil(Math.abs(season_start - season_end) / (1000 * 60 * 60 * 24) + 2)
    let total_weeks = Math.floor(total_days / 7)
    let max_level = level_200 ? 200 : 80
    let bp_per_week = max_level / total_weeks

    $("#days_remaining").text(days_remaining)
    $("#total_days").text(total_days)

    // Calculate the total number of milliseconds between the start and end dates
    const totalMilliseconds = season_end.getTime() - season_start.getTime();
    // Calculate the number of milliseconds between the start date and the current date
    const currentMilliseconds = curr_date.getTime() - season_start.getTime();
    // Calculate the percentage of time that has passed between the start and end dates
    const percentageOfTime = currentMilliseconds / totalMilliseconds;
    // Calculate the current week based on the percentage of time that has passed
    const currentWeek = Math.floor(percentageOfTime * 9) + 1;

    for (let i = 0; i < total_weeks; i++) {
        $("#week_list").append(
            `<li class="week ${i === currentWeek ? 'active' : ''}">
                <p class="tier">${Math.ceil(bp_per_week * (i + 1))}</p>
                <p class="xp-req">${Math.ceil(bp_per_week * (i + 1)) * 10000}</p>
                <p class="week-label">${i + 1}</p>
                <p class="days-left">${total_days - ((7 * i) + 1)}</p>
            </li>`
        )
    }
}
