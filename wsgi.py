from flask import Flask
from api.odds import oddsBp

app = Flask(__name__)
app.register_blueprint(oddsBp, url_prefix='/odds')
