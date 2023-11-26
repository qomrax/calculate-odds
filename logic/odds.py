from scipy.stats import poisson


def expectedGoals(data: dict, place: str, time: str) -> float:
    if place not in ["home", "away", "total"]:
        raise Exception("place must be home or away")

    if time not in ["remain", "all"]:
        raise Exception("time must be remain or all")

    if place == "total":
        return expectedGoals(data, "home", time) + expectedGoals(data, "away", time)

    expectedGoalsInRemainingTime = data["preXs"][place] / data["preXg"][place] * (
        data["liveXg"][place] - data["currentScore"][place])

    expectedGoalsInRemainingTime = expectedGoalsInRemainingTime if time == "remain" else expectedGoalsInRemainingTime + \
        data["currentShots"][place]

    return round(expectedGoalsInRemainingTime, 2)


def teamOdds(data: dict, odds: list[int], place: str, time: str) -> dict:
    exGoals = expectedGoals(data, place, time)

    calculatedOdds = []
    for odd in odds:
        over = data["payback"] / \
            (1 - poisson.cdf(odd - data["currentShots"][place], exGoals))
        under = data["payback"] / \
            poisson.cdf(odd - data["currentShots"][place], exGoals)

        calculatedOdds.append({
            "over": round(over, 2),
            "under": round(under, 2)
        })

    return calculatedOdds
