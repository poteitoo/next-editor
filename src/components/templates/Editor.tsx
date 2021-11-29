import React, { useEffect, useState } from 'react';

import { parseCookies, setCookie } from 'nookies';

import { AppConfig } from '../../constants/config';
import { TextArea } from '../atoms/TextArea';
import { Meta } from '../organisms/layout/Meta';

export const Editor: React.FC = () => {
  const [currentText, setCurrentText] = useState('');
  const [isPastTextExisted, setIsPastTextExisted] = useState(false);

  useEffect(() => {
    const { text } = parseCookies(null);
    setCurrentText(text || '');
    setIsPastTextExisted(text !== undefined);
  }, []);

  const onClickReset = () => {
    if (currentText.length > 0) {
      setCookie(null, 'text', currentText, {
        maxAge: 24 * 60 * 60,
      });
      setCurrentText('');
      setIsPastTextExisted(true);
    }
  };
  const onClickRecover = () => {
    const temp = currentText;
    const { text: pastText } = parseCookies(null);

    setCurrentText(pastText || '');
    setCookie(null, 'text', temp, {
      maxAge: 24 * 60 * 60,
    });
  };

  return (
    <div className="container p-5">
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <h1 className="text-lg font-bold">字数カウンター</h1>
      <div className="flex">
        <label className="pr-10">
          空白こみ：{currentText.replace(/\n/g, '').length}
        </label>
        {/* eslint-disable-next-line no-irregular-whitespace */}
        <label>空白抜き：{currentText.replace(/\s|　/g, '').length}</label>
      </div>
      <TextArea
        className="w-full p-2 mt-2 whitespace-pre-wrap placeholder-gray-500 textarea textarea-bordered"
        onChangeText={setCurrentText}
        value={currentText}
        placeholder="例：今日はガストでチーズインハンバーグを食べたい。"
      />
      <div className="flex gap-5 mt-3">
        <button
          className="p-3 rounded hover:bg-gray-800 bg-gray-700"
          onClick={onClickReset}
        >
          リセットボタン
        </button>
        <button
          className="p-3 rounded hover:bg-gray-800 bg-gray-700"
          onClick={onClickRecover}
          disabled={!isPastTextExisted}
        >
          元に戻す
        </button>
      </div>
    </div>
  );
};
