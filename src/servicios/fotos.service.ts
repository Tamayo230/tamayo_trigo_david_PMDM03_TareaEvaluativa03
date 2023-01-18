import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FotosService {
  public urlFotos: string[] = [];
  listaUrl: string[] = [];
  
  listaPath: any;
  usarStorage: any;
  platform: any;

  constructor() { }

  // Devolvemos el array para poder trabajar con él
  public getFotos() {
    return this.urlFotos;
  }

  // Define las características de la foto, la saca y almacena su URL
  public async sacarFoto() {
    // Definir características de la foto
    let caracteristicasFoto: ImageOptions = {
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    };
    const foto: Photo = await Camera.getPhoto(caracteristicasFoto);

    // Se obtiene la URL y se añade al principio del array
    
    let UrlFoto: string | undefined;
    UrlFoto = foto.webPath;
   //this.urlFotos.unshift(UrlFoto);
  }

  private async savePicture(image: any){

    let base64Data = image.base64String;
    // Guarda el fichero
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });
    
    // Si trabajamos con el navegador, guardamos solo el nombre del fichero. Lo necesitaremos para 
    // Con dispositivos móviles guardaremos la ruta que nos devuelve
    let ruta: string;
  
    if (this.platform.is('hybrid')) {
      ruta = savedFile.uri;
    } else {
      ruta = fileName;
  
    }
  
    this.listaPath.push(ruta);
  
    // Almacenamos los datos de las fotos en Storage para poder acceder a ellas
    this.usarStorage.setObject("rutas", this.listaPath);
  }
  
  private async loadSaved() {
    // Recupera los datos de Storage en formato string
    const photoList = await this.usarStorage.getObject("rutas");

    // Lo parsea a un array de objetos IFoto y lo almacena en el atributo accesoFotos
    // Si no obtiene datos inicializará el array para poder empezar a almacenar fotos.
    this.listaPath = JSON.parse(photoList.value) || [];    
    
    // Se obtiene una URL válida para visualizar cada foto guardada en el sistema de archivos
    // En los navegadores debemos cargar las imágenes en formato base64 para que se visualicen correctamente
    // En los dispositivos podemos obtener la URL a partir del path

    let webviewPath: string;
    for (let photo of this.listaPath) {
      if (!this.platform.is("hybrid")) {     
          const readFile = await Filesystem.readFile({
              path: photo,
              directory: Directory.Data
          });

          // La URL de la foto en base64 para que se pueda visualizar
          webviewPath = `data:image/jpeg;base64,${readFile.data}`;      
      } else {
        webviewPath = Capacitor.convertFileSrc(photo);
      }
      this.listaUrl.push(webviewPath);
    }
  }
}
