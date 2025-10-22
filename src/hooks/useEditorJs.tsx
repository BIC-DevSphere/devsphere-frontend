import { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';

export const useEditorJs = (initialData?: any) => {
  const editorRef = useRef<EditorJS | null>(null);
  const editorHolder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current && editorHolder.current) {
      editorRef.current = new EditorJS({
        holder: editorHolder.current,
        tools: {
          header: Header,
          list: List,
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+O',
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: "Quote's author",
            },
          },
        },
        defaultBlock: 'paragraph',
        minHeight: 240,
        style: {},
        placeholder: 'Enter project description here...',
        data: initialData || {
          time: Date.now(),
          blocks: [
            {
              type: 'header',
              data: {
                text: 'Project Title',
                level: 1,
              },
            },
            {
              type: 'paragraph',
              data: {
                text: 'Describe your project here. Include features, tech stack, and any other relevant details.',
              },
            },
          ],
        },
      });
    }
    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === 'function') {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [initialData]);

  return { editorRef, editorHolder };
};
