const form = document.getElementById("resetPasswordForm");

form.addEventListener("submit", evt =>{
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);

    fetch("/api/sessions/resetPassword", {
        method: "POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result=>{
        if(result.status === 200){
            console.log("Password reset completed successfully")
        }else{
            console.log("error");
            console.log(result)
        }
    })
    form.reset()
})