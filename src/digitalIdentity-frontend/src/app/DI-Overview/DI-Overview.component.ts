import { Component, isDevMode, OnInit } from '@angular/core';
import { EditWindowPopUpComponent } from '../edit-window-pop-up/edit-window-pop-up.component';
import { MatDialog } from '@angular/material/dialog';


export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  birthday: string;
  user_role: string;
  company: string;
  team: string;
  status: string;
}


// Dummy table of users:
const USER_DATA: User[] = [
  {id: 1,  name: 'Musterogen',    surname: 'hans',  email: 'max@mustermann.de',     birthday: '06.11.1990', user_role: 'employee',   company: 'FAU', team: 'no team',   status: 'in progress'},
  {id: 2,  name: 'Musterum',      surname: 'hanna', email: 'erika@musterfrau.de',   birthday: '06.11.1990', user_role: 'employee',   company: 'FAU', team: 'no team',   status: 'in progress'},
  {id: 3,  name: 'Musterium',     surname: 'hans',  email: 'max@mustermann.de',     birthday: '06.11.1990', user_role: 'employee',   company: 'FAU', team: 'no team',   status: 'created'},
  {id: 4,  name: 'Musterllium',   surname: 'hans',  email: 'max@mustermann.de',     birthday: '06.11.1990', user_role: 'employee',   company: 'FAU', team: 'no team',   status: 'in progress'},
  {id: 5,  name: 'Mustern',       surname: 'hans',  email: 'max@mustermann.de',     birthday: '06.11.1990', user_role: 'employee',   company: 'FAU', team: 'no team',   status: 'created'},
  {id: 6,  name: 'Musteron',      surname: 'hans',  email: 'max@mustermann.de',     birthday: '06.11.1990', user_role: 'employee',   company: 'FAU', team: 'no team',   status: 'in progress'},
  {id: 7,  name: 'Musterogena',   surname: 'hans',  email: 'max@mustermann.de',     birthday: '06.11.1990', user_role: 'employee',   company: 'FAU', team: 'no team',   status: 'in progress'},
  {id: 8,  name: 'Musteren',      surname: 'hans',  email: 'max@mustermann.de',     birthday: '06.11.1990', user_role: 'employee',   company: 'FAU', team: 'no team',   status: 'in progress'},
  {id: 9,  name: 'Musterrine',    surname: 'hans',  email: 'max@mustermann.de',     birthday: '06.11.1990', user_role: 'employee',   company: 'FAU', team: 'no team',   status: 'created'},
  {id: 10, name: 'Muster',        surname: 'hans',  email: 'max@mustermann.de',     birthday: '06.11.1990', user_role: 'employee',   company: 'FAU', team: 'no team',   status: 'in progress'},
]



@Component({
  selector: 'app-DI-Overview',
  templateUrl: './DI-Overview.component.html',
  styleUrls: ['./DI-Overview.component.css']
})

export class DIOverviewComponent implements OnInit {

  constructor(private dialogRef : MatDialog) {

  }
  clicked(str:string) : void {
    if(isDevMode()) {
      console.log("goto " + str)
    }
  }

  ngOnInit(): void {

  }

  openEditWindowDialog() {
    this.dialogRef.open(EditWindowPopUpComponent, {
      data: {
        id:"1"
      }
    })
  }


  columns = [
    {
      columnDef: 'id',
      header: 'ID',
      cell: (user: User) => `${user.id}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (user: User) => `${user.name}`,
    },
    {
      columnDef: 'surname',
      header: 'surname',
      cell: (user: User) => `${user.surname}`,
    },
    {
      columnDef: 'email',
      header: 'email',
      cell: (user: User) => `${user.email}`,
    },
    {
      columnDef: 'birthday',
      header: 'birthday',
      cell: (user: User) => `${user.birthday}`,
    },
    {
      columnDef: 'user_role',
      header: 'user_role',
      cell: (user: User) => `${user.user_role}`,
    },
    {
      columnDef: 'company',
      header: 'company',
      cell: (user: User) => `${user.company}`,
    },
    {
      columnDef: 'team',
      header: 'team',
      cell: (user: User) => `${user.team}`,
    },
    {
      columnDef: 'status',
      header: 'status',
      cell: (user: User) => `${user.status}`,
    },
  ];
  dataSource = USER_DATA;
  displayedColumns = this.columns.map(c => c.columnDef);

}
