import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'app/shared/services/http/payment.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent {

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
        orderPaymentReference: this.token
      }

      this.paymentService.FinalizeOrderPayment(model).subscribe((res: any) => {
        console.log("finalize order payment res: ", res);
        this.isLoading = false;
        this.paymentSuccess = true;
      }, error => {
        this.router.navigate(['/CancelPayment']);
        this.isLoading = false;
        console.log(error);

      });
    });
  }
}
