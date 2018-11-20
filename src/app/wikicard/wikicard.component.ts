import { Component, OnInit, Input } from '@angular/core';
import { Wikipedia } from '../models/wikipedia';
import { TranslateText } from '../models/translate-text';
import { googleApi } from 'src/environments/environment';
import { WikipediaService } from '../services/wikipedia.service';
import { HistoryService } from '../services/history.service';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-wikicard',
  templateUrl: './wikicard.component.html',
  styleUrls: ['./wikicard.component.css']
})
export class WikicardComponent implements OnInit {
  translatedWords = []
  selectTarget = "German"
  targets = ['German', 'Spanish', 'French', 'Italian', 'Danish', 'Greek', 'Irish', 'Latin', 'Polish']


  constructor(private wikipediaService: WikipediaService,
    private historyService: HistoryService,
    private translateService: TranslateService) {
  }

  @Input() wikipedia: Wikipedia;
  ngOnInit() {
    console.log(this.wikipedia)
  }

  translate(content: string): void {
    var googleObj = new TranslateText(content, this.selectTarget);
    let target = this.selectTarget;
    this.translateService.translate(googleObj, googleApi.key).then(
      (result: any) => {
        this.translatedWords = result.split(' ');
        this.historyService.addTranslateHistory(content, target);
      },
      err => {
        console.log(err);
      }
    );
  }

}
