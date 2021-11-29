import React, { useEffect, useState } from 'react';

import katex from 'katex';

import { AppConfig } from '../../constants/config';
import { TextArea } from '../atoms/TextArea';
import { Meta } from '../organisms/layout/Meta';

export const LaTexEditor: React.FC = () => {
  const [currentText, setCurrentText] = useState('');
  const [compiledText, setCompiledText] = useState('');

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
    <div className="container p-5">
      <Meta title={AppConfig.title} description={AppConfig.description}>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.css"
          integrity="sha384-WsHMgfkABRyG494OmuiNmkAOk8nhO1qE+Y6wns6v+EoNoTNxrWxYpl5ZYWFOLPCM"
          crossOrigin="anonymous"
        />
      </Meta>
      <h1 className="text-lg font-bold">LaTexエディター</h1>
      <div className="flex">
        <div className="w-1/2 mr-5">
          エディター
          <TextArea
            className="w-full h-full rounded p-2 whitespace-pre-wrap placeholder-gray-600"
            onChangeText={setCurrentText}
            value={currentText}
            placeholder="例：今日はガストでチーズインハンバーグを食べたい。"
          />
        </div>
        <div className="flex flex-col w-1/2 mr-5">
          プレビュー
          <div
            dangerouslySetInnerHTML={{ __html: compiledText }}
            className="w-full h-full bg-white rounded p-2 whitespace-pre-wrap placeholder-gray-600"
          />
        </div>
      </div>
    </div>
  );
};
