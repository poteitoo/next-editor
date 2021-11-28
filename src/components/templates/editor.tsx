import React, { useState } from 'react';

import { AppConfig } from '../../constants/config';
import { Button } from '../atoms/Button';
import { TextArea } from '../atoms/TextArea';
import { Meta } from '../organisms/layout/Meta';

export const Editor: React.FC = () => {
  const [currentText, setCurrentText] = useState('');
  const [pastText, setPastText] = useState('');

  const onClickReset = () => {
    setPastText(currentText);
    setCurrentText('');
  };
  const onClickRecover = () => {
    const temp = currentText;
    setCurrentText(pastText);
    setPastText(temp);
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
        className="w-full p-2 mt-2 whitespace-pre-wrap placeholder-gray-600"
        onChangeText={setCurrentText}
        value={currentText}
        placeholder="例：今日はガストでチーズインハンバーグを食べたい。"
      />
      <div className="flex">
        <Button addClassName="mr-5" onClick={onClickReset}>
          リセットボタン
        </Button>
        <Button disable={pastText.length === 0} onClick={onClickRecover}>
          元に戻す
        </Button>
      </div>
    </div>
  );
};
