import React, { useRef } from 'react';
import { HtmlEditor, Toolbar, Item, TableContextMenu, MediaResizing, ImageUpload } from 'devextreme-react/html-editor';
import { Button } from 'devextreme-react';

const sizeValues = [ "8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt" ];
const fontValues = [ "Arial", "Georgia", "Tahoma", "Times New Roman", "Verdana" ];
const headerValues = [ false, 1, 2, 3, 4, 5 ];
const fu_options = { maxFileSize: 4000000 };
const token = '123'

export const HtmlEditorPage = () => {

    const editorRef = useRef<any>(null);

    const handleSubmit = () => {
        const htmlContent = editorRef.current?.instance?.option('value');
        console.log('Isi editor:', htmlContent);
        // Lalu bisa kamu simpan ke server lewat axios/fetch
    };

	return (
		<React.Fragment>
			<HtmlEditor
                
            >
				<Toolbar multiline={true}>
					<Item name="undo" />
					<Item name="redo" />
					<Item name="separator" />
					<Item name="size" acceptedValues={sizeValues} />
					<Item name="font" acceptedValues={fontValues} />
					<Item name="separator" />
					<Item name="bold" />
					<Item name="italic" />
					<Item name="strike" />
					<Item name="underline" />
					<Item name="separator" />
					<Item name="alignLeft" />
					<Item name="alignCenter" />
					<Item name="alignRight" />
					<Item name="alignJustify" />
					<Item name="separator" />
					<Item name="orderedList" />
					<Item name="bulletList" />
					<Item name="separator" />
					<Item name="header" acceptedValues={headerValues} />
					<Item name="separator" />
					<Item name="color" />
					<Item name="background" />
					<Item name="separator" />
					<Item name="link" />
					<Item name="image" />
					<Item name="separator" />
					<Item name="clear" />
					<Item name="codeBlock" />
					<Item name="blockquote" />
					<Item name="separator" />
					<Item name="insertTable" />
					<Item name="deleteTable" />
					<Item name="insertRowAbove" />
					<Item name="insertRowBelow" />
					<Item name="deleteRow" />
					<Item name="insertColumnLeft" />
					<Item name="insertColumnRight" />
					<Item name="deleteColumn" />
					<Item name="cellProperties" />
					<Item name="tableProperties" />
				</Toolbar>
				<ImageUpload 
					fileUploadMode='server' 
					tabs={ ['file', 'url']}
					uploadUrl='http://localhost:3000/api/upload'
					uploadDirectory='/upload'
					fileUploaderOptions={
                        {
                            ...fu_options, 
                            uploadHeaders: {
                                Authorization: `Bearer ${token}`
                            },
                            onUploadError(e) {
                                console.log(e);
                            },
                        }
                    }
				/>
				<TableContextMenu enabled={true} />
				<MediaResizing enabled={true} />
			</HtmlEditor>

            <Button
                onClick={handleSubmit}
                text='Submit'
            />
		</React.Fragment>
	);
};
