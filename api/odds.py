from flask import Blueprint, request
from logic.odds import teamOdds


oddsBp = Blueprint('odds', __name__)


@oddsBp.route('/', methods=['POST'])
def odds():
    data: {
        "data": dict,
        "odds": list[int],
        "place": str,
        "time": str
    } = request.get_json()

    return teamOdds(**data)
