import React from 'react';
import { render, screen } from '@testing-library/react';
import Notes from './Notes';

jest.mock('../lib/AuthService')


describe('Notes component', () => {

    it('show Header', () => {
        let user={name:'', image:'', email:''}
        render(<Notes user={user} />);

        const notes = screen.getByTestId('header');
        expect(notes).toBeInTheDocument();

    });
});