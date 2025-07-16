import React from 'react';
import { TextBox } from 'devextreme-react/text-box';

export const TextBoxPage = () => {
	return (
		<React.Fragment>
			<TextBox 
                mode='text'
                label='What is Your Answer'
                labelMode='floating'
                showClearButton={true}
                showMaskMode='always'
            />
		</React.Fragment>
	);
};
