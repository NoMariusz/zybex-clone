export default class RendererImage {
    /* Represents image data in renderer */
    name: string
    image: HTMLImageElement

    constructor(imgName: string, imageData: string){
        this.name = imgName
        
        this.image = new Image();
        this.image.src = imageData
    }
};
