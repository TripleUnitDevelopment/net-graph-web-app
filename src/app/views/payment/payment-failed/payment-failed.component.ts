import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'app/shared/services/http/payment.service';

@Component({
  selector: 'app-payment-failed',
  templateUrl: './payment-failed.component.html',
  styleUrls: ['./payment-failed.component.scss']
})
export class PaymentFailedComponent {
  token;
  sessionId;
  paymentSuccess: boolean = false;
  isLoading: boolean = true;
  constructor(private router: Router, private route: ActivatedRoute, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sessionId = params['sessionId'];
      console.log("session ID: ", this.sessionId);
      this.token = params['Token'];
      console.log("Token: ", this.token);

      const model = {
        orderReference: this.token,
        paymentStatus:"Fail"
      }

      this.paymentService.FinalizeOrderPayment(model).subscribe((res: any) => {
        console.log("finalize order payment res: ", res);
        this.isLoading = false;
        this.paymentSuccess = true;
      }, error => {
        this.isLoading = false;
        console.log(error);

      });
    });
  }
}
