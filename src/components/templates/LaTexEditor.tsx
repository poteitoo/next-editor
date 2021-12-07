import React, { useEffect, useState } from 'react';

import katex from 'katex';

import { AppConfig } from '../../constants/config';
import { useSearchKatexCommand } from '../../hooks/useSearchKatexCommand';
import { Katex } from '../../utils/types';
import { TextArea } from '../atoms/TextArea';
import { Meta } from '../organisms/layout/Meta';
import { SearchedTable } from '../organisms/SearchedTable';

export type LaTexEditorTemplateProps = {
  katexCommands: {
    [value: string]: Katex;
  };
};

export const LaTexEditorTemplate: React.FC<LaTexEditorTemplateProps> = ({
  katexCommands,
}) => {
  const [currentText, setCurrentText] = useState('');
  const [compiledText, setCompiledText] = useState('');
  const [katexsRepsents, setKatexRepsents] = useState<Katex[] | []>([]);

  const { results, setSearchWord } = useSearchKatexCommand(
    Object.values(katexCommands)
  );

  useEffect(() => {
    const commands = Object.values(katexCommands);
    setKatexRepsents(commands);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (results.length > 0) {
      setKatexRepsents(results);
    } else {
      setKatexRepsents(Object.values(katexCommands));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  useEffect(() => {
    try {
      const html = katex.renderToString(currentText, {
        throwOnError: true,
      });
      setCompiledText(html);
    } catch (e) {
      if (e instanceof katex.ParseError) {
        const html = `Error in LaTeX '${currentText}': ${e.message}`
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        setCompiledText(html);
      } else {
        throw e;
      }
    }
  }, [currentText]);

  return (
    <div className="flex container flex-col p-5 gap-3">
      <Meta title="Latexエディター" description={AppConfig.description}>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.css"
          integrity="sha384-WsHMgfkABRyG494OmuiNmkAOk8nhO1qE+Y6wns6v+EoNoTNxrWxYpl5ZYWFOLPCM"
          crossOrigin="anonymous"
        />
      </Meta>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">LaTexエディター</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col md:w-1/2 gap-2">
          <label>エディター</label>
          <TextArea
            data-testid="editor"
            className="w-full h-full p-2 whitespace-pre-wrap placeholder-gray-500 textarea textarea-bordered"
            onChangeText={setCurrentText}
            value={currentText}
            placeholder="例：今日はガストでチーズインハンバーグを食べたい。"
          />
        </div>
        <div className="flex flex-col md:w-1/2 gap-2">
          <label>プレビュー</label>
          <div
            data-testid="preview"
            dangerouslySetInnerHTML={{ __html: compiledText }}
            className="w-full h-full p-2 whitespace-pre-wrap placeholder-gray-500 textarea textarea-bordered"
          />
        </div>
      </div>

      <input
        type="text"
        placeholder="検索"
        className="w-full mt-3 input input-bordered"
        onChange={(e) => setSearchWord(e.target.value)}
      />

      <SearchedTable repsents={katexsRepsents} />
    </div>
  );
};
