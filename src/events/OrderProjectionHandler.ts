import { ElasticsearchClient } from "../infrastructure/elasticsearch/ElasticsearchClient";
import { OrderCreatedEvent } from "./OrderCreatedEvent";

export class OrderProjectionHandler {
  constructor(private readonly elastic: ElasticsearchClient) {}

  async handle(event: OrderCreatedEvent) {
    const order = event.payload;
    await this.elastic.index({
      index: "orders",
      id: order.id,
      document: { ...order },
    });
  }
}
