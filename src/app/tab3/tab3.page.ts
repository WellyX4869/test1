import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  urlImageStorage: string[] = [];
  namaGambar : string [] = [];
  constructor(
    private router : Router,
    private afStorage: AngularFireStorage, 
    public fotoService: FotoService
    ) { }

  async ngOnInit() {
  }

  async ionViewDidEnter() {
    this.tampilkanData();
  }

  tampilkanData() {
    this.urlImageStorage = [];
    var refImage = this.afStorage.storage.ref('testImgStorage');
    refImage.listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          itemRef.getMetadata().then(meta=>{
            this.namaGambar.unshift(meta.name);
          });
          itemRef.getDownloadURL().then(url => {
            this.urlImageStorage.push(url);
          });
        });
      }).catch((error) => {
        console.log(error);
      });
    
    console.log(this.urlImageStorage);
  }

  AksesFoto(index) {
    this.router.navigate(["/tab4/" + index]);
  }
}
