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
    return Observable.create(observer => {
        this.http.post<any>('api/skribbl/add-word', {word}).subscribe(data => {
          this.toastr.success(word + '  added successfully. Gressin loves you <3');
          observer.next();
          observer.complete();
        }, error => {
          this.toastr.error(word + 'already in the list :(');
          console.log(error);
          throwError(error);
        });
    });

    // return this.http.post('api/skribbl/add-word');
  }

  getWord() {
    return this.http.get('api/skribbl/get-word')
  }

  deleteWord(word) {
    this.http.post('api/skribbl/delete-word', {word}).subscribe(data => {
      this.toastr.success(word + '  deleted successfully');
      console.log('delete word');
      console.log(data);
    }, error => {
      this.toastr.error('Error while deleting a word. Attends un peu connard');
      console.log(error)
    })
  }

}
