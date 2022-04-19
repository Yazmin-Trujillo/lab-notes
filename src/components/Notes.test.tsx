import React from 'react';
import { render, screen } from '@testing-library/react';
import { signOut } from '../lib/AuthService';
import Notes from './Notes';

jest.mock('../lib/AuthService')


fdescribe('Notes component', () => {

    const signOutMock = signOut as jest.MockedFunction<any>

    it('call signOut when clicking in button signOut', () => {
        let user={name:'', image:'', email:''}
        render(<Notes user={user} />);

        const button = screen.getByTestId('signOut');
        button.click();

        expect(signOutMock).toBeCalledTimes(1);
    });
});