import * as React from 'react';
import { Component } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import Bold from '../../../icons/bold';
import Italic from '../../../icons/italic';
import Underline from '../../../icons/underline';
import './styles.css';

export interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

export interface State {
}

/**
 * Toolbar component for DraftJS editor.
 */
export class Toolbar extends Component<Props, State> {

  toggleInlineStyle = (event) => {
    event.preventDefault();
    const { editorState, onChange } = this.props;
    let newState = RichUtils.toggleInlineStyle(
      editorState,
      event.currentTarget.name,
    );
    if (newState) {
      onChange(newState);
    }
  };

  render() {
    const { editorState, onChange } = this.props;
    return (
      <div className="toolbar">
        <button name="BOLD" className="toolbar-icon" onMouseDown={this.toggleInlineStyle}><Bold /></button>
        <button name="ITALIC" className="toolbar-icon" onMouseDown={this.toggleInlineStyle}><Italic /></button>
        <button name="UNDERLINE" className="toolbar-icon" onMouseDown={this.toggleInlineStyle}><Underline /></button>
      </div>
    );
  }
}
