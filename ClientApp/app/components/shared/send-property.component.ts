
import { Component, OnInit, Inject } from '@angular/core';
import { PropertyService } from 'ClientApp/app/service/property.service';
import { List } from 'linqts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from 'ClientApp/app/service/toaster.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PropertyDetailService } from 'ClientApp/app/service/propertyDetail.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
    selector: 'app-send-property',
    templateUrl: './send-property.component.html'
})
export class SendPropertyComponent implements OnInit {

    sendDetailForm: FormGroup;

    constructor(
        public dialog: MatDialog,
        private spinner: NgxSpinnerService,
        private propertyService: PropertyService,
        private toasterService: ToasterService,
        private formBuilder: FormBuilder,
        private propertyDetailService: PropertyDetailService,
        public dialogRef: MatDialogRef<SendPropertyComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
        this.sendDetailForm = this.formBuilder.group({
            email: ['', [
                Validators.required,
                Validators.email
            ]],
        });
    }

    shareDetail() {
        let id = this.data.id;
        this.propertyService.getPropertyDetail(id).subscribe(data => {
            if (data.code == 100) {
                if (data.result != null) {
                    this.sendDetail(data.result);
                    this.onNoClick();
                }
            } else {

            }
        }, (err) => console.error('Failed! ' + err));
    }

    get f() { return this.sendDetailForm.controls; }

    sendDetail(property) {
        if (!this.sendDetailForm.invalid) {
            this.toasterService.showToaster('Se envi\u00F3 el detalle de la propiedad correctamente.');
            var doc = this.propertyDetailService.buildPdf(property);
            var binary = doc.output();
            var pdf = binary ? btoa(binary) : "";

            var model = {
                email: this.sendDetailForm.value.email,
                name: 'DetallePropiedad-' + property.id + '.pdf',
                pdf: pdf,
                id: property.id.toString()
            };
            this.propertyService.send(model).subscribe(data => {
                if (data.code == 100) {

                } else {

                }
            }, (err) => console.error('Failed! ' + err));
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
