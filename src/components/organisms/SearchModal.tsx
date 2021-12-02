import React from 'react';

import { Modal } from '../atoms/Modal';

export type Katex = {
  symb: string;
  src: string | null;
  html?: string;
};

type SearchModalProps = {
  katexs: Katex[];
  isOpen?: boolean;
  onChangeText?: (text: string) => void;
  onCloseModal?: (value: boolean) => void;
};

export const SearchModal: React.FC<SearchModalProps> = ({
  katexs,
  isOpen = true,
  onChangeText = () => {},
  onCloseModal = () => {},
}) => {
  return (
    <Modal isOpen={isOpen}>
      <div className="modal-box lg:w-4/6 h-3/6">
        <input
          type="text"
          placeholder="検索"
          className="w-full input input-bordered"
          onChange={(e) => onChangeText(e.target.value)}
        />

        <table className="table w-full">
          <thead>
            <tr>
              <th>シンボル</th>
              <th>コマンド</th>
              <th>描画後</th>
            </tr>
          </thead>
          <tbody>
            {katexs.map(({ symb, src }, i) => (
              <tr key={i}>
                <td>{symb}</td>
                <td>{src}</td>
                <td>Blue</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="modal-action">
          <button onClick={() => onCloseModal(false)} className="btn">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
