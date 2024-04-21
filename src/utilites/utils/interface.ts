export enum payment{
  CARD = "card",
  CASH = "cash"
}
export enum status{
  PENDING = "pending",
  COMPLETE = "complete"
}
export interface IUser {
    id?: string
    email: string
    password: string
}

export interface CustomRequest {
  user: IUser
  file: object
  params: object
  query: object
  path: object
}
export interface ILogin {
  email: string
  password: string
}
export interface IOrder{
  title: string
  deliveryAdress: string
}
export interface IUpdateOrder{
  title: string
  deliveryAdress: string
  payment: string
}
