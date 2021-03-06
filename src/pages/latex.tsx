import { NextPage } from 'next';

import {
  LaTexEditorTemplate,
  LaTexEditorTemplateProps,
} from '../components/templates/LaTexEditor';

const Latex: NextPage<LaTexEditorTemplateProps> = (props) => (
  <LaTexEditorTemplate katexCommands={props.katexCommands} />
);

Latex.getInitialProps = async () => {
  const katexCommands = await import('../../public/katex_commands.json')
    .then((d) => Object.values(d.default))
    .then((arr) => arr.map((d, i) => ({ ...d, id: i })))
    .then((arr) =>
      arr.length > 0
        ? arr.reduce((d, x) => ({ ...d, [x.id]: x }), { 0: arr[0] })
        : {}
    );

  return { katexCommands };
};

export default Latex;
