import express from "express";
import { Pool } from "pg";
import { OrderRepository } from "./infrastructure/postgres/OrderRepository";
import { ElasticsearchClient } from "./infrastructure/elasticsearch/ElasticsearchClient";
import { EventBus } from "./bus/EventBus";
import { OrderProjectionHandler } from "./events/OrderProjectionHandler";
import { CreateOrderHandler } from "./commands/CreateOrderHandler";
import { GetOrdersByCustomerHandler } from "./queries/GetOrdersByCustomerHandler";
import { createOrderRoutes } from "./router/OrderRouter";
import "dotenv/config";

const app = express();
app.use(express.json());
console.log(process.env.DATABASE_URL);
const db = new Pool({ connectionString: process.env.DATABASE_URL });
const elastic = new ElasticsearchClient();
const eventBus = new EventBus();

const repo = new OrderRepository(db);
const projectionHandler = new OrderProjectionHandler(elastic);
eventBus.subscribe("OrderCreatedEvent", projectionHandler);

const createHandler = new CreateOrderHandler(repo, eventBus);
const getOrdersHandler = new GetOrdersByCustomerHandler(elastic);

app.use(createOrderRoutes(createHandler, getOrdersHandler));

export { app };
