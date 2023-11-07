import React from 'react';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { DropDownComponent } from './Dropdown';


describe('DropDown Component', () => {
    it('dropdown component renders successfully when passed in values', async () => {
        const buttonText: string = 'test button text';
        const list = ['test_option_1', 'test_option_2']
        let displayClearOption = false;
        const onSelect = () => {
            displayClearOption = true;
        }
   
        render(<DropDownComponent buttonText={buttonText} list={list} onSelect={onSelect} displayClearOption={false} />);
       
        const sortButton = screen.getByText(buttonText);
        await userEvent.click(sortButton)

        const testOption1 = screen.getByText(list[0]);
        const testOption2 = screen.getByText(list[1]);
        
    });

});
