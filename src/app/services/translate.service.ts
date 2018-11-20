import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TranslateText } from '../models/translate-text';
import { HistoryService } from './history.service';

@Injectable({
  providedIn: 'root'
})

export class TranslateService {
  langs = {
    'German': 'de',
    'Spanish': 'es',
    'French': 'fr',
    'Italian': 'it',
    'Danish': 'da',
    'Greek': 'el',
    'Irish': 'ga',
    'Latin': 'la',
    'Polish': 'pl',
    'English': 'en',
  }

  constructor(private _http: HttpClient) {

  }


  translate(obj: TranslateText, key: string) {
    let url = `https://translation.googleapis.com/language/translate/v2?q=${obj.q}&target=${this.langs[obj.target]}&key=${key}`;
    return this._http.get(url).toPromise().then((response: any) => {
      let text = response.data.translations[0].translatedText;
      return text;
    });
  }

  getTargetLang(country: string){
    return this.langs[country];
  }

}



