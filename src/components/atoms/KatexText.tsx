import React, { useEffect, useState } from 'react';

import katex from 'katex';

type KatexTextProps = {
  html?: string;
  text?: string | null;
  isIgnoreError?: boolean;
};

const KatexTextWrapper: React.FC<KatexTextProps> = ({
  html = '',
  text = '',
  isIgnoreError = false,
  ...props
}) => {
  const [renderText, setRenderText] = useState('');

  useEffect(() => {
    if (html.length > 0) {
      setRenderText(html);
    } else if (text && text.length > 0) {
      try {
        const htmlText = katex.renderToString(text, {
          throwOnError: true,
        });
        setRenderText(htmlText);
      } catch (e) {
        if (!isIgnoreError && e instanceof katex.ParseError) {
          const htmlText = `Error in LaTeX '${text}': ${e.message}`
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          setRenderText(htmlText);
        }
      }
    } else {
      setRenderText('');
    }
  }, [text, html, isIgnoreError]);

  return <div dangerouslySetInnerHTML={{ __html: renderText }} {...props} />;
};

export const KatexText = React.memo(KatexTextWrapper);
