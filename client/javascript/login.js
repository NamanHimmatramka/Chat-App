var loginForm = document.forms[0]
var socket = null
if(loginForm){
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const resp = await fetch(event.target.action, {
          method: "POST",
          body: new URLSearchParams(new FormData(event.target)),
        });
        const body = await resp.json();
        if(body.success){
          window.location = 'http://localhost:8000/'
        }
        else{
          window.alert("Please Verify Your Email")
        }
        console.log(body);
      });
}
else{
    console.log('no form')
}