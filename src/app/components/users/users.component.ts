import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/auth';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

  constructor(private auth: AuthService){}

  @Input() userCollection: User[] = []; 

  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      data: this.userCollection,
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'Vorname',
        data: 'name'
      }, {
        title: 'Nachname',
        data: 'surname'
      }, {
        title: 'E-Mail',
        data: 'email'
      }]
    };
  }

}
