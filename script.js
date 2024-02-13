const Base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load" , () => {
    update();
})

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode ==="USD"){
            newOption.selected = "selected"
        }
        else if(select.name === "to" && currCode ==="INR"){
            newOption.selected = "selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change" , (eve) =>{
        updateFlag(eve.target);
    })
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let NewSourcelink = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = NewSourcelink;
}

btn.addEventListener("click" ,  (evt) =>{
    evt.preventDefault();
    update();
    
})

const update = async () => {
    let amount = document.querySelector(".amount input");
    let amountval = amount.value;
    if(amountval < 1 || amountval === ""){
        amountval = 1;
        amount.value = "1";
    }

    const URL = `${Base_url}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json()
   
    let rate = data[tocurr.value.toLowerCase()];
    let finalamount = amountval * rate ;
    msg.innerText = `${amountval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`
}