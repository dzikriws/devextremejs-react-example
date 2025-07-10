import React from "react";
import FileManager, {ItemView} from "devextreme-react/file-manager";

const fileItems = [
    {
        'name': 'Documents',
        'isDirectory': true,
        'items': [{
            'name': 'Projects',
            'isDirectory': true,
            'items': [{
                'name': 'About.rtf',
                'link_url': '/files/About.rtf',
                'isDirectory': false,
                'size': 1024
            }, {
                'name': 'Passwords.rtf',
                'link_url': '/files/Passwords.rtf',
                'isDirectory': false,
                'size': 2048
            }]
        }, {
            'name': 'About.xml',
            'link_url': '/files/About.xml',
            'isDirectory': false,
            'size': 1024
        }]
    },
    {
        'name': 'Documents2',
        'isDirectory': true,
        'items': [{
            'name': 'Projects',
            'isDirectory': true,
            'items': [{
                'name': 'About.rtf',
                'link_url': '/files/About.rtf',
                'isDirectory': false,
                'size': 1024
            }, {
                'name': 'Passwords.rtf',
                'link_url': '/files/Passwords.rtf',
                'isDirectory': false,
                'size': 2048
            }]
        }, {
            'name': 'About.xml',
            'link_url': '/files/About.xml',
            'isDirectory': false,
            'size': 1024
        }]
    }
];

const handleOpenFile = (e: any) => {
  const file = e.file;
  if (!file.isDirectory) {
    const fileName = file.link_url;
    const fileUrl = `/files/${fileName}`;

    window.open(fileUrl, '_blank');
  }
};

export function FileManagerPage(){

    // function customizeIcon(fileManagerItem : any) {
    //     if (fileManagerItem.isDirectory)
    //         return 'images/thumbnails/folder.svg';

    //     const ext = fileManagerItem.getExtension?.();
    //     switch (ext) {
    //         case '.txt':
    //         return 'images/thumbnails/doc-txt.svg';
    //         case '.rtf':
    //         return 'images/thumbnails/doc-rtf.svg';
    //         case '.xml':
    //         return 'images/thumbnails/doc-xml.svg';
    //         default:
    //         return ''; // fallback
    //     }
    // }

    return(
        <React.Fragment>
            <FileManager 
                // customizeThumbnail={customizeIcon}
                fileSystemProvider={fileItems}
                onSelectedFileOpened={handleOpenFile}
                hint="Select a file to open"
            >
                <ItemView
                    mode="thumbnails"
                    details={["name", "size"]}
                />
            </FileManager>
        </React.Fragment>
    )
}