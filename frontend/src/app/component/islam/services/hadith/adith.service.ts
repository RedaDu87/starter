import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdithService {
  private readonly server: string = environment.hadtihUrl;

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste des catégories de hadiths
   */
  getHadithCategorie(): Observable<any> {
    return this.http.get(`${this.server}/categories`);
  }

  /**
   * Récupère la liste des hadiths d'une catégorie spécifique
   * @param categoryId ID de la catégorie
   */
  getHadithsList(categoryId: number): Observable<any> {
    return this.http.get(`${this.server}/list?category_id=${categoryId}`);
  }

  /**
   * Récupère le détail d'un hadith
   * @param id ID du hadith
   */
  getHadithDetail(id: number): Observable<any> {
    return this.http.get(`${this.server}/detail?id=${id}`);
  }
}
