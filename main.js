
/*var yourVideo = document.getElementById("localStream");*/
var friendsVideo = document.getElementById("remoteStream");
function openStream() {
    
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(stream => playStream('localStream', stream));
        /*.then(stream => yourVideo.srcObject = stream)*/
        /*.then(stream => friendsVideo.srcObject(stream))*/
}
function playStream(idVideo, stream) {
    var yourVideo = document.getElementById(idVideo);
    yourVideo.srcObject = stream;

    yourVideo.play();
}
/*openStream().then(stream => playStream(localStream, stream));*/
/*openStream().then(stream => playStream('localStream', stream));*/

const peer = new Peer({ key: 'peerjs' });
peer.on('open', id => $('#my-peer').append(id));

$('#btnCall').click(() => {
    const id = $('#remoteID').val();
    return openStream()
        .then(stream => {
            playStream('localStream', stream);
            const call = peer.call(id, stream);
            call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
        });

});

peer.on('call', call => {
    return openStream()
        .then(stream => {
            call.answer(stream);
            playStream('localStream', stream);
            call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
        });
});