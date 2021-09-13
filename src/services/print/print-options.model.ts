/**
 * Colors avaliables.
 */
export enum Color {
  WHITE = 'white',
}

/**
 * Background colors avaliables.
 */
export enum BackgroundColor {
  BG_CYAN = 'bgCyan',
  BG_BLUE = 'bgBlue',
  BG_GREEN = 'bgGreen',
}

/**
 * Interface for custom options in the text.
 */
export interface PrintOptions {
  color: Color;
  backgroundColor: BackgroundColor;
}
