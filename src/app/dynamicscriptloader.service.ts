import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  
  { name: 'mainjs', src: '../assets/main.js' },
  { name: 'adapterlatest', src: 'https://webrtc.github.io/adapter/adapter-latest.js' },
  { name: 'socketiojs', src: 'https://www.webrtc-experiment.com/socket.io.js' },
  { name: 'RTCPeerConnectionv15js', src: 'https://www.webrtc-experiment.com/RTCPeerConnection-v1.5.js' },
  { name: 'broadcastjs', src: 'https://www.webrtc-experiment.com/broadcast/broadcast.js' },
  { name: 'broadcastuijs', src: 'https://www.webrtc-experiment.com/broadcast/broadcast-ui.js' },
];

declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class DynamicScriptLoaderService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  //IE
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                }
            };
        } else {  //Others
            script.onload = () => {
                this.scripts[name].loaded = true;
                resolve({script: name, loaded: true, status: 'Loaded'});
            };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }


}
