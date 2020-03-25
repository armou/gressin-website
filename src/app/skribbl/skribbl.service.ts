import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkribblService {

  constructor(private http : HttpClient) { }

  addWord(word) : Observable <any> {
    let toto_2 = {
      'wordList': [{
        '1': 'word',
        '2': 'word-2',
        '3': 'word-3'
      }]
    };
    return Observable.create(observer => {
      this.http.post<any>('api/skribbl/add-word', {word}).subscribe(data => {
        console.log(data)
      });
    });
    // return this.http.post('api/skribbl/add-word');
  }

  getWord() {
    return this.http.get('api/skribbl/get-word')
  }

}
