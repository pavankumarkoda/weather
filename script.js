// let num=[1, 4, 5, 6, 2, 1,3 ,5 ,7 ,8];
// num.sort((a, b) => b-a);
// console.log(num);


// let people= [{name:"avan", age:17, gpa:8.7},
// {name:"van", age:133, gpa:8.7},
// {name:"pavan", age:137, gpa:8.7}
// ]


// people.sort((a,b)=>b.name.localeCompare(a.name))
// console.log(people)
// const date = new Date();
// console.log(date)


// function datee(){
//     alert(`today date is ${date}`)
// }
// setTimeout(datee,3000);

// function update(){
//     const now = new Date();
//     const hours= now.getHours().toString().padStart(2,0);
//     const mins= now.getMinutes().toString().padStart(2,0);
//     const sec= now.getSeconds().toString().padStart(2,0);
//     const time= `${hours}:${mins}:${sec}`;
//     document.getElementById("clock").textContent= time
// }
// update();
// // setInterval(update,1000)
// const display = document.getElementById("display");
// let timer = null;
// let startTime = 0;
// let elapsedTime = 0;
// let isRunning = false;

// function start() {
//     if (!isRunning) {
//         startTime = Date.now(); // Corrected
//         timer = setInterval(update, 10);
//         isRunning = true;
//     }
// }

// function stop() {
//     clearInterval(timer); // Clear the interval
//     isRunning = false;
// }

// function reset() {
//     clearInterval(timer);
//     isRunning = false;
//     elapsedTime = 0;
//     display.textContent = "00:00:00:00";
// }

// function update() {
//     const currentTime = Date.now();
//     elapsedTime = currentTime - startTime;
//     let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
//     let mins = Math.floor(elapsedTime / (1000 * 60) % 60);
//     let sec = Math.floor(elapsedTime / 1000 % 60);
//     let mil = Math.floor(elapsedTime / 10 % 100);

//     display.textContent = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}:${mil.toString().padStart(2, '0')}`;
// }


// const choices=["rock", "paper", "scissors"];
// const playerDisplay=document.getElementById("playerDisplay")
// const computerDisplay=document.getElementById("computerDisplay")
// const resultDisplay=document.getElementById("resultDisplay")


// function playGame(playerChoice){
//     const computerChoice=choices[Math.floor(Math.random()*3)];
//     let result="";
//     if(playerChoice===computerChoice){
//         result="It's a tie";
//     }
//     else {
//         switch(playerChoice){
//             case "rock":
//               result= (computerChoice==="scissors")? "YOU WIN":"YOU LOSE";
//             break;
//             case "paper":
//                 result= (computerChoice==="rock")? "YOU WIN":"YOU LOSE";
//             break;
//             case "scissors":
//                 result=  (computerChoice==="paper")? "YOU WIN":"YOU LOSE";
//             break;
//         }
//     }
//     playerDisplay.textContent=`PLAYER : ${playerChoice}`;
//     computerDisplay.textContent=`COMPUTER : ${computerChoice}`;
//     resultDisplay.textContent=result;
// }


const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apiKey="859b0af4c3acef31f10449da3ecce136";
weatherForm.addEventListener("submit",async event=>{


    event.preventDefault();
    const city= cityInput.value;

    if(city){
        try{
            const weatherData= await getWeatherData(city);
            displayWeatherInfo(weatherData);

        }catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("please enter a city")
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Couldn't fetch data");
    }
    return await response.json();
}

function displayWeatherInfo(data){
const {name: city, main: {temp, humidity}, weather:[{description, id}]}=data;
card.textContent="";
card.style.display="flex";

const cityDisplay=document.createElement("h1");
const tempDisplay=document.createElement("p");
const HumidityDisplay=document.createElement("o");
const descDisplay=document.createElement("p");
const weatherEmoji=document.createElement("p");

cityDisplay.textContent=city;
tempDisplay.textContent=`${(temp-273.15).toFixed(1)}°C`;
HumidityDisplay.textContent=`Humidity: ${humidity}%`;
descDisplay.textContent=description;
weatherEmoji.textContent=getWeatherEmoji(id);



cityDisplay.classList.add("cityDisplay");
tempDisplay.classList.add("tempDisplay");
HumidityDisplay.classList.add("HumidityDisplay")
descDisplay.classList.add("descDisplay");
weatherEmoji.classList.add("weatherEmoji");

card.appendChild(cityDisplay);
card.appendChild(tempDisplay);
card.appendChild(HumidityDisplay);
card.appendChild(descDisplay);
card.appendChild(weatherEmoji);


}
function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId>=200 && weatherId<=300):
        return "☁";
        case (weatherId>=300 && weatherId<=400):
            return "🌨";
            case (weatherId>=500 && weatherId<=600):
                return "🌨🌧";
                case (weatherId>=600 && weatherId<=700):
                    return "❄";
                    case (weatherId>=700 && weatherId<=800):
                        return "🌫";
                        case (weatherId===800):
                            return "☀";
                            case (weatherId>=801 && weatherId<=810):
                                return "☁";
                                default:
                                    return"⁉"
    }
}
function displayError(message){

    const errorDisplay=document.createElement("p");
    errorDisplay.textContent= message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);
}
