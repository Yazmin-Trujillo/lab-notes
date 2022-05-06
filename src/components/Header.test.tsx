import React from 'react';
import { render, screen } from '@testing-library/react';
import { signOut } from '../lib/AuthService';
import Header from './Header';
import { act } from 'react-dom/test-utils';

jest.mock('../lib/AuthService', () => ({ signOut: jest.fn() }))


describe('Header component', () => {

    const signOutMock = signOut as jest.MockedFunction<any>

    it('call signOut when clicking in button signOut', () => {
        let user = { uid: '', name: '', image: '', email: '' }

        render(<Header user={user} />);

        const profileButton = screen.getByTestId('profile-button');
        act(() => profileButton.click());

        const button = screen.getByTestId('signOut');
        expect(button).toBeInTheDocument();
        act(() => button.click());

        expect(signOutMock).toBeCalledTimes(1);
    });

    it('clicking outside the component hides the profile', () => {
        let user = { uid: '', name: '', image: '', email: '' };

        render(
            <div data-testid="test-click-outside">
                <Header user={user} />;
            </div>
        );

        const profileButton = screen.getByTestId('profile-button');
        act(() => profileButton.click());

        const button = screen.getByTestId('signOut');
        expect(button).toBeInTheDocument();

        const outside = screen.getByTestId('test-click-outside');
        act(() => outside.click());

        expect(button).not.toBeInTheDocument();
    })
});