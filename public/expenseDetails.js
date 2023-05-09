function addMonthData(element) {
  const table = document.getElementById("monthlyexpense");
  table.innerHTML = ""
  const fragment = document.createDocumentFragment();
  const row = document.createElement("tr");
  const dateCell = document.createElement("td");
  const amountCell = document.createElement("td");
  const descriptionCell = document.createElement("td");
  const categoryCell = document.createElement("td");

  const date = new Date(element.createdAt); 
  const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
  const formattedDate = date.toLocaleDateString('en-IN', options);
  const dateText = document.createTextNode(formattedDate);

  const descriptionText = document.createTextNode(element.description);
  const categoryText = document.createTextNode(element.category);
  const amountText = document.createTextNode(element.amount);
  dateCell.appendChild(dateText);
  amountCell.appendChild(amountText);
  descriptionCell.appendChild(descriptionText);
  categoryCell.appendChild(categoryText);
  incomeCell.appendChild(incomeText)
  row.appendChild(dateCell);        
  row.appendChild(descriptionCell);
  row.appendChild(categoryCell);
  row.appendChild(amountCell);
  fragment.appendChild(row);
  table.appendChild(fragment);
}
const monthlyBtn = document.getElementById("monthlyBtn");
monthlyBtn.addEventListener("click", () => {
  const monthSelect = document.getElementById("monthSelect");
  const selectedMonth = monthSelect.value;
  const token = localStorage.getItem('token')
  axios.get(`/expense/all/selectMonth?month=${selectedMonth}`,{headers:{"Authorization": token}})
    .then((response) => {
      
      response.data.forEach((element) => {
        addMonthData(element);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});








document.getElementById("yearlyBtn").addEventListener("click", addYearData);
function addYearData() {
  const token = localStorage.getItem('token')
  axios.get('/expense/all/monthly',{headers:{"Authorization": token}})
  .then(response => {
    
    response.data.forEach(element=>{
      const table = document.getElementById("yearlyexpense");
      table.innerHTML = ""
      const fragment = document.createDocumentFragment();
      const row = document.createElement("tr");
      const idCell = document.createElement("td");
      const descriptionCell = document.createElement("td");
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const monthIndex = monthNames.indexOf(element.month);

      const idText = document.createTextNode(monthNames[monthIndex]);
      const descriptionText = document.createTextNode(element.totalAmount)
      idCell.appendChild(idText);
      descriptionCell.appendChild(descriptionText);
      row.appendChild(idCell);
      row.appendChild(descriptionCell);
      fragment.appendChild(row);
      table.appendChild(fragment);
    })
  }).catch(err=>console.log(err))
}

      

             


window.addEventListener("DOMContentLoaded",async () => {
  try{
    const token = localStorage.getItem("token"); 
     showDownloadButton(token)
   
  }
  catch(err){console.log(err)}
});


function base64UrlToUint8Array(base64Url) {
  let padding = '='.repeat((4 - base64Url.length % 4) % 4);
  let base64 = (base64Url + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  let rawData = window.atob(base64);
  let outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

function showDownloadButton(token){
try{
  
  const tokenParts = token.split('.');
  const payload = JSON.parse(new TextDecoder().decode(base64UrlToUint8Array(tokenParts[1]))); // decode JWT token using TextDecoder()
  const isPremium = payload.isPremiumUser;
  if(isPremium){
      const downloadBtn = document.createElement('button')            
      downloadBtn.id = "download"
      downloadBtn.className = "btn"
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
  const response = await axios.get('/expense/download', { headers: {"Authorization" : token} })        
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
