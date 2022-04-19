import React from 'react';
import { render, screen } from '@testing-library/react';

import { signInWithGoogle } from "../lib/AuthService";
import Login from './Login';

jest.mock('../lib/AuthService')


describe('Login component', () => {

    const signInWithGoogleMock = signInWithGoogle as jest.MockedFunction<any>

    it('call signInWithGoogle when clicking in button register with google', () => {
        render(<Login />);

        const button = screen.getByTestId('google-login');
        button.click();

        expect(signInWithGoogleMock).toBeCalledTimes(1);
    });
});