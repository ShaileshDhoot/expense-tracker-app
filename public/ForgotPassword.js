function forgotpassword(e) {
    e.preventDefault()
    const form = new FormData(e.target)

    const userDetails = {
        email: form.get("email"),
    }
    
    axios.post('/password/forgotpassword', userDetails)
    .then(response => {
        if(response){
        document.body.innerHTML += '<div style="color:red;">Mail Successfully sent <div>'
        alert('Reset link sent to your email')
        window.location.href = '/login.html'
        }else{
            alert('user doesnot exist')
        }
        
    })
    .catch(err => {
        // Display error message to the user
        document.body.innerHTML += `<div style="color:red;">${err.response.data.message} <div>`;
    })
}
