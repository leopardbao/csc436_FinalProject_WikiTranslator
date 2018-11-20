import { Component, OnInit } from '@angular/core';
import { SearchHistory } from '../models/search-history';
import {HistoryService} from '../services/history.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  historyRecords: SearchHistory[];

  constructor(private historyService: HistoryService) { }

  ngOnInit() {

    // this.historyRecords = this.historyService.getRecords();
    // console.log(this.historyRecords);

    this.historyService.getAdminRecords()
      .subscribe(
        value => {
          const history = [];
          for (const prop in value) {
            if (value.hasOwnProperty(prop)) {
              history.push(value[prop]);
            }
          }
          console.log(history);
          this.historyRecords = history.sort((a,b)=>{ return b.timestamp < a.timestamp ? -1 : 1 });
          console.log(this.historyRecords);
        }
      );
  }
  
}
