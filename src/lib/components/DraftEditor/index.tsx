import * as React from "react";
import { Component } from "react";
import { Editor, EditorState, RichUtils, convertFromRaw } from "draft-js";
import * as DraftJSUtils from "draftjs-utils";
import { Toolbar } from "../Toolbar";
import { blockStyleFn, getEditorHeight, getStyleMap } from "../../utils/draft";
import "../../../../node_modules/draft-js/dist/Draft.css";
import "./styles.css";

const customStyleMap = getStyleMap();

export interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
  customFonts?: any[];
  defaultValue?: object;
  onSave: Function;
}

export interface State {}

/**
 * Editor component with DeraftJS Editor component as child.
 */
export class DraftEditor extends Component<Props, State> {
  editor: DraftEditor = undefined;

  constructor(props) {
    super(props);
    if (props.defaultValue) {
      this.initializeEditor(props.defaultValue);
    }
  }

  componentWillReceiveProps(props) {
    if (!this.props.defaultValue && props.defaultValue) {
      this.initializeEditor(props.defaultValue);
    }
  }

  initializeEditor = rawContentState => {
    const contentState = convertFromRaw(rawContentState);
    const editorState = EditorState.createWithContent(contentState);
    this.props.onChange(EditorState.moveSelectionToEnd(editorState));
  };

  setEditorReference = ref => {
    this.editor = ref;
  };

  focusEditor = () => {
    (this.editor as any).focus();
  };

  handleKeyCommand: any = command => {
    const { editorState, onChange } = this.props;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };

  handleReturn = (): any => {
    const editorHeight = getEditorHeight();
    if (editorHeight && editorHeight >= 480) {
      return true;
    }
    return false;
  };

  render() {
    const { editorState, onChange, customFonts, onSave } = this.props;
    return (
      <div>
        <Toolbar
          editorState={editorState}
          onChange={onChange}
          customFonts={customFonts}
          onSave={onSave}
        />
        <div className="dce-editor-container" onClick={this.focusEditor}>
          <Editor
            ref={this.setEditorReference}
            customStyleMap={customStyleMap}
            blockStyleFn={blockStyleFn}
            handleKeyCommand={this.handleKeyCommand}
            handleReturn={this.handleReturn}
            editorState={editorState}
            onChange={onChange}
          />
        </div>
      </div>
    );
  }
}
