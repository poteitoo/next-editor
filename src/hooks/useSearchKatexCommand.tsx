import { useCallback, useEffect, useState } from 'react';

import { useDebounce } from 'use-debounce';

import { Katex } from '../utils/types';

type UseSearchKatexCommandProps = Katex[];

export const useSearchKatexCommand = (
  katexDictionary: UseSearchKatexCommandProps
) => {
  const [searchWord, setSearchWord] = useState('');
  const [results, setResults] = useState<Katex[]>([]);
  const [searchText] = useDebounce(searchWord, 500);

  const fuse = useCallback(async () => {
    const Fuse = (await import('fuse.js')).default;
    const options = { keys: ['src', 'symb'] };
    const index = Fuse.createIndex(options.keys, katexDictionary);
    return new Fuse(katexDictionary, options, index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fuseSearch = async () => {
      const f = await fuse();
      const res = f.search(searchText, { limit: 30 });
      setResults(res.map((arr) => arr.item));
    };
    fuseSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return { results, setSearchWord };
};
