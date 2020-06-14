var messList = [];		
var peer = new Peer();		
var conn_arr = [];

function addMess(mess) {
    messList.push(mess);
    document.getElementById('messages').innerHTML=messList.join("");
}

peer.on('open', function(peerID) {
    document.getElementById('myid').innerHTML=peerID;			
});

peer.on('connection', function(c) { //входящее соединение...
    conn_arr.push(c);
    initConn(conn_arr.length - 1);
});

function connectToNode(partnerPeer) { //исходящее соединение...
    conn_arr.push(peer.connect(partnerPeer));
    initConn(conn_arr.length - 1);
}

function initConn(ind) {
    conn_arr[ind].on ('open', function () { //открыто соединение
        addMess("<div><h4>Соединение установлено</h4></div>", ind);
        conn_arr[ind].on ('data', function (data) { //прилетело сообщение
            addMess("<div><b>Партнер: </b>"+data+"</div>");
        });
    });
    conn_arr[ind].on('close',function() {addMess('-----------Соединение разорвано-------------');});
}
function sendMess(elem, ind) {
    addMess("<div><b>Я: </b>"+elem.value+"</div>");
    for (let i = 0; i < conn_arr.length; i++){
        if (i != ind){
            conn_arr[i].send(elem.value);
        }
    }
    elem.value = "";
}