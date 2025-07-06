import { Order } from "../domain/entities/Order";

export class OrderCreatedEvent {
  constructor(public readonly payload: Order) {}
}
