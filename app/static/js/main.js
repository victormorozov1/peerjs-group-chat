//$(document).ready(function() {
    var messList = [];
    var peer = new Peer();
    var conn_arr = [];
    var socket = io.connect(window.location.toString());
    var peer_id;

    function connect() {
        var name = getCookie('name');
        if (!name) {
            name = prompt("Please enter your nickname:", 'Your name');
            document.cookie = "name=" + name;
        }
        while (!peer_id){
            console.log('waiting');
            sleep(10000);

        }
        console.log('name = ', name, 'peer_id = ', peer_id);
        socket.emit('join', {name: name, peer_id: peer_id});
    }

    socket.on('all_users', function(data) {
        console.log(data['all_users']);
        for (let user_info of data['all_users']){
            let other_peer_id = user_info['peer_id'];
            if (peer_id !== other_peer_id) {
                connectToNode(other_peer_id);
            }
        }
    });

    function new_conn(c) {
        conn_arr.push(c);
        initConn(conn_arr.length - 1);
    }

    function addMess(mess) {
        messList.push(mess);
        document.getElementById('messages').innerHTML = messList.join("");
    }

    peer.on('open', function (peerID) {
        document.getElementById('myid').innerHTML = peerID;
        peer_id = peerID;
        console.log(peer_id);
        connect();
    });

    peer.on('connection', function (c) { //входящее соединение...
        console.log(c['peer']);
        new_conn(c);
    });

    function connectToNode(partnerPeer) { //исходящее соединение...
        new_conn(peer.connect(partnerPeer));
    }

    function initConn(ind) {
        conn_arr[ind].on('open', function () { //открыто соединение
            addMess("<div><h4>Соединение установлено</h4></div>", ind);
            conn_arr[ind].on('data', function (data) { //прилетело сообщение
                addMess("<div><b>Партнер: </b>" + data['content'] + "</div>");
            });
        });
        conn_arr[ind].on('close', function () {
            addMess('-----------Соединение разорвано-------------');
        });
    }

    function sendMess(data, ind) {
        if (data['type'] == 'message') {
            addMess("<div><b>Я: </b>" + data['content'] + "</div>");
        }
        for (let i = 0; i < conn_arr.length; i++) {
            if (i != ind) {
                conn_arr[i].send(data);
            }
        }
    }
//});