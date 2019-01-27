"use strict"
import "./station-item.js";
import "./radio-player.js";

var stationsJSON;
const radioListContainer = document.querySelector(".radioList");
const appContainer = document.querySelector(".app");

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
    
    /*
    [...document.querySelectorAll("station-item")].forEach(el => {
        el.onclick = function(e){
           var playerStation = {
                   "station-id": this.station.id,
                   "stream": this.station.stream,
                   "name": this.station.name
           };

           player.setAttribute("station",JSON.stringify(playerStation));

        }
   });
   */

    const player = document.createElement("radio-player");
         player.setAttribute("status","setup");
         player.className = "player"
         appContainer.appendChild(player);
     
};
  
function listRadioStations(data){
};


async function loadJSONAsync (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
  
  


