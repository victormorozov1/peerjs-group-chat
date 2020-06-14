from . import users


class User:
    def __init__(self, peer_id, name):
        self.name = name
        self.peer_id = peer_id
        users.append(self)

    def data(self):
        return {'name': self.name, 'peer_id': self.peer_id}

    def __str__(self):
        return f'User name={self.name}, peer_id={self.peer_id}'

    def __repr__(self):
        return f'<{self}>'
