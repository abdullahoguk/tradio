class RadioPlayer extends HTMLElement {
// Specify observed attributes so that attributeChangedCallback will work
    static get observedAttributes() {
        return ['station','status'];
    }
    
    constructor() {
        super();
        this.togglePlay = this.togglePlay.bind(this);
        //this.querySelector(".playButtonContainer").addEventListener('click', this.togglePlay);
    }

    connectedCallback() {
        
        if(this.getAttribute("status") == "setup"){
            var audio = document.createElement('audio');
            audio.className = "videoPlayer";
            

            this.innerHTML = `
            <div class="playButtonContainer">
                <div class="play" ></div>
            </div>
            <div class="setup playInfo">
                <span class="state">
                    Select a station from the list above to play
                </span> 
            </div>
        `
        this.querySelector(".playButtonContainer").addEventListener('click', this.togglePlay);
        this.appendChild(audio);

        }
    }

    attributeChangedCallback(attr, oldVal, newVal){
        if(attr=="station"){
            var station=JSON.parse(newVal);
            var audio = this.querySelector('audio');

            if (Hls.isSupported()) {
                var hls = new Hls();
                // bind them together
                hls.attachMedia(audio);
                hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                    console.log("video and hls.js are now bound together !");
                    hls.loadSource(station.stream);
                    hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                        console.log("manifest loaded, found " + data.levels.length + " quality level");
                    });
                 });
           }
           
          var playInfo = this.querySelector(".playInfo");
          playInfo.className = "playInfo";
          playInfo.innerHTML = `<div class="current"><span class="state">${this.getAttribute("status")}</span> <span class="name">${station.name}</span></div>
          <div class="logo">
          <svg  
            id="logo"
            xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:cc="http://creativecommons.org/ns#"
            xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
            xmlns:svg="http://www.w3.org/2000/svg"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            
            viewBox="0 0 320 260"
            version="1.1">
                ${document.querySelector("#"+station.stationId).innerHTML}
            </svg></div>
          `
          audio.play();
          document.querySelector("title").innerText="▶ "+station.name+" - TRT Radyoları";
          this.setAttribute("style",`background-color:${station.darkColor}`)
          this.querySelector(".current").setAttribute("style",`color:${station.lightColor}`)
          if(newVal=="paused"){
            this.querySelector(".play").setAttribute("style",`border-left-color:${station.lightColor}`);
          }
          else{
            this.querySelector(".play").setAttribute("style",`border-left-color:${station.lightColor}`)
          }

          //set title


        }//on station change

        else if(attr=="status" && newVal != "setup"){
            var state = this.querySelector(".state");
            state.innerHTML = `${newVal}`
        }

    }//attribute changes
    
    togglePlay() {
        var audio = document.querySelector('audio');
        if(audio.paused){
            audio.play();
            this.setAttribute("status","playing");
        }
        else if(audio.played){
            audio.pause();
            this.setAttribute("status","paused");
        }
        
    };    
} 
        
customElements.define('radio-player', RadioPlayer);