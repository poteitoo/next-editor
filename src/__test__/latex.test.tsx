/**
 * @jest-environment jsdom
 */

import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { LaTexEditorTemplate } from '../components/templates/LaTexEditor';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/',
    };
  },
}));

expect.extend({
  toBeContained(received: HTMLDivElement, str: string) {
    const conditions = received.innerHTML.includes(str);
    if (conditions) {
      return {
        message: () => `expected ${str} to be included in ${received}`,
        pass: true,
      };
    }
    return {
      message: () => `expected ${str} not to be included in ${received}`,
      pass: false,
    };
  },
});

describe('pages/latex', () => {
  describe('textareaに入力された値が、プレビューに正しくレンダリングされるか', () => {
    beforeEach(async () => {
      // katexのコマンド一覧を読み込み、扱いやすい形に変換する
      // ex. {0:{src: '...', symb: '...', id :0}, 1:{src: '...', symb: '...', id :0}...}
      const katexCommands = await import('../../public/katex_commands.json')
        .then((d) => Object.values(d.default))
        .then((arr) => arr.map((d, i) => ({ ...d, id: i })))
        .then((arr) =>
          arr.length > 0
            ? arr.reduce((d, x) => ({ ...d, [x.id]: x }), { 0: arr[0] })
            : {}
        );
      render(<LaTexEditorTemplate katexCommands={katexCommands} />);
    });

    test('レンダリングされる', async () => {
      const text = '\\mathop{\\star}_a^b';
      const textarea = screen.getByTestId('editor');
      fireEvent.change(textarea, { target: { value: text } });
      expect(screen.getByTestId('preview')).not.toBeContained('Error');
      expect(screen.getByTestId('preview')).toBeContained('katex');
    });

    test('エラー文が表示される', async () => {
      const text = '\\def\bar#1{#1^2} \bar{y}\\';
      const textarea = screen.getByTestId('editor');
      fireEvent.change(textarea, { target: { value: text } });
      expect(screen.getByTestId('preview')).toBeContained('Error');
    });
  });
});
