import React, { useEffect, useState } from 'react';

import katex from 'katex';
// import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { AppConfig } from '../../constants/config';
// import { Icon } from '../atoms/Icon';
import { useSearchKatexCommand } from '../../hooks/useSearchKatexCommand';
import { Katex } from '../../utils/types';
import { KatexText } from '../atoms/KatexText';
import { TextArea } from '../atoms/TextArea';
import { Meta } from '../organisms/layout/Meta';

export type LaTexEditorTemplate = {
  katexCommands: {
    [value: string]: Katex;
  };
};

export const LaTexEditor: React.FC<LaTexEditorTemplate> = ({
  katexCommands,
}) => {
  const [currentText, setCurrentText] = useState('');
  const [compiledText, setCompiledText] = useState('');
  // const [isModalOpen, setIsModalOpen] = useState(false);
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
        {/* <Icon
          icon={
            <div className="flex align-center gap-2">
              <AiOutlineSearch className="my-auto" size={24} />
              <kbd className="kbd my-auto">⌘</kbd>
              <span className="my-auto">+</span>
              <kbd className="kbd my-auto">k</kbd>
            </div>
          }
          onClick={() => setIsModalOpen(true)}
        /> */}
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col w-1/2 gap-2">
          <label>エディター</label>
          <TextArea
            className="w-full h-full p-2 whitespace-pre-wrap placeholder-gray-500 textarea textarea-bordered"
            onChangeText={setCurrentText}
            value={currentText}
            placeholder="例：今日はガストでチーズインハンバーグを食べたい。"
          />
        </div>
        <div className="flex flex-col w-1/2 gap-2">
          <label>プレビュー</label>
          <div
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

      <table className="w-full table table-fixed text-left overflow-auto">
        <thead>
          <tr>
            <th className="w-1/4">シンボル</th>
            <th className="w-1/4">描画後</th>
            <th className="w-1/2">コマンド</th>
          </tr>
        </thead>
        <tbody>
          {katexsRepsents.slice(0, 30).map(({ symb, src, id }) => (
            <CopyToClipboard text={src || symb} key={id}>
              <tr>
                <td className="truncate">{symb}</td>
                <td className="truncate">
                  <KatexText text={src} isIgnoreError={true} />
                </td>
                <td className="truncate">{src}</td>
              </tr>
            </CopyToClipboard>
          ))}
        </tbody>
      </table>

      {/* <SearchModal
        katexs={katexsRepsents}
        isOpen={isModalOpen}
        onCloseModal={setIsModalOpen}
        onChangeText={setSearchKeyword}
      /> */}
    </div>
  );
};
