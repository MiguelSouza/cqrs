type CommandInstance = { constructor: { name: string } };

type CommandHandler<T extends CommandInstance> = {
  execute(command: T): Promise<any>;
};

export class CommandBus {
  private handlers = new Map<string, CommandHandler<any>>();

  register<T extends CommandInstance>(
    commandName: string,
    handler: CommandHandler<T>
  ) {
    this.handlers.set(commandName, handler);
  }

  async execute<T extends CommandInstance>(command: T): Promise<any> {
    const handler = this.handlers.get(command.constructor.name);
    if (!handler) {
      throw new Error(
        `No handler registered for command ${command.constructor.name}`
      );
    }
    return handler.execute(command);
  }
}
