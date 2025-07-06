type QueryInstance = { constructor: { name: string } };

type QueryHandler<T extends QueryInstance> = {
  execute(query: T): Promise<any>;
};

export class QueryBus {
  private handlers = new Map<string, QueryHandler<any>>();

  register<T extends QueryInstance>(
    queryName: string,
    handler: QueryHandler<T>
  ) {
    this.handlers.set(queryName, handler);
  }

  async execute<T extends QueryInstance>(query: T): Promise<any> {
    const handler = this.handlers.get(query.constructor.name);
    if (!handler) {
      throw new Error(
        `No handler registered for query ${query.constructor.name}`
      );
    }
    return handler.execute(query);
  }
}
