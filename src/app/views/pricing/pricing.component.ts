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

  packages: any[] = [];
  languages: any[] = [];
  currencies: any[] = [];
  isLoading: boolean = true;

  constructor(private router: Router, private authService: AuthService,
    private packagesService: PackagesService, private languageService: LanguageService,
    private currencyService: CurrencyService) { }
  ngOnInit(): void {
    this.getAvailableCurrencies()

    //Fork join disabled
    // forkJoin([
    //   this.getAvailableLanguages(),
    //   this.getAvailableCurrencies()
    // ]).subscribe(
    //   ([languages, currencies]) => {
    //     console.log("Available languages: ", languages);
    //     console.log("Available currencies: ", currencies);
    //     // //Fetch packages once fork is complete
    //     // this.getAvailablePackages();
    //   },
    //   error => {
    //     console.log(error)
    //     this.isLoading = false;
    //   }
    // );
  }

  //Fetch available languages //Disabled
  // getAvailableLanguages() {
  //   return this.languageService.GetAvailableLanguages().pipe(
  //     map((res: any) => {
  //       this.languages = res;
  //       return res;  // Ensure the Observable emits the response
  //     })
  //   );
  // }

  //Fetch available currencies
  getAvailableCurrencies() {

    this.currencyService.GetAvailableCurrencies().subscribe((res: any) => {
      this.currencies = res;
      console.log("currencies: ", this.currencies)
      this.selectedCurrencyID = this.currencies[0].id;
      this.getAvailablePackages();
    }, error => {
      console.log(error);
      this.isLoading = false;
    });
    //Fork join disabled
    // return this.currencyService.GetAvailableCurrencies().pipe(
    //   map((res: any) => {
    //     this.currencies = res;
    //     return res;  //Enable for fork join
    //   })
    // );
  }

  //Fetch available packages (based on language / currency)
  //Automatically gets called on language/currency change
  getAvailablePackages() {
    const selectedCurrency = this.currencies.find(t => t.id == this.selectedCurrencyID);
    // const selectedLanguage = this.languages.find(t => t.id == this.selectedLanguageID);
    console.log("Selected currency object: ", selectedCurrency);

    //Language disabled
    // if (selectedLanguage.symbol == "en") {
    //   selectedLanguage.symbol = "ENG"
    // }
    this.packagesService.GetAvailablePackages(selectedCurrency.threeDigitCode, "en").subscribe((res: any) => {
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
    console.log("currency changed", this.selectedCurrencyID);
    this.getAvailablePackages();

  }

  //disabled
  // onLanguageChange() {
  //   console.log("language changed", this.selectedLanguageID)

  //   if (this.selectedCurrencyID && this.selectedLanguageID) {
  //     this.getAvailablePackages();
  //   }
  // }

  choosePlan(plan) {
    console.log("chosen plan: ", plan);
    if (this.authService.isAuthenticated()) {
      const selectedCurrency = this.currencies.find(t => t.id == this.selectedCurrencyID);
      this.router.navigate(['/pricing-calculator/' + plan.id + '/' + selectedCurrency.symbol]);
      // const params: NavigationExtras = {
      //   queryParams: { data: JSON.stringify(plan) }
      // }

      // this.router.navigate(['/pricing-calculator'], params);
    }
    else {
      this.router.navigate(['/sessions/signin']);
    }
  }
}
