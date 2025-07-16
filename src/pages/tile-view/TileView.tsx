import React from 'react';
import { TileView } from 'devextreme-react/tile-view';
 
const tileViewData = [
    { text: 'Maine', capital: 'Augusta' },
    { text: 'Maryland', capital: 'Annapolis' },
    { text: 'Massachusetts', capital: 'Boston', height: 2, widthRatio: 2 }
];


export function TileViewPage(){
    return(
        <React.Fragment>
            <TileView
                dataSource={tileViewData}
                baseItemHeight={130}
                baseItemWidth={180}
                hint='Select a state'
            />
        </React.Fragment>
    )
}