export class ConsolePresenter {
  static readonly PREFIX = 'VAI-TS';

  envelope(message: string): void {
    console.log(`${ConsolePresenter.PREFIX}: ${message}`);
  }
}
