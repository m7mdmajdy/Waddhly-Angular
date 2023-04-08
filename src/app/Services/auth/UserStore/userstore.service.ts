import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserstoreService {
  private FullName$= new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  constructor() { }

  public getFullNamefromStore() {
    return this.FullName$.asObservable();
  }
  public getRolefromStore() {
    return this.role$.asObservable();
  }
  public setFullNameforStore(fullName:string) {
    this.FullName$.next(fullName);
  }
  public setRoleforStore(role:string) {
    this.role$.next(role);
  }
}
