from flask_socketio import emit, join_room, leave_room
from .. import socketio
from .classes import User
from . import users


@socketio.on('join', namespace='/')
def join(data):
    emit('all_users', {'all_users': [user.data() for user in users]})

    name, peer_id = data['name'], data['peer_id']
    new_user = User(peer_id, name)
    print('new user joined: ', new_user)
    #emit('new_user_name')
    join_room(0)


