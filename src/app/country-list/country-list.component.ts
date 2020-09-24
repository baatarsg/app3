import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Ng2SmartTableModule, ServerDataSource } from 'ng2-smart-table';
import { Country } from '../country';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})

export class CountryListComponent implements OnInit {
  source: ServerDataSource;
  url = "http://localhost:3000/api/countries";

  settings = {
    columns: {
      id: {
        title: 'Ид',
        width: '10%',
        editable: false
      },
      code: {
        title: 'Код ИСО',
        width: '10%'
      },
      name: {
        title: 'Наименование',
        width: '75%'
      }
    },
    pager: {
      perPage :20
    },
    actions: {
      columnTitle: 'Действие'
    },
    add: {
      addButtonContent: 'Добавить',
      createButtonContent: '&nbsp;Создать&nbsp;',
      cancelButtonContent: '&nbsp;Отмена&nbsp;',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '&nbsp;Изменить&nbsp;',
      saveButtonContent: '&nbsp;Сохранить&nbsp;',
      cancelButtonContent: '&nbsp;Отмена&nbsp;',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '&nbsp;Удалить&nbsp;',
      confirmDelete: true
    }
  };

  constructor( private http: HttpClient ) {
  }

  ngOnInit() {
    this.source = new ServerDataSource(
      this.http, {
        endPoint: this.url,
        dataKey:'data',
        totalKey:'total',
        perPage:'per_page',
        pagerPageKey:'page'
      }
    );
  }

  addRecord(event) {
    var data = {
      "code": event.newData.code,
      "name": event.newData.name
    };
    this.http.post<Country>(this.url, data).subscribe(
      res => {
        event.confirm.resolve(event.newData);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }

  updateRecord(event) {
    var data = {
      "id": event.newData.id,
      "code": event.newData.code,
      "name": event.newData.name
    };
    this.http.put<Country>(this.url + '/'+event.newData.id, data).subscribe(
      res => {
        event.confirm.resolve(event.newData);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }

  deleteRecord(event){
    this.http.delete<any>(this.url + '/'+event.data.id).subscribe(
      res => {
        event.confirm.resolve(event.source.data);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }

}
