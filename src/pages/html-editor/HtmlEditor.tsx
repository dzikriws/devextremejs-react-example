import React, { useRef, useState, useCallback } from 'react';
import { HtmlEditor, Toolbar, Item, TableContextMenu, MediaResizing, ImageUpload } from 'devextreme-react/html-editor';
// import CheckBox, { type CheckBoxTypes } from 'devextreme-react/check-box';
// import SelectBox, { type SelectBoxTypes } from 'devextreme-react/select-box';
import { Button } from 'devextreme-react';

const sizeValues = [ "8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt" ];
const fontValues = [ "Arial", "Georgia", "Tahoma", "Times New Roman", "Verdana" ];
const headerValues = [ false, 1, 2, 3, 4, 5 ];
// const fu_options = { maxFileSize: 4000000 };
// const token = '123'

// interface Tab {
//   name: string,
//   value: ('file' | 'url')[],
// }
// const tabs: Tab[] = [
//   { name: 'From This Device', value: ['file'] },
//   { name: 'From the Web', value: ['url'] },
//   { name: 'Both', value: ['file', 'url'] },
// ];

// const tabLabel = { 'aria-label': 'Tab' };


export const HtmlEditorPage = () => {
	// const [isMultiline, setIsMultiline] = useState(true);
	// const [currentTab, setCurrentTab] = useState(tabs[2].value);

	// const multilineChanged = useCallback((e: CheckBoxTypes.ValueChangedEvent) => {
	// 	setIsMultiline(e.value);
	// }, [setIsMultiline]);

	// const currentTabChanged = useCallback((e: SelectBoxTypes.ValueChangedEvent) => {
	// 	setCurrentTab(e.value);
	// }, [setCurrentTab]);


    const editorRef = useRef<any>(null);

    const handleSubmit = () => {
        const htmlContent = editorRef.current?.instance?.option('value');
        console.log('Isi editor:', htmlContent);
    };

	return (
		<React.Fragment>
			<HtmlEditor
				ref={editorRef}
			>
				<MediaResizing enabled={true} />
				<ImageUpload 
					fileUploadMode='base64'
					tabs={ ['file', 'url']}
					// uploadUrl='http://localhost:3000/api/upload'
					// fileUploaderOptions={
                    //     {
                    //         ...fu_options,
                    //         onUploadError(e) {
                    //             console.log(e);
                    //         },
                    //     }
                    // }
				/>
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
				<TableContextMenu enabled={true} />
				<MediaResizing enabled={true} />
			</HtmlEditor>
			{/* <div className="options">
				<div className="caption">Options</div>
				<div className="option">
				<CheckBox
					text="Multiline toolbar"
					value={isMultiline}
					onValueChanged={multilineChanged}
				/>
				</div>
				<div className="option">
				<div className="label">Image upload tabs:</div>
				<SelectBox
					items={tabs}
					value={currentTab}
					valueExpr="value"
					inputAttr={tabLabel}
					displayExpr="name"
					onValueChanged={currentTabChanged}
				/>
				</div>
			</div> */}

            <Button
                onClick={handleSubmit}
                text='Submit'
            />
		</React.Fragment>
	);
};
