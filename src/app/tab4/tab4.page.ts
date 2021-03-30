import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { FotoService, Photo } from '../services/foto.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(public fotoService: FotoService, private route: ActivatedRoute, private afStorage:AngularFireStorage) { }

  urlImageStorage : string[] = [];
  index = -1;
  
  ngOnInit() {
    this.index = parseInt(this.route.snapshot.paramMap.get("index"));
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
          itemRef.getDownloadURL().then(url => {
            this.urlImageStorage.unshift(url);
          });
        });
      }).catch((error) => {
        console.log(error);
      });

    console.log(this.urlImageStorage);
  }
}
