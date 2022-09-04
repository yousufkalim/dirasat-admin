import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { baseUrl, mediaUrl } from 'config';

export default function Index(props) {
  const editor = useRef(null);
  const config = {
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: 'insert_clear_html',
    readonly: false,
    enableDragAndDropFileToEditor: true,
    uploader: {
      url: `${baseUrl}/images`,
      format: 'json',
      pathVariableName: 'path',
      filesVariableName: function (t) {
        return 'image';
      },
      prepareData: function (data) {
        return data;
      },
      isSuccess: function (resp) {
        if (resp) {
          return true;
        }
      },
      process: function (resp) {
        return {
          file: `${mediaUrl}${resp.image}` || [],
        };
      },
      defaultHandlerSuccess: function (data) {
        console.log(data.file);
        if (data.file) {
          this.selection.insertImage(data.file);
        }
      },
    },
    buttons: [
      'bold',
      'strikethrough',
      'underline',
      'italic',
      '|',
      'ul',
      'ol',
      '|',
      'outdent',
      'indent',
      '|',
      'font',
      'fontsize',
      'brush',
      '|',
      'image',
      'table',
      'link',
      '|',
      '|',
      'align',
      'undo',
      'redo',
      '|',
      'hr',
      '|',
    ],
    buttonsMD: [
      'bold',
      'strikethrough',
      'underline',
      'italic',
      '|',
      'ul',
      'ol',
      '|',
      'outdent',
      'indent',
      '|',
      'font',
      'fontsize',
      'brush',
      '|',
      'image',
      'table',
      'link',
      '|',
      '|',
      'align',
      'undo',
      'redo',
      '|',
      'hr',
      '|',
    ],
    buttonsSM: [
      'bold',
      'strikethrough',
      'underline',
      'italic',
      '|',
      'ul',
      'ol',
      '|',
      'outdent',
      'indent',
      '|',
      'font',
      'fontsize',
      'brush',
      '|',
      'image',
      'table',
      'link',
      '|',
      '|',
      'align',
      'undo',
      'redo',
      '|',
      'hr',
      '|',
    ],
    buttonsXS: [
      'bold',
      'strikethrough',
      'underline',
      'italic',
      '|',
      'ul',
      'ol',
      '|',
      'outdent',
      'indent',
      '|',
      'font',
      'fontsize',
      'brush',
      '|',
      'image',
      'table',
      'link',
      '|',
      '|',
      'align',
      'undo',
      'redo',
      '|',
      'hr',
      '|',
    ],
  };
  return (
    <JoditEditor
      ref={editor}
      value={props.value}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => props.setValue(newContent)}
      onChange={(newContent) => {}}
    />
  );
}
