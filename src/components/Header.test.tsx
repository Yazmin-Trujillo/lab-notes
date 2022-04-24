import React from 'react';
import { render, screen } from '@testing-library/react';
import { signOut } from '../lib/AuthService';
import Header from './Header';

jest.mock('../lib/AuthService', () => ({ signOut: jest.fn() }))


describe('Header component', () => {

    const signOutMock = signOut as jest.MockedFunction<any>

    it('call signOut when clicking in button signOut', () => {
        let user={uid:'', name:'', image:'', email:''}
        render(<Header user={user} />);

        const button = screen.getByTestId('signOut');
        button.click();

        expect(signOutMock).toBeCalledTimes(1);
    });
});