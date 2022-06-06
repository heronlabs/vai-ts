export interface Command {
  getName(): string;
  run(options?: unknown): Promise<void>;
}
