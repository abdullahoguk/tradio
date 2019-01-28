class StationItem extends HTMLElement {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.addEventListener('click', this.handleClick);
    }

    set station(val){
        this._station = val;
    } 

    get station(){
        return this._station;
    } 

    connectedCallback() {
        var base="/static/assets/logo/trt/"
        var logo = document.querySelector("vector-logos").querySelector(`#${this.station.id}`);
        this.innerHTML = `
           <span class="name">${this.station.name}</span>
           <svg class="logo" 
           xmlns:dc="http://purl.org/dc/elements/1.1/"
           xmlns:cc="http://creativecommons.org/ns#"
           xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
           xmlns:svg="http://www.w3.org/2000/svg"
           xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink"
           width="128"
           height="128"
           viewBox="0 0 320 320"
           version="1.1">
           ${logo.innerHTML}
           </svg>
        `;
    }

    handleClick(e) {
        var player = document.querySelector("radio-player");
        var playerStation = {
            "stationId": this.station.id,
            "stream": this.station.stream,
            "name": this.station.name,
            "darkColor":this.station["d-color"],
            "lightColor":this.station["l-color"]

        };
        player.setAttribute("status","playing");
        player.setAttribute("station",JSON.stringify(playerStation));
    }
}

customElements.define('station-item', StationItem);