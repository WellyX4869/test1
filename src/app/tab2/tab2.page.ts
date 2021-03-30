import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private afStorage: AngularFireStorage,
    public fotoService: FotoService
  ) { }

  async ngOnInit() {
    this.fotoService.loadFoto();
  }

  TambahFoto() {
    this.fotoService.tambahFoto();
  }

  urlImageStorage: string[] = [];

  uploadFoto(index) {
    
    this.urlImageStorage = [];
    const imgFilepath = `testImgStorage/${this.fotoService.dataFoto[index].filePath}`;
    this.afStorage.upload(imgFilepath, this.fotoService.dataFoto[index].dataImage).then(() => {
      this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url) => {
        this.urlImageStorage.unshift(url)
      });
    });
    alert("Upload Successful!!");
  }
}
