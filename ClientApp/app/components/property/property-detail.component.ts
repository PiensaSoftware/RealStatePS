import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../service/property.service';
import { Globals } from '../../app.global';
import { NgxSpinnerService } from 'ngx-spinner';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToasterService } from 'ClientApp/app/service/toaster.service';
import { PropertyDetailService } from 'ClientApp/app/service/propertyDetail.service';

@Component({
    selector: 'app-property-detail',
    templateUrl: './property-detail.component.html'
})
export class PropertyDetailComponent implements OnInit {
    title = 'Welcome to Angular';
    subtitle = '.NET Core + Angular CLI v6 + Bootstrap & FontAwesome + Swagger Template';
    urlBase = "";
    imageView = "";
    property: any;
    panelOpenState = false;
    showSend = false;
    sendDetailForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private propertyService: PropertyService,
        private globals: Globals,
        private spinner: NgxSpinnerService,
        private formBuilder: FormBuilder,
        private toasterService: ToasterService,
        private propertyDetailService: PropertyDetailService
    ) { }

    ngOnInit() {
        this.spinner.show();
        this.urlBase = this.globals.urlImage;
        this.route.queryParams
            .subscribe(params => {
                this.getPropertyDetail(params.propertyId);
            });

        this.sendDetailForm = this.formBuilder.group({
            email: ['', [
                Validators.required,
                Validators.email
            ]],
        });
    }

    getPropertyDetail(propertyId) {
        this.propertyService.getPropertyDetail(propertyId).subscribe(data => {
            if (data.code == 100) {
                this.property = data.result;
                this.imageView = this.property.propertyImage[0].url;
                this.spinner.hide();
            } else {

            }
        }, (err) => console.error('Failed! ' + err));
    }

    downloadDetail() {
        var doc = this.propertyDetailService.buildPdf(this.property);
        doc.save('DetallePropiedad-' + this.property.id + '.pdf');
    }

    get f() { return this.sendDetailForm.controls; }

    sendDetail() {
        if (!this.sendDetailForm.invalid) {
            this.toasterService.showToaster('Se envi\u00F3 el detalle de la propiedad correctamente.');
            var doc = this.propertyDetailService.buildPdf(this.property);
            var binary = doc.output();
            var pdf = binary ? btoa(binary) : "";

            var model = {
                email: this.sendDetailForm.value.email,
                name: 'DetallePropiedad-' + this.property.id + '.pdf',
                pdf: pdf,
                id: this.property.id.toString()
            };
            this.propertyService.send(model).subscribe(data => {
                if (data.code == 100) {

                } else {

                }
            }, (err) => console.error('Failed! ' + err));
        }
    }  
}
