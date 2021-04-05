import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkillsTrackerService } from '../skills-tracker.service';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { Skills } from '../skills';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.css']
})
export class BarGraphComponent implements OnInit {

  @Input() associateId : any;
  // associateId: any;
  responseDetails: any;
  skills: Array<Skills> = [];
  skillNames = [];
  skillLevels = [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#007bff',
    },
  ];
 
  barChartLabels: Label[] = this.skillNames;
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: this.skillLevels, label: 'strong skills' },

  ];
  userId: number;
  
  constructor(private service: SkillsTrackerService,private route: ActivatedRoute,private httpClient:HttpClient) {
    
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this.associateId = params.get('id'); 
      console.log(this.associateId);
   });
    this.associateId=this.route.snapshot.paramMap.get("id");
   
    this.displayBarGraph();
  }
  displayBarGraph() {
    let responseData = this.httpClient.get("http://localhost:8065/api/associates/associateId/"+this.associateId);
    responseData.subscribe((response) => {
      this.responseDetails = response;
      this.skills = this.responseDetails.skills;
      for (let i = 0; i < this.skills.length; i++) {
        console.log(this.skills[i].skillName);
        this.skillNames.push(this.skills[i].skillName);
        this.skillLevels.push(this.skills[i].skillLevel);
      }
      this.skillLevels.push(0);
      console.log(this.skillNames);

    });

  }

}

