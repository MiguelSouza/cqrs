import { EventBus } from "../bus/EventBus";
import { OrderCreatedEvent } from "../events/OrderCreatedEvent";
import { OrderRepository } from "../infrastructure/postgres/OrderRepository";
import { CreateOrderCommand } from "./CreateOrderCommand";

export class CreateOrderHandler {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: CreateOrderCommand) {
    await this.orderRepo.save(command.payload);
    this.eventBus.publish(new OrderCreatedEvent(command.payload));
  }
}
