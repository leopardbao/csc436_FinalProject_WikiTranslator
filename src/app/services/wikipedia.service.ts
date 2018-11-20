import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Wikipedia } from '../models/wikipedia'

@Injectable()
export class WikipediaService {
  constructor(private http: Http) {
  }
  search(query: string) {
    console.log(query);
    let url = `https://en.wikipedia.org/w/api.php?action=opensearch&limit=10&format=json&origin=*&search=${query}`;
    return this.http.get(url)
      .toPromise()
      .then(
        res => {
          let result = [];
          let size = res.json()[1].length;
          for (var i = 0; i < size; i++) {
            result.push(
              new Wikipedia(res.json()[1][i],
                res.json()[2][i],
                res.json()[3][i])
            );
          }
          return result;
        });

  }
}
