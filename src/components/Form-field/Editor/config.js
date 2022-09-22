import { Flex } from '@chakra-ui/react';
import BlotFormatter from 'quill-blot-formatter';
import React from 'react';
import { Quill } from 'react-quill';
import { RedoIcon, UndoIcon } from '~/components/Icons';

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

// Add sizes to whitelist and register them
const Size = Quill.import('formats/size');
Size.whitelist = ['extra-small', 'small', 'medium', 'large'];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import('formats/font');
Font.whitelist = ['arial', 'comic-sans', 'courier-new', 'georgia', 'helvetica', 'lucida'];
Quill.register(Font, true);

// blot formatter
Quill.register('modules/blotFormatter', BlotFormatter);

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
  blotFormatter: {},
};

// Formats objects for setting up the Quill editor
export const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'script',
  'blockquote',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'color',
  'code-block',
];

// Quill Toolbar component
const QuillToolbar = () => (
  <Flex
    align="center"
    wrap="wrap"
    id="toolbar"
    sx={{
      '& > *': {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    }}
  >
    <Flex align="center">
      <select className="ql-font" defaultValue="arial">
        <option value="arial">Arial</option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
      </select>
      <select className="ql-size" defaultValue="medium">
        <option value="extra-small">Size 1</option>
        <option value="small">Size 2</option>
        <option value="medium">Size 3</option>
        <option value="large">Size 4</option>
      </select>
      <select className="ql-header" defaultValue="3">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">Normal</option>
      </select>
    </Flex>

    <Flex>
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </Flex>

    <Flex>
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </Flex>

    <Flex>
      <button className="ql-script" value="super" />
      <button className="ql-script" value="sub" />
      <button className="ql-blockquote" />
      <button className="ql-direction" />
    </Flex>

    <Flex>
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </Flex>

    <Flex>
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
    </Flex>

    <Flex>
      <button className="ql-formula" />
      <button className="ql-code-block" />
      <button className="ql-clean" />
    </Flex>

    <Flex>
      <button className="ql-undo">
        <UndoIcon />
      </button>
      <button className="ql-redo">
        <RedoIcon />
      </button>
    </Flex>
  </Flex>
);

export default QuillToolbar;
