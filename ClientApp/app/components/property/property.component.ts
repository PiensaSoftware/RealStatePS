import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from 'ClientApp/app/service/property.service';
import { Globals } from 'ClientApp/app/app.global';
import { List } from 'linqts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from 'ClientApp/app/service/toaster.service';
import { MatDialog } from '@angular/material';
import { PropertyDetailService } from 'ClientApp/app/service/propertyDetail.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SendPropertyComponent } from 'ClientApp/app/components/shared/send-property.component';

@Component({
    selector: 'app-property',
    templateUrl: './property.component.html'
})
export class PropertyComponent implements OnInit {
    title = 'Welcome to Angular';
    subtitle = '.NET Core + Angular CLI v6 + Bootstrap & FontAwesome + Swagger Template';
    currentSession = localStorage.getItem('currentUser');
    properties = [];
    urlBase = "";
    sendDetailForm: FormGroup;

    constructor(
        public dialog: MatDialog,
        private spinner: NgxSpinnerService,
        private router: Router,
        private propertyService: PropertyService,
        private globals: Globals,
        private toasterService: ToasterService,
        private formBuilder: FormBuilder,
        private propertyDetailService: PropertyDetailService) { }

    ngOnInit() {
        if (this.currentSession == null)
            this.router.navigate(['/home']);
        this.urlBase = this.globals.urlImage;
        this.getProperties();

        this.sendDetailForm = this.formBuilder.group({
            email: ['', [
                Validators.required,
                Validators.email
            ]],
        });
    }

    getProperties() {
        this.propertyService.getPropertyPublished().subscribe(data => {
            if (data.code == 100) {
                this.properties = data.result;
            } else {
            }
        }, (err) => console.error('Failed! ' + err));
    }

    editProperty(propertyId): void {
        this.router.navigate(['/propertyUpdate'], { queryParams: { propertyId: propertyId } });
    }

    updatePropertyStatus(property) {
        property.isActive = !property.isActive;
        this.updateProperty(property);
    }

    updateProperty(model) {
        this.spinner.show();
        this.propertyService.updatePropertyStatus(model)
            .subscribe(data => {
                console.log(data);
                if (data.code == 100) {
                    setTimeout(() => {
                        this.toasterService.showToaster('Se cambo el estatus del inmueble correctamente.');
                        this.spinner.hide();
                        this.router.navigate(['/property']);
                    }, 300);
                } else {
                    setTimeout(() => {
                        this.toasterService.showToaster('Error al cambiar estatus del inmueble.');
                        this.spinner.hide();
                    }, 300);
                }
            }, (err) => console.error('Failed! ' + err));
    }

    shareDetail(id) {
        this.propertyService.getPropertyDetail(id).subscribe(data => {
            if (data.code == 100) {
                if (data.result != null) {
                        this.buildPdf(data.result);
                }
            } else {

            }
        }, (err) => console.error('Failed! ' + err));
    }

    buildPdf(property) {
        var doc = this.propertyDetailService.buildPdf(property);
        doc.save('DetallePropiedad-' + property.id + '.pdf');
    }

    get f() { return this.sendDetailForm.controls; }

    sendDetail(id): void {
        const dialogRef = this.dialog.open(SendPropertyComponent, {
            width: '350px',
            data: { id: id }
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }
}
