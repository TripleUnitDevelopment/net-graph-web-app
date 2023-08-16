import { Component, OnInit, ViewChild } from '@angular/core';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'app/shared/services/http/payment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {


  packageID: any;
  costID: any;

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#7141b1',
        color: '#000',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#000'
        }
      }
    }
  };
  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  stripeForm: FormGroup;

  constructor(private fb: FormBuilder, private stripeService: StripeService, private paymentService: PaymentService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.stripeForm = this.fb.group({
      name: ['', [Validators.required]]
    });


    this.packageID = this.route.snapshot.paramMap.get('packageID');
    this.costID = this.route.snapshot.paramMap.get('costID');

    console.log("package iD: ", this.packageID);
    console.log("cost ID: ", this.costID);
    this.checkout();
  }

  checkout() {
    const model = {
      packageGUID: this.packageID,
      calculatedCostGUID: this.costID
    }

    console.log(model);

    this.paymentService.CreateCheckoutSession(model).subscribe((res: any) => {
      //Redirect to checkout with received sessionId
      console.log(res);
      this.stripeService.redirectToCheckout({ sessionId: res.sessionID }).subscribe(result => {
        console.log(res);
        this.router.navigate(['/payment/success']);
      }), error => {
        this.router.navigate(['/payment/failed']);
        console.log(error);
      };
    }, (error: any) => {
      console.log(error);
    });
  }

  // createPaymentToken() {
  //   const name = this.stripeForm.get('name').value;
  //   this.stripeService
  //     .createToken(this.card.getCard(), { name: 'Customer Name' })
  //     .subscribe(result => {
  //       console.log(result);
  //       if (result.token) {
  //         // Send the token to your backend for processing
  //         this.processPayment(result.token.id);
  //       } else if (result.error) {
  //         // Handle the error on the frontend
  //         console.error(result.error.message);
  //       }
  //     }, error => {
  //       console.log(error);
  //     });
  // }
}
