from flask import Blueprint

main = Blueprint('main', __name__)
users = []

from . import routes, socketio_events

