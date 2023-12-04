from flask import Flask, request, jsonify
from scipy.stats import poisson

import argparse

app = Flask(__name__)


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


def teamOdds(data: dict, odds: list[float], place: str, time: str) -> dict:
    exGoals = expectedGoals(data, place, time)

    calculatedOdds = []
    for odd in odds:
        over = round(data["payback"] /
                     (1 - poisson.cdf(odd - data["currentShots"][place], exGoals)), 2)
        under = round(data["payback"] /
                      poisson.cdf(odd - data["currentShots"][place], exGoals), 2)

        if over == float("inf") or over == float("-inf") or over != over:
            over = None

        if under == float("inf") or under == float("-inf") or under != under:
            under = None

        calculatedOdds.append({
            "over": over,
            "under": under,
            "odd": odd
        })

    return calculatedOdds


@app.route('/team-odds', methods=['POST'])
def calculate_team_odds():
    try:
        data = request.get_json()
        result = teamOdds(**data)
        return jsonify({"result": result}), 200
    except Exception as e:
        return jsonify({"error": f"Error: {e}"},  allow_nan=False), 500


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", default=5000, type=int,
                        help="Port to run the server on")
    parser.add_argument("--env", default="development",
                        type=str, choices=["development", "production"])

    args = parser.parse_args()

    app.run(port=args.port, debug=args.env == "development")
