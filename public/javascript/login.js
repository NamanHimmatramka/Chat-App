var connectionOptions = {

    "force new connection": true,
    "reconnectionAttempts": "infinity",
    "timeout": 10000,
    "transports": ["websocket"]
    }
var loginForm = document.forms[0]
if(loginForm){
    loginForm.addEventListener("submit", async (event) => {
        console.log('Infunction')
        event.preventDefault();
        const resp = await fetch(event.target.action, {
          method: "POST",
          body: new URLSearchParams(new FormData(event.target)),
        });
        const body = await resp.json();
        if(body.success){
            console.log("insuccess")
            const socket = io('http://localhost:8000', connectionOptions)
            socket.emit('hey')
            if(socket){
                window.location = "http://localhost:8000/"
            }
        }
        console.log(body);
      });
}
else{
    console.log('no form')
}