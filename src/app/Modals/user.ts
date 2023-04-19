export interface User {
firstname:string,
lastname:string,
username:string,
email:string,
password:string,
country:string,
phoneNumber:string,
gender:string,
title:string,
summary:string,
moneyAccount:number,
HourRate:number,
categoryName:string,
}

export interface LoginedUser
{
  id: string,
  firstName: string,
  lastName: string,
  title: string,
  summary: string,
  moneyAccount: number,
  country: string,
  hourRate: number,
  gender: string
}
export interface service
{
  id: number,
  title: string,
  description: string,
  date: Date,
  hours: number,
  status: boolean,
  service_category_id: number,
  service_category_name: string,
  service_user_id:string,
  user_firstname: string,
  user_lastname: string,
  user_title: string
}
export interface Proposal
{
  id:number,
  cost:number,
  description:string,
  noOfHours:number,
  service_id:number,
  user_id:string

}
export interface GetProposal
{
  id:number,
  Cost:number,
  Description:string,
  NoOfHours:number,
  prop_userName:string,
  prop_title:string,
  HourRate:number



}
