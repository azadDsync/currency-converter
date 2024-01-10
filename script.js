const baseURL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let dropdowns=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("button");
let fromCur= document.querySelector(".from select");
let toCur= document.querySelector(".to select");
let msg =document.querySelector(".msg");
window.addEventListener("load",()=>{
 updateExchange();
});
for(let select of dropdowns){
    for(currency in countryList){
        let newOption= document.createElement("option");
        newOption.innerText=currency;
        newOption.value=currency;
        if (select.name==="from" && currency==="USD") {
            newOption.selected="selected";
        }else if(select.name==="to" && currency==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

updateFlag =(element)=>{
    let country= countryList[element.value];
    let newSrc=`https://flagsapi.com/${country}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
   updateExchange();
});
const updateExchange=async()=>{
    let amount=document.querySelector(".amount input");
    let aValue=amount.value;
    if (aValue=="" || aValue<1) {
        aValue=1;
        amount.value="1";
    }
    let URL=`${baseURL}/${fromCur.value.toLowerCase()}/${toCur.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    let data =await response.json();
    
    let rate=data[toCur.value.toLowerCase()];
    let net= aValue*rate;
    console.log(aValue*rate);
    msg.innerText=`${aValue} ${fromCur.value} = ${net} ${toCur.value.toUpperCase()}`;
}