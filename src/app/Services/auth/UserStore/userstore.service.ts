import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserstoreService {
  private email$= new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private ID$ = new BehaviorSubject<string>("");
  private id$ = new BehaviorSubject<string>("");
  constructor() { }

  public getIDfromStore() {
    return this.ID$.asObservable();
  }
  public getEmailfromStore() {
    return this.email$.asObservable();
  }
  public getRolefromStore() {
    return this.role$.asObservable();
  }

  public setIDforStore(ID:string) {
    this.ID$.next(ID);
  }
  public setEmailforStore(email:string) {
    this.email$.next(email);
  }
  public setRoleforStore(role:string) {
    this.role$.next(role);
  }
  public SetIDfromStore(id:string) {
    this.id$.next(id);
  }
}
