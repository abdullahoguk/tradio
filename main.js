"use strict"
import "./station-item.js";
import "./radio-player.js";
import "./vector-logos.js";


var stationsJSON;
const radioListContainer = document.querySelector(".radioList");
const appContainer = document.querySelector(".app");
const logos = document.querySelector("vector-logos");


document.addEventListener('load', main());

async function main(){
    await loadJSONAsync("data.json")
      .then((data) => {stationsJSON = data.stations; })
      .catch(reason => console.log(`JSON okunurken hata: ${reason.message}`))
    stationsJSON.trt.forEach(station => {
         const el = document.createElement("station-item");
         el.station = station;
         radioListContainer.appendChild(el);
    });

    const player = document.createElement("radio-player");
         player.setAttribute("status","setup");
         player.className = "player"
         appContainer.appendChild(player);
     
};

document.querySelector(".appLogo").innerHTML = `
    <svg  
            xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:cc="http://creativecommons.org/ns#"
            xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
            xmlns:svg="http://www.w3.org/2000/svg"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            
            viewBox="0 0 320 260"
            version="1.1">
            ${logos.querySelector("#trtradyolari").innerHTML}
            </svg>
`
  
function listRadioStations(data){
};


async function loadJSONAsync (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
  
  


