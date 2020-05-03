import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from './dynamicscriptloader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'webrtc1';

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService){}

  ngOnInit() {
    if (!location.hash.replace('#', '').length) {
      location.href = location.href.split('#')[0] + '#' + (Math.random() * 100).toString().replace('.', '');
      location.reload();
    }
    
    document.createElement('article');
    document.createElement('footer');
    this.loadScripts();
    
  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('adapterlatest','socketiojs', 'RTCPeerConnectionv15js', 'broadcastjs', 'broadcastuijs').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }
}
