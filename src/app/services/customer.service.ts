import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../models/customer";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  public getCustomers():Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.backend_host+"/customers")
  }

  public searchCustomers(keyword : string):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.backend_host+"/customers/search?keyword="+keyword)
  }
  public saveCustomer(customer: Customer):Observable<Customer>{
    return this.http.post<Customer>(environment.backend_host+"/customers",customer);
  }
  public deleteCustomer(id: number){
    return this.http.delete(environment.backend_host+"/customers/"+id);
  }
  public updateCustomer(customer: Customer):Observable<Customer>{

    return this.http.put<Customer>(environment.backend_host+"/customers/"+customer.id,customer);
  }
}
