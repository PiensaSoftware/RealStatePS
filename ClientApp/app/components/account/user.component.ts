import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserService } from '../../service/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

export interface UserData {
    id: number;
    name: string;
    role: string;
    status: boolean;
}

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

    displayedColumns: string[] = ['id', 'name', 'role', 'status'];
    dataSource: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private userService: UserService,
        private spinner: NgxSpinnerService
    ) {

    }

    ngOnInit() {
        this.getUsers();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    getUsers() {
        this.spinner.show();
        this.userService.getUsers().subscribe(data => {
            if (data.code == 100) {
                this.dataSource = new MatTableDataSource(data.result);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;   
                this.spinner.hide();
            } else {

            }
        }, (err) => console.error('Failed! ' + err));
    }
}
