import React, { useState, useEffect, useRef } from 'react'
import { Typography } from "@mui/material";

export default function Ckeditor ({ updateText }) {
    const editorRef = useRef()
    const [editorLoaded, setEditorLoaded] = useState(false)
    const { CKEditor, ClassicEditor } = editorRef.current || {}

    useEffect(() => {
        editorRef.current = {
            // CKEditor: require('@ckeditor/ckeditor5-react'), // depricated in v3
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
        }
        setEditorLoaded(true)
    }, [])

    return editorLoaded ? (
        <CKEditor
            editor={ClassicEditor}
            data={``}
            onReady={editor => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor)
            }}
            onChange={(event, editor) => {
                const data = editor.getData()
                updateText(data)
            }}
        />
    ) : (
        <div>Editor loading</div>
    )
}