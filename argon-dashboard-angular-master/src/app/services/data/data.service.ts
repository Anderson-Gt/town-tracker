import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl = '../../../assets/data/data.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }

  loadData(): Promise<any[]> {
    return this.http.get<any[]>(this.dataUrl).toPromise();
  }

  async addIdsAndSave(): Promise<void> {
    const data = await this.loadData();
    const updatedData = data.map((item, index) => ({
      ...item,
      id: index + 1,
    }));

    // Aquí iría el código para guardar el archivo actualizado en un entorno Node o servidor backend
    console.log(updatedData);
}
}