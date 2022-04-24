import React from 'react';
import { render, screen } from '@testing-library/react';
import Notes from './Notes';

describe('Notes component', () => {

    it('show Header', () => {
        let user={uid:'', name:'', image:'', email:''}
        render(<Notes user={user} />);

        const notes = screen.getByTestId('header');
        expect(notes).toBeInTheDocument();

    });
});