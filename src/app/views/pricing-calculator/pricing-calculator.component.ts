import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pricing-calculator',
  templateUrl: './pricing-calculator.component.html',
  styleUrls: ['./pricing-calculator.component.scss']
})
export class PricingCalculatorComponent implements OnInit {

  selectedPlan;
  cost;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // this.selectedPlan = this.route.snapshot.paramMap.get('plan'); //Disabled
    this.selectedPlan = JSON.parse(this.route.snapshot.queryParamMap.get('data'));

    console.log("selected plan: ", this.selectedPlan);
  }

}
