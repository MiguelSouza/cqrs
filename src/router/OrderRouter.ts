import express from "express";
import { CreateOrderHandler } from "../commands/CreateOrderHandler";
import { GetOrdersByCustomerHandler } from "../queries/GetOrdersByCustomerHandler";
import { CreateOrderCommand } from "../commands/CreateOrderCommand";
import { GetOrdersByCustomerQuery } from "../queries/GetOrdersByCustomerQuery";

const router = express.Router();

export function createOrderRoutes(
  createOrderHandler: CreateOrderHandler,
  getOrdersHandler: GetOrdersByCustomerHandler
) {
  router.post("/orders", async (req, res) => {
    const command = new CreateOrderCommand(req.body);
    await createOrderHandler.execute(command);
    res.status(201).send({ status: "Order created" });
  });

  router.get("/orders/customer/:id", async (req, res) => {
    const query = new GetOrdersByCustomerQuery(req.params.id);
    const result = await getOrdersHandler.execute(query);
    res.send(result);
  });

  return router;
}
