export enum Color {
  WHITE = 'white',
}

export enum BackgroundColor {
  BG_CYAN = 'bgCyan',
  BG_BLUE = 'bgBlue',
  BG_GREEN = 'bgGreen',
}

export interface PrintOptions {
  color: Color;
  backgroundColor: BackgroundColor;
}
