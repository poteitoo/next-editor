import React from 'react';

import CopyToClipboard from 'react-copy-to-clipboard';

import { Katex } from '../../utils/types';
import { KatexText } from '../atoms/KatexText';

type SearchedTableProps = { repsents: Katex[] };

export const SearchedTable: React.FC<SearchedTableProps> = ({ repsents }) => {
  return (
    <table className="w-full table table-fixed text-left overflow-auto">
      <thead>
        <tr>
          <th className="w-1/4">シンボル</th>
          <th className="w-1/4">描画後</th>
          <th className="w-1/2">コマンド</th>
        </tr>
      </thead>
      <tbody>
        {repsents.slice(0, 30).map(({ symb, src, id }) => (
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
  );
};
