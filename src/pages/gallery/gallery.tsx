import React from "react";
import { Gallery } from 'devextreme-react/gallery';

const dataSource = [
    'https://js.devexpress.com/Content/images/doc/25_1/PhoneJS/person1.png',
    'https://js.devexpress.com/Content/images/doc/25_1/PhoneJS/person2.png',
    'https://js.devexpress.com/Content/images/doc/25_1/PhoneJS/person3.png'
];

export function GalleryPage(){
    return(
        <React.Fragment>
            <Gallery 
                dataSource={dataSource} 
                swipeEnabled={true}
                showNavButtons={true}
                height={300}
                loop={true}
                indicatorEnabled={true}
                defaultSelectedIndex={(dataSource.length)/2}
            />
        </React.Fragment>
    )
}