import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import { LTR } from '../../consts/strings.js';
import './RichTextEditor.css';
import 'draft-js/dist/Draft.css';

export const RichTextEditor = forwardRef((props, ref) => {
  const { initContent, onContentChange, direction } = props;
  const [editorState, setEditorState] = useState(() =>
    initContent === '' ? EditorState.createEmpty() : EditorState.createWithContent(initContent)
  );
  const editor = useRef(null);

  const focus = null; //() => refs.editor.focus();

  const onChange = (editorState) => {
    setEditorState(editorState);
    onContentChange(editorState.getCurrentContent());
  };

  const _handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };

  const _mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  const _toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const _toggleInlineStyle = (inlineStyle) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = 'RichEditor-editor';
  const contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  const onEditorFocus = () => {
    editor.current.focus();
  };

  useEffect(() => {
    if (initContent !== '') {
      setEditorState(EditorState.createWithContent(initContent));
    }
  }, [initContent]);

  return (
    <div className='RichEditor-root'>
      <BlockStyleControls editorState={editorState} onToggle={_toggleBlockType} />
      <InlineStyleControls editorState={editorState} onToggle={_toggleInlineStyle} />
      <div className={className} onClick={focus}>
        <Editor
          name={'content'}
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={_handleKeyCommand}
          keyBindingFn={_mapKeyToEditorCommand}
          onChange={onChange}
          placeholder='Your cover text...'
          ref={editor}
          textAlignment={direction === LTR ? 'left' : 'right'}
          // textDirectionality='RTL'
          onFocus={onEditorFocus}
          spellCheck={true}
        />
      </div>
    </div>
  );
});

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
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

const StyleButton = (props) => {
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

const BlockStyleControls = (props) => {
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

var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
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

export default RichTextEditor;
