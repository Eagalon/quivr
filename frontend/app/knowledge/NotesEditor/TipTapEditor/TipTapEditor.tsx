import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { useEffect } from "react";

import { useNotesEditorContext } from "@/lib/context/NotesEditorProvider/hooks/useNotesEditorContext";

import styles from "./TipTapEditor.module.scss";

const TipTapEditor = (): JSX.Element => {
  const { content, updateContent } = useNotesEditorContext();

  const tipTapEditor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      updateContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (tipTapEditor) {
      tipTapEditor.commands.setContent(content);
    }
  }, [content, tipTapEditor]);

  return (
    <div className={styles.editor_wrapper}>
      <EditorContent editor={tipTapEditor} />
    </div>
  );
};

export default TipTapEditor;
