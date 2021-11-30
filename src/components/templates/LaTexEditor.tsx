import React, { useEffect, useState } from 'react';

import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import katex from 'katex';

import { AppConfig } from '../../constants/config';
import { Icon } from '../atoms/Icon';
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
      <div className="flex justify-between">
        <h1 className="text-lg font-bold">LaTexエディター</h1>
        <Icon
          icon={
            <div className="flex align-center gap-2">
              <AiOutlineSearch className="my-auto" size={24} />
              <kbd className="kbd my-auto">⌘</kbd>
              <span className="my-auto">+</span>
              <kbd className="kbd my-auto">k</kbd>
            </div>
          }
          onClick={() => console.log('clicked')}
        />
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col w-1/2">
          エディター
          <TextArea
            className="w-full h-full p-2 whitespace-pre-wrap placeholder-gray-500 textarea textarea-bordered"
            onChangeText={setCurrentText}
            value={currentText}
            placeholder="例：今日はガストでチーズインハンバーグを食べたい。"
          />
        </div>
        <div className="flex flex-col w-1/2">
          プレビュー
          <div
            dangerouslySetInnerHTML={{ __html: compiledText }}
            className="w-full h-full p-2 whitespace-pre-wrap placeholder-gray-500 textarea textarea-bordered"
          />
        </div>
      </div>
    </div>
  );
};
