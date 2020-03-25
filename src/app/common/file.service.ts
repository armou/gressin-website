import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileService {

  constructor(private http: HttpClient) {}

  downloadFile(): Observable<any>{		
		return this.http.get('api/file/download');
   }
   
}