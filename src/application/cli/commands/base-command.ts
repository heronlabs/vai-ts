export abstract class BaseCommand {
  protected envelope(message: string): void {
    const prefix = 'VAI-TS';

    console.log(`${prefix}: ${message}`);
  }
}
