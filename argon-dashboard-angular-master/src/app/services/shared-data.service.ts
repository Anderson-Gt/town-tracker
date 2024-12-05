import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private filterInfo: any = null;
  private searchResults: any[] = [];
  private percentaje: any = null;

  setFilterInfo(info: any) {
    this.filterInfo = info;
  }

  getFilterInfo() {
    return this.filterInfo;
  }

  setSearchResults(results: any[]) {
    this.searchResults = results;
  }

  getSearchResults() {
    return this.searchResults;
  }

  setPercentaje(percentaje: any) {
    this.percentaje = percentaje;
  }

  getPercentaje() {
    return this.percentaje;
  }

  reset() {
    this.filterInfo = null;
    this.searchResults = [];
    this.percentaje = null;
  }
}
