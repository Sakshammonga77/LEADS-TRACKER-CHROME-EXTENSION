let myLeads = []


const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const deleatBtn = document.getElementById("deleat-btn")
const tabBtn = document.getElementById("tab-btn")
if (leadsFromLocalStorage){

    myLeads = leadsFromLocalStorage 
    render(myLeads)
}

tabBtn.addEventListener("click" , function(){
    chrome.tabs.query({active: true , currentWindow: true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)

    } )  
    // console.log(tabs.URL)
 
    
})  
 
function render(leads) {
    let listItems = "" 
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    } 
    ulEl.innerHTML = listItems
}


inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
   
}) 

deleatBtn.addEventListener("dblclick", function(){
//   console.log("double clicked")
  localStorage.clear()
  myLeads = []
  render(myLeads)

})
