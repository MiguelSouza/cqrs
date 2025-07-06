import { ElasticsearchClient } from "../infrastructure/elasticsearch/ElasticsearchClient";
import { GetOrdersByCustomerQuery } from "./GetOrdersByCustomerQuery";

export class GetOrdersByCustomerHandler {
  constructor(private readonly elastic: ElasticsearchClient) {}

  async execute(query: GetOrdersByCustomerQuery) {
    const result = await this.elastic.search({
      index: "orders",
      body: {
        query: { match: { customerId: query.customerId } },
      },
    });

    return result.hits.hits.map((hit: any) => hit._source);
  }
}
