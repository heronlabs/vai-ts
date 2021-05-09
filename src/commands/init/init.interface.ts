/**
 * Interface for the Init command execution.
 */
export interface IInit {
  /**
   * Initialize the implementation purpose.
   * @param projectName The project name.
   */
  init(projectName: string): Promise<void>;
}
