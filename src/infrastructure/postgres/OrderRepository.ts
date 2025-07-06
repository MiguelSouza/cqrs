import { Order } from "../../domain/entities/Order";
import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";

export class OrderRepository {
  constructor(private readonly db: Pool) {}

  async save(order: Order) {
    const client = await this.db.connect();
    const id = uuidv4();
    try {
      await client.query("BEGIN");
      await client.query(
        "INSERT INTO orders (id, customer_id, total, items, status) VALUES ($1, $2, $3, $4, $5)",
        [
          id,
          order.customerId,
          order.total,
          JSON.stringify(order.items),
          order.status,
        ]
      );
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }
}
