import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserstoreService {
  private email$= new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private id$ = new BehaviorSubject<string>("");

  constructor() { }

  public getEmailfromStore() {
    return this.email$.asObservable();
  }
  public getRolefromStore() {
    return this.role$.asObservable();
  }
  public setEmailforStore(fullName:string) {
    this.email$.next(fullName);
  }

  public setRoleforStore(role:string) {
    this.role$.next(role);
  }
  public getIDfromStore() {
    return this.id$.asObservable();

  }
  public SetIDfromStore(id:string) {
    this.id$.next(id);
  }
}
