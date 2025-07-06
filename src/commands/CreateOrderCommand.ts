import { Order } from "../domain/entities/Order";

export class CreateOrderCommand {
  constructor(public readonly payload: Order) {}
}
