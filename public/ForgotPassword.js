function forgotpassword(e) {
    e.preventDefault()
    const form = new FormData(e.target)

    const userDetails = {
        email: form.get("email"),
    }
    
    axios.post('http://3.83.64.232/password/forgotpassword',userDetails).then(response => {
        if(response.status === 202){
            document.body.innerHTML += '<div style="color:red;">Mail Successfuly sent <div>'
        } else {
            throw new Error('Something went wrong!!!')
        }
    }).catch(err => {
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    })
}

