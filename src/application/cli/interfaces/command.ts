export interface Command {
  getName(): string;
  run(): Promise<void>;
}
