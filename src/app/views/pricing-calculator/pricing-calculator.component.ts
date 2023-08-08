import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PackagesService } from 'app/shared/services/http/pricing.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pricing-calculator',
  templateUrl: './pricing-calculator.component.html',
  styleUrls: ['./pricing-calculator.component.scss']
})
export class PricingCalculatorComponent implements OnInit {

  selectedPlan;
  selectedCurrency;
  cost;

  packageForm: UntypedFormGroup;
  previousUserCount;
  previousBillingPeriod;
  
  isLoading: boolean = true;
  
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  constructor(private route: ActivatedRoute, private router: Router, private packagesService: PackagesService) {
    this.packageForm = new UntypedFormGroup({
      userCount: new UntypedFormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(100)
      ]),
      billingPeriod: new UntypedFormControl('M', Validators.required),
    });

    this.previousUserCount = this.packageForm.value.usersCount;
    this.previousBillingPeriod = this.packageForm.value.billingPeriod;
  }

  ngOnInit(): void {
    const selectedPlanID = this.route.snapshot.paramMap.get('plan'); //Disabled
    this.selectedCurrency = this.route.snapshot.paramMap.get('currency'); //Disabled
    // const planID = JSON.parse(this.route.snapshot.queryParamMap.get('data'));

    console.log("selected plan ID: ", selectedPlanID);

    if (selectedPlanID) {
      this.getPackage(selectedPlanID);
    }

    this.packageForm.valueChanges
      .pipe(
        debounceTime(400)  // delay for 400 milliseconds
      )
      .subscribe(() => {

        if (!this.packageForm.valid) {
          return
        }


        const currentUserCount = this.packageForm.value.usersCount;
        const currentBillingPeriod = this.packageForm.value.billingPeriod;

        console.log("current user count: ", currentUserCount);
        console.log("previous user count: ", this.previousUserCount)

        if (!this.previousUserCount || currentUserCount !== this.previousUserCount || currentBillingPeriod !== this.previousBillingPeriod) {
          this.calculateCost();

          // Update the previous values for the next comparison
          this.previousUserCount = currentUserCount;
          this.previousBillingPeriod = currentBillingPeriod;
        }
      });
  }


  getPackage(id: string) {
    this.packagesService.GetPackageByID(id).subscribe((res: any) => {
      this.isLoading = false;
      this.selectedPlan = res;
      this.cost={
        finalCostAmount:this.selectedPlan.cost,
        baseCostAmount:this.selectedPlan.cost,
      }
      // this.calculateCost() 
      console.log("package: ", this.selectedPlan)
      // this.calculateCost();
    }, error => {
      console.log(error);
      this.isLoading = false;
    });
  }

  isCalculating: boolean = false;
  calculateCost() {
    this.isCalculating = true;
    const model = {
      packageGUID: this.selectedPlan.id,
      offerGUID: this.offerCodeID,
      userCount: this.packageForm.value.userCount,
      billingPeriod: this.packageForm.value.billingPeriod
    }
    console.log("calculate cost model: ", model);
    this.packagesService.GetCalculatedCost(model).subscribe((res: any) => {
      console.log("cost: ", res);
      this.cost = res;
      this.isCalculating = false;
    }, error => {
      this.isCalculating = false;
      console.log(error);
    });
  }

  offerCode;
  offerCodeID;
  offerCodeError;
  offerCodeSuccess;
  ValidateOfferCode() {
    this.isLoading = true;
    if (!this.offerCode) {
      return;
    }
    this.packagesService.ValidateOfferCode(this.offerCode).subscribe((res: any) => {
      console.log("offer code validation result: ", res)
      this.offerCodeID = res.offerGUID;
      this.offerCodeSuccess = res.message;
      this.calculateCost();
      this.isLoading = false;
      // this.calculateCost();
    }, error => {
      console.log(error);
      this.offerCode = null;
      this.offerCodeError = error.error.error.message;
      this.isLoading = false;
      setTimeout(() => {
        this.offerCodeError = null;
      }, 4000);
    });
  }

}
