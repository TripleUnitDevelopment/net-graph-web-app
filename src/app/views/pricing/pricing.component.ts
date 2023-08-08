import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'app/shared/services/http/common/auth-service';
import { PackagesService } from 'app/shared/services/http/pricing.service';
import { LanguageService } from 'app/shared/services/http/language.service';
import { CurrencyService } from 'app/shared/services/http/currency.service';
import { forkJoin, map } from 'rxjs';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  @ViewChild(MatProgressBar) progressBar: MatProgressBar;

  selectedLanguageID;
  selectedCurrencyID: number | null = null;
  selectedCurrency!: any 

  packages: any[] = [];
  languages: any[] = [];
  currencies: any[] = [];
  isLoading: boolean = true;

  constructor(private router: Router, private authService: AuthService,
    private packagesService: PackagesService, private languageService: LanguageService,
    private currencyService: CurrencyService) { }
  ngOnInit(): void {
    this.getAvailableCurrencies()

  }

  //Fetch available currencies
  getAvailableCurrencies() {

    this.currencyService.GetAvailableCurrencies().subscribe((res: any) => {
      this.currencies = res;
      console.log("currencies: ", this.currencies)
      this.selectedCurrencyID = this.currencies[0].id;
      this.selectedCurrency = this.currencies[0];
      this.getAvailablePackages();
    }, error => {
      console.log(error);
      this.isLoading = false;
    });

  }

  //Fetch available packages (based on language / currency)
  //Automatically gets called on language/currency change
  getAvailablePackages() {
    this.selectedCurrency = this.currencies.find(t => t.id == this.selectedCurrencyID);
    // const selectedLanguage = this.languages.find(t => t.id == this.selectedLanguageID);
    console.log("Selected currency object: ",  this.selectedCurrency);

    this.packagesService.GetAvailablePackages( this.selectedCurrency.threeDigitCode, "en").subscribe((res: any) => {
      console.log("available packages: ", res);
      this.packages = res;
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.isLoading = false;
    });
  }



  onCurrencyChange(event: any) {
    this.isLoading = true;
    this.packages = [];
    if (event.target.value == null) {
      return;
    }

    this.selectedCurrencyID = event.target.value;
    this.selectedCurrencyID = event.target.value;
    console.log("currency changed", this.selectedCurrencyID);
    this.getAvailablePackages();

  }


  choosePlan(plan) {
    console.log("chosen plan: ", plan);
    if (this.authService.isAuthenticated()) {
      const selectedCurrency = this.currencies.find(t => t.id == this.selectedCurrencyID);
      this.router.navigate(['/pricing-calculator/' + plan.id + '/' + selectedCurrency.symbol]);
  
    }
    else {
      this.router.navigate(['/sessions/signin']);
    }
  }
}
