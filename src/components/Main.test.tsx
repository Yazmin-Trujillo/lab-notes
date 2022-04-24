import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Main from './Main';

describe('Main component', () => {
    it('when clicking in input New Note, show expanded note', () => {
        let user = { uid: '', name: '', image: '', email: '' }
        render(<Main user={user} />);

        const inputNewNote = screen.getByTestId('note-content');
        act(() => inputNewNote.click());

        const title = screen.getByTestId('note-title');
        const closeButton = screen.getByTestId('close-button');
        expect(title).toBeInTheDocument();
        expect(closeButton).toBeInTheDocument();
    });
})