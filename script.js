import { countryList } from "./codes.js";
const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdownS=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg")

for(let select of dropdownS){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        } else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", evt=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (ele)=>{
    let currCode=ele.value;
    let countryCode=countryList[currCode];
    let imgLink=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=ele.parentElement.querySelector("img");
    img.src=imgLink;
};

btn.addEventListener("click", async(evt) =>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let respomse=await fetch(URL);
    let data= await respomse.json();
    let rate=data[toCurr.value.toLowerCase()];
    let finalAmount=amount.value * rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
})
