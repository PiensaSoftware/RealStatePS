import { Component, Optional, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ImageCroppedEvent } from "ngx-image-cropper/src/image-cropper.component";
import { CropImage } from "../../model/cropImage.model";

@Component({
    selector: 'app-cut-image',
    templateUrl: './cut-image.component.html',
})
export class CutImageComponent {
    imageChangedEvent: any = '';
    cropImage: CropImage;
    ratio = 1/1;
    size = 200;

    constructor(
        @Optional() public dialogRef: MatDialogRef<CutImageComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public cropImageData: CropImage
    )
    {
        this.imageChangedEvent = cropImageData.event;
        this.cropImage = cropImageData;
        if (this.cropImage.type == 'register') {
            this.ratio = 1/1;
            this.size = 200;
        } else if (this.cropImage.type == 'publish') {
            this.ratio = 8/5;
            this.size = 600;
        }
    }

    onNoClick(): void {
        console.log(this.cropImage);
        this.dialogRef.close(this.cropImage);
    }

    imageLoaded() {

    }

    imageCropped(event: ImageCroppedEvent) {
        this.cropImage.imageSRC = event.base64;
    }
}
