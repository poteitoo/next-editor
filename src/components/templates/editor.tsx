import React, { useState } from 'react';

import { Button } from '../atoms/Button';
import { TextArea } from '../atoms/TextArea';

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
      <h1 className="w-1/2 text-lg font-bold">字数カウンター</h1>
      <div className="flex">
        <label className="pr-10">
          空白こみ：{currentText.replace(/\n/g, '').length}
        </label>
        {/* eslint-disable-next-line no-irregular-whitespace */}
        <label>空白抜き：{currentText.replace(/\s|　/g, '').length}</label>
      </div>
      <TextArea
        className="w-full px-2 mt-2 whitespace-pre-wrap"
        onChangeText={setCurrentText}
        value={currentText}
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
