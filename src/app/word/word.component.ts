import { Component, OnInit, Input } from '@angular/core';
import { googleApi } from 'src/environments/environment';
import { TranslateText } from '../models/translate-text';
import { TranslateService } from '../services/translate.service';
import { HistoryService } from '../services/history.service';
@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {

  constructor(private translateService: TranslateService, private historyService:HistoryService) { }

  originalWord: string;
  isTranslated = true;

  @Input() word:string;
  @Input() target:string;

  toggle(){

    
    if(this.originalWord == undefined || this.originalWord.length == 0){
      console.log(this.target);
      var googleObj = new TranslateText(this.word, this.target);
      this.translateService.translate(googleObj, googleApi.key).then(
        (result: any) => {
          this.originalWord = result;
          this.isTranslated = !this.isTranslated;
          this.historyService.addToggleHistory( this.originalWord);
        },
        err => {
          console.log(err);
        }
      );
    }else{
      this.isTranslated = !this.isTranslated;
      this.historyService.addToggleHistory( this.word);
    }
    
    
   
  
  }
  ngOnInit() {
  }

}
