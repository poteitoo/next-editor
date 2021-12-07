declare global {
  namespace jest {
    interface Matchers<R> {
      toBeContained(a: string): R;
    }
  }
}

export type Katex = {
  symb: string;
  src: string | null;
  html?: string;
  id: number;
};
