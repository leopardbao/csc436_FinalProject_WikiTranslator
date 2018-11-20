import { Component, OnInit } from '@angular/core';
import { WikipediaService } from '../services/wikipedia.service';
import { HistoryService } from '../services/history.service';
import { Wikipedia } from '../models/wikipedia';
import { TranslateService } from '../services/translate.service';
import { TranslateText } from '../models/translate-text';
import { googleApi } from '../../environments/environment';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  searchText: string;
  wikipediaResults: Wikipedia[];
  translateResults = '';
  isShow: boolean;
  constructor(private wikipediaService: WikipediaService, private historyService: HistoryService) { 
      this.wikipediaResults = [];
      this.isShow = false;
    }

  ngOnInit() {
  }

  search(): void {
    this.wikipediaResults = [];
    Promise.all([
      this.wikipediaService
      .search(this.searchText)
    ])
    .then(([wikiResult])=>{
      this.wikipediaResults = wikiResult;
      this.isShow = true;
    })
    this.historyService.addSearchHistory(this.searchText);
  }


}

