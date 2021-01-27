import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  // { label: 'Blockquote', style: 'blockquote' },
  // { label: 'UL', style: 'unordered-list-item' },
  // { label: 'OL', style: 'ordered-list-item' },
  // { label: 'Code Block', style: 'code-block' },
];

export const convertJsonToEditorContent = (json) => {
  if (json === '') return EditorState.createEmpty().getCurrentContent();
  return convertFromRaw(JSON.parse(json));
};

export const convertEditorContentToJson = (state) => {
  if (state === '') return '';
  return JSON.stringify(convertToRaw(state));
};

export const getBlockStyle = (block) => {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    case 'unstyled':
      return 'RichEditor-unstyled';
    case 'header-one':
      return 'RichEditor-header-one';
    case 'header-two':
      return 'RichEditor-header-two';
    case 'header-three':
      return 'RichEditor-header-three';
    case 'header-four':
      return 'RichEditor-header-four';
    case 'header-five':
      return 'RichEditor-header-five';
    case 'header-six':
      return 'RichEditor-header-six';
    default:
      return null;
  }
};

export const StyleButton = (props) => {
  const onToggle = (e) => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  let className = 'RichEditor-styleButton';
  if (props.active) {
    className += ' RichEditor-activeButton';
  }

  return (
    <span className={className} onMouseDown={onToggle}>
      {props.label}
    </span>
  );
};

export const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

  return (
    <div className='RichEditor-controls'>
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className='RichEditor-controls'>
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
