import React from 'react';
import { render, screen } from '@testing-library/react';
import { SubdivisionDisplay } from './SubdivisionDisplay';
import userEvent from '@testing-library/user-event';


describe('SubdivisionDisplay Component', () => {
    it('subdivision status code dropdown renders successfully', async () => {
        render(<SubdivisionDisplay />);
        // I would normally use getByTestId rather than just text
        const statusFilterButton = screen.getByText('Subdivision status code filter');
        await userEvent.click(statusFilterButton)
        const activeFilterOptions = screen.getByText('Active');
        const futureFilterOptions = screen.getByText('Future');
        const builtoutFilterOptions = screen.getByText('Builtout');
        const clearOptions = screen.queryByText('Clear');

        
       
        expect(statusFilterButton).toBeInTheDocument();
        expect(activeFilterOptions).toBeInTheDocument();
        expect(futureFilterOptions).toBeInTheDocument();
        expect(builtoutFilterOptions).toBeInTheDocument();
        expect(clearOptions).not.toBeInTheDocument();

        await userEvent.click(activeFilterOptions);

        const clearOption = screen.getByText('Clear');
        expect(clearOption).toBeInTheDocument();

        await userEvent.click(clearOption);
        expect(screen.queryByText('Clear')).not.toBeInTheDocument();
        
    });

    it('Sort table dropdown renders successfully', async () => {
        render(<SubdivisionDisplay />);
        const sortButton = screen.getByText('Sort');
        await userEvent.click(sortButton)
        // finding multiple because of Market name in table
        const nameOption = screen.getByText('Name', { selector: 'button' })
        const nearMapImageDateOption = screen.getByText('Near Map Image Date');
        const longitude = screen.getByText('Longitude');
        const latitude = screen.getByText('Latitude');
        const clearOption = screen.queryByText('Clear');
        
        expect(nameOption).toBeInTheDocument();
        expect(nearMapImageDateOption).toBeInTheDocument();
        expect(longitude).toBeInTheDocument();
        expect(latitude).toBeInTheDocument();
        expect(clearOption).not.toBeInTheDocument();

        await userEvent.click(nameOption);

        const clearOptions = screen.getByText('Clear');
        expect(clearOptions).toBeInTheDocument();
        
        await userEvent.click(clearOptions);
        expect(screen.queryByText('Clear')).not.toBeInTheDocument();
        
    });
});
