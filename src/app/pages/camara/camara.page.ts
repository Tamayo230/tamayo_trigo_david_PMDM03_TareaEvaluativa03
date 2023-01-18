import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';

//import { Camera, CameraResultType } from '@capacitor/camera';


@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {
  
  url: string | undefined;
  urlList:string[] = [];
  constructor() { }

  ngOnInit() {
  }
 
 /*public async takePicture(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    };
     this.url = image.webPath;*/

    public async sacarFoto() {
      // Definir características de la foto
      let caracteristicasFoto: ImageOptions = {
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      };
      
      const foto: Photo = await Camera.getPhoto(caracteristicasFoto);
      console.log(foto);
      this.url = foto.webPath;
      //this.urlList.push(image.webPath);
    }
    
   
  
    
  

}
