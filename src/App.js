import React, { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons";
import { faDownLeftAndUpRightToCenter } from "@fortawesome/free-solid-svg-icons";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";



const demoMarkdown = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\\\`\\\`\\\`' && lastLine == '\\\`\\\`\\\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;



export default function App() {
  const [editor, setEditor] = useState("");
  const [preview, setPreview] = useState("");
  const [previewMax, setPreviewMax] = useState(false);
  const [editorMax, setEditorMax] = useState(false);

  useEffect(() => {
    setEditor(demoMarkdown);
    setPreview(marked.parse(demoMarkdown));
  }, []);

  function convertToMarkdown(event) {
    setPreview(marked.parse(event.target.value));
    setEditor(event.target.value);
  }

  function editorMinMax() {
    setEditorMax(!editorMax);
  }

  function previewMinMax() {
    setPreviewMax(!previewMax);
  }

  return (
    <div className="App">
      <h1 className="title">Markdown Previewer</h1>

      <div className="editorBox">
        <div className="toolbar">
          Editor
          <FontAwesomeIcon
            id="faEditor"
            className={`icon ${editorMax ? "max" : ""}`}
            icon={editorMax ? faDownLeftAndUpRightToCenter : faMaximize}
            onClick={editorMinMax}
          />
        </div>
        <textarea id="editor" type="text" spellCheck="false" className="" value={editor} onChange={convertToMarkdown} />
      </div>

      <div className="previewBox">
        <div className="toolbar">
          Preview
          <FontAwesomeIcon
            id="faPreview"
            className={`icon ${previewMax ? "max" : ""}`}
            icon={previewMax ? faDownLeftAndUpRightToCenter : faMaximize}
            onClick={previewMinMax}
          />
        </div>
        <div id="preview" dangerouslySetInnerHTML={{ __html: preview }} />
      </div>
    </div>
  );
}
