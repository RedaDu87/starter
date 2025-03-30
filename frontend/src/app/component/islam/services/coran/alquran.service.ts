import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlquranService {


  baseURL: string = "/api-quran/v1/surah/57/editions/ar.shaatree,fr.leclerc,fr.hamidullah";
  souhatesUrl : string ="/api-quran/v1/surah";
  constructor(private http: HttpClient) {
  }
  getExemple(nombre : number): Observable<any> {
    return this.http.get("/api-quran/v1/surah/"+nombre+"/editions/ar.hudhaify,en.transliteration,fr.leclerc,fr.hamidullah");
  }

  getSouratesList(): Observable<any>{
    return this.http.get(this.souhatesUrl);
  }
}
