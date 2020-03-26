import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class SkribblService {

  constructor(private http : HttpClient,
              private toastr: ToastrService) { }

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
          console.log('data');
          // console.log(data);
          if (data === 'error, word already in list') {
            // console.log('error');
          }
          observer.next();
          observer.complete();
        }, error => {
          this.toastr.error('toto a la plage');
          console.log('toto a la plage');
          console.log(error);
          throwError(error);
        });
    });

    // return this.http.post('api/skribbl/add-word');
  }

  getWord() {
    return this.http.get('api/skribbl/get-word')
  }

}
