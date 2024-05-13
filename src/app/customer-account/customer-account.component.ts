import { Component } from '@angular/core';
import {Customer} from "../models/customer";
import {ActivatedRoute, Router} from "@angular/router";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {CustomerService} from "../services/customer.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {catchError, throwError} from "rxjs";
import {AccountsService} from "../services/accounts.service";
import {Observable} from "rxjs";
import {AccountDetails} from "../models/account";
@Component({
  selector: 'app-customer-account',
  standalone: true,
  imports: [
    JsonPipe,
    AsyncPipe,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './customer-account.component.html',
  styleUrl: './customer-account.component.css'
})
export class CustomerAccountComponent {
  customerId! : number ;
  customer! : Customer;
  accounts! : Observable<Array<any>>
  private errorMessage: any;
  constructor(private route : ActivatedRoute, private router :Router ,private accountsService:AccountsService) {
    this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.accounts=this.accountsService.getUserAccounts(this.customerId).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );

  }
}
