type EventInstance = { constructor: { name: string } };

type Handler<T extends EventInstance> = {
  handle(event: T): void | Promise<void>;
};

export class EventBus {
  private handlers = new Map<string, Handler<any>[]>();

  subscribe<T extends EventInstance>(eventName: string, handler: Handler<T>) {
    const list = this.handlers.get(eventName) || [];
    list.push(handler);
    this.handlers.set(eventName, list);
  }

  async publish<T extends EventInstance>(event: T) {
    const name = event.constructor.name;
    const handlers = this.handlers.get(name) || [];
    await Promise.all(handlers.map((h) => h.handle(event)));
  }
}
