class RadioPlayer extends HTMLElement {
// Specify observed attributes so that attributeChangedCallback will work
    static get observedAttributes() {
        return ['station'];
    }
    
    constructor() {
        super();    
      }

    connectedCallback() {
        if(this.getAttribute("status") == "setup"){
            var video = document.createElement('video');
            video.className = "videoPlayer";
            

            this.innerHTML = `
            <span class="setup"> Select a station from the list above to play</span>
        `
        this.appendChild(video);}
    }

    attributeChangedCallback(attr, oldVal, newVal){
        if(attr=="station"){
            var station=JSON.parse(newVal);
            var video = this.querySelector('video');

            if (Hls.isSupported()) {
                var hls = new Hls();
                // bind them together
                hls.attachMedia(video);
                hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                    console.log("video and hls.js are now bound together !");
                    hls.loadSource(station.stream);
                    hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                        console.log("manifest loaded, found " + data.levels.length + " quality level");
                    });
                 });
           }
           /*
           var playInfo = document.createElement("span");
           playInfo.className = "current";
           playInfo.innerHTML = `▶ Playing ${station.name}`
           this.appendChild(playInfo);
           */
          var playInfo = this.querySelector("span");
          playInfo.className = "current";
          playInfo.innerHTML = `▶ Playing ${station.name}`
          video.play();

        }
        
    }
      
} 
        
      

customElements.define('radio-player', RadioPlayer);