function addMonthData(element) {
    const table = document.getElementById("monthlyexpense");
    const fragment = document.createDocumentFragment();
    const row = document.createElement("tr");
    const dateCell = document.createElement("td");
    const amountCell = document.createElement("td");
    const descriptionCell = document.createElement("td");
    const categoryCell = document.createElement("td");
    const incomeCell = document.createElement("td");

    const date = new Date(element.createdAt); 
    const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-IN', options);
    const dateText = document.createTextNode(formattedDate);

    const descriptionText = document.createTextNode(element.description);
    const categoryText = document.createTextNode(element.category);
    const amountText = document.createTextNode(element.amount);
    const incomeText = document.createTextNode('INCOME')
    dateCell.appendChild(dateText);
    amountCell.appendChild(amountText);
    descriptionCell.appendChild(descriptionText);
    categoryCell.appendChild(categoryText);
    incomeCell.appendChild(incomeText)
    row.appendChild(dateCell);        
    row.appendChild(descriptionCell);
    row.appendChild(categoryCell);
    row.appendChild(incomeCell)
    row.appendChild(amountCell);
    fragment.appendChild(row);
    table.appendChild(fragment);
  }

  function addYearData(element) {
    const table = document.getElementById("yearlyexpense");
    const fragment = document.createDocumentFragment();
    const row = document.createElement("tr");
    const idCell = document.createElement("td");
    const amountCell = document.createElement("td");
    const descriptionCell = document.createElement("td");
    const categoryCell = document.createElement("td");
    const incomeCell = document.createElement("td");
    const idText = document.createTextNode(element.id);
    const descriptionText = document.createTextNode(element.description);
    const categoryText = document.createTextNode(element.category);
    const amountText = document.createTextNode(element.amount);
    idCell.appendChild(idText);
    amountCell.appendChild(amountText);
    descriptionCell.appendChild(descriptionText);
    categoryCell.appendChild(categoryText);
    row.appendChild(idCell);
    row.appendChild(amountCell);
    row.appendChild(descriptionCell);
    row.appendChild(categoryCell);
    fragment.appendChild(row);
    table.appendChild(fragment);
  }


  window.addEventListener("DOMContentLoaded",async () => {
    try{
      const token = await localStorage.getItem("token"); 
       showDownloadButton(token)
      const response = await axios.get("http://34.227.25.232/expense/all", { headers: { "Authorization": token } })          
      response.data.forEach((element) => {
          addMonthData(element);            
      })
    }
    catch(err){console.log(err)}
  });

function showDownloadButton(token){
  try{
    const tokenParts = token.split('.');
    const payload = JSON.parse(atob(tokenParts[1])); // inbuilt front end method to decode jwt token in frontend
    const isPremium = payload.isPremiumUser
    console.log('isPremium:',isPremium)
    if(isPremium){
        const downloadBtn = document.createElement('button')            
        downloadBtn.id = "download"
        downloadBtn.textContent = "Download Report" 
        const show = document.getElementById('showbtn')
        show.appendChild(downloadBtn) 
        
        downloadBtn.addEventListener('click', download);    
    }  
   }catch(err){
    console.log(err);
   }
}



async function download(){
  try{
    //console.log('download button clicked');
    const token = localStorage.getItem('token')
    //console.log(token);
    const response = await axios.get('http://34.227.25.232/expense/download', { headers: {"Authorization" : token} })        
    //console.log(response)
    var a = document.createElement("a")
    a.href = response.data.fileURL
    a.download = a.href
    a.click()
           
  }      
  catch(err) {
    console.log(err,'error in onclick download() in expense.html file')
  }       
}
  