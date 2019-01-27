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
        this.innerHTML = `
           <span class="name">${this.station.name}</span>
           ${this.station.id}
        `;
    }

    handleClick(e) {
        var player = document.querySelector("radio-player");
        var playerStation = {
            "station-id": this.station.id,
            "stream": this.station.stream,
            "name": this.station.name
        };
        player.setAttribute("status","playing");
        player.setAttribute("station",JSON.stringify(playerStation));
    }
}

customElements.define('station-item', StationItem);