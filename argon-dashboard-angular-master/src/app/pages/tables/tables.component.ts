import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  data: any[] = [];
  filteredData: any[] = [];
  searchQuery: string = '';
  selectedField: string = 'nombres';

  constructor(private dataService: DataService, private sharedDataService: SharedDataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((response) => {
      this.data = response;
      this.filteredData = response;
    });
  }

  filterData(): void {
    this.filteredData = this.data.filter((item) =>
      item[this.selectedField]
        .toString()
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase())
    );
  }

  dataLength() {
    return this.filteredData.length;
  }

  analyze() {
    this.sharedDataService.setFilterInfo(this.selectedField.toLowerCase());
    this.sharedDataService.setSearchResults(this.filteredData);
    this.sharedDataService.setPercentaje(((this.dataLength()/this.data.length)*100).toFixed(2));
    this.router.navigate(['/dashboard'])
  }
}
