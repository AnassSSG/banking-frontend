import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AccountDetails} from "../models/account";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  constructor(private http :HttpClient) { }
  public getAccounts(accountId :string,page:number, size:number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.backend_host +"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }

  public getUserAccounts(UserId : number):Observable<Array<AccountDetails>>{
    return this.http.get<Array<AccountDetails>>(environment.backend_host+"/accounts/customer/"+UserId);
  }

  public debit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(environment.backend_host+"/accounts/debit",data);
  }
  public credit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(environment.backend_host+"/accounts/credit",data);
  }
  public transfer(accountSource: string,accountDestination: string, amount : number, description:string){
    let data={accountSource, accountDestination, amount, description }
    return this.http.post(environment.backend_host+"/accounts/transfer",data);
  }
}
