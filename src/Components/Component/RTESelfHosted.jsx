import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form';

const RTESelfHosted = ({ name, control, label, defaultValue }) => {
    return (
        <div className="w-full">
            {label && <label htmlFor={name} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: true,
                            // Use the local version of TinyMCE from node_modules
                            // This avoids the need for an API key
                            skin_url: '/tinymce/skins/ui/oxide',
                            content_css: '/tinymce/skins/content/default/content.css',
                            plugins: [
                                'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
                                'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
                                'media', 'table', 'emoticons', 'help'
                            ],
                            toolbar: 
                                'undo redo | styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | ' +
                                'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
                                'forecolor backcolor emoticons | help',
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}

export default RTESelfHosted
