import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AlquranService {

  private readonly server: string = environment.coranUrl;
  baseURL: string = this.server + "/v1/surah/57/editions/ar.shaatree,fr.leclerc,fr.hamidullah";
  souhatesUrl : string =this.server +"/surah";
  constructor(private http: HttpClient) {
  }
  getExemple(nombre : number): Observable<any> {
    return this.http.get(this.server + "/surah/"+nombre);
  }

  getSouratesList(): Observable<any>{
    return this.http.get(this.souhatesUrl);
  }
}
