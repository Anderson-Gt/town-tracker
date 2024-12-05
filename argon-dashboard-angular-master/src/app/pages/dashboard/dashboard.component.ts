import { Component, OnDestroy, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { SharedDataService } from 'src/app/services/shared-data.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  filterInfo: any;
  searchResults: any[] = [];
  isChartResidence = false;
  percentaje: any;

  constructor(private sharedDataService: SharedDataService, private dataService: DataService) {}
  
  ngOnInit() {
    this.filterInfo = this.sharedDataService.getFilterInfo();
    this.searchResults = this.sharedDataService.getSearchResults();
    this.percentaje = this.sharedDataService.getPercentaje();

    if (["genero", "apellidos", "profesion", "eps", "institucion_educativa", "residencia"].includes(this.filterInfo)) {
      this.createChartByGroup1();
      this.createChartByGroup2();
      this.createChartByGroup3();
    } else if (!this.filterInfo || !this.searchResults) {
      this.dataService.getData().subscribe((response) => {
        this.searchResults = response;
        this.createChartByGroup1();
        this.createChartByGroup2();
        this.createChartByGroup3();
      });
    }
  }


  createChartByGroup1() {
    this.isChartResidence = true;
    const groupedData = this.groupDataByResidence();
    const labels = Object.keys(groupedData);
    const data = labels.map((residence) => groupedData[residence].length);
    const chartResidence = document.getElementById('chart-residence');
    parseOptions(Chart, chartOptions());
    new Chart(chartResidence, {
      type: 'bar',
      options: chartExample2.options,
      data: {
        labels,
        datasets: [
          {
            label: 'Número de personas',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
    });
  }

  createChartByGroup2() {
    const groupedData = this.groupDataByProfesion();
    const labels = Object.keys(groupedData);
    const data = labels.map((profesion) => groupedData[profesion].length);
    const chartProfession = document.getElementById('chart-profession');
    parseOptions(Chart, chartOptions());
    new Chart(chartProfession, {
      type: 'bar',
      options: chartExample2.options,
      data: {
        labels,
        datasets: [
          {
            label: 'Número de personas',
            data,
            backgroundColor: 'rgba(3, 155, 229, 0.6 )',
            borderColor: 'rgba(3, 155, 229, 1)',
            borderWidth: 1,
          },
        ],
      },
    });
  }

  createChartByGroup3() {
    const groupedData = this.groupDataByEps();
    const labels = Object.keys(groupedData);
    const data = labels.map((eps) => groupedData[eps].length);
    const chartEps = document.getElementById('chart-eps');
    parseOptions(Chart, chartOptions());
    new Chart(chartEps, {
      type: 'bar',
      options: chartExample2.options,
      data: {
        labels,
        datasets: [
          {
            label: 'Número de personas',
            data,
            backgroundColor: 'rgba(255, 87, 34, 0.6 )',
            borderColor: 'rgba(255, 87, 34, 1)',
            borderWidth: 1,
          },
        ],
      },
    });

    const chartEps2 = document.getElementById('chart-eps-2');
    new Chart(chartEps2, {
      type: 'pie',
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'right',
          },
          title: {
            display: true,
            text: 'hola'
          }
        }
      },
      data: {
        labels,
        datasets: [
          {
            label: 'Número de personas',
            data,
            borderWidth: 1,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
          },
        ],
      },
    });
  }

  groupDataByResidence() {
    const grouped = {};
    this.searchResults.forEach((item) => {
      if (!grouped[item.residencia]) {
        grouped[item.residencia] = [];
      }
      grouped[item.residencia].push(item);
    });
    return grouped;
  }

  groupDataByProfesion() {
    const grouped = {};
    this.searchResults.forEach((item) => {
      if (!grouped[item.profesion]) {
        grouped[item.profesion] = [];
      }
      grouped[item.profesion].push(item);
    });
    return grouped;
  }

  groupDataByEps() {
    const grouped = {};
    this.searchResults.forEach((item) => {
      if (!grouped[item.eps]) {
        grouped[item.eps] = [];
      }
      grouped[item.eps].push(item);
    });
    return grouped;
  }

  getTitle(filterInfo: string, parsedFilter: string) {
    switch(filterInfo) {
      case "genero":
        return `Género por ${parsedFilter}`
      case "profesion":
        return `Profesión por ${parsedFilter}`
      case "eps":
        return "EPS"
      default: 
        return `Resultados por ${parsedFilter}`
    }
  }

  dataLength() {
    return this.searchResults.length ?? 0;
  }

  resetDashboard() {
    window.location.reload();
  }
}
