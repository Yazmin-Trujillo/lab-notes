import React from 'react';
import { act, render, screen } from '@testing-library/react';
import CreateNotePanel from './CreateNotePanel';
import { saveNote } from '../lib/DbService'
import userEvent from '@testing-library/user-event';
import { Note } from '../models/Note';

jest.mock('../lib/DbService', () => ({ saveNote: jest.fn() }))

describe('CreateNotePanel component', () => {
    const saveNoteMock = saveNote as jest.MockedFunction<any>

    it('when clicking in input New Note, show expanded note', () => {
        let user = { uid: '', name: '', image: '', email: '' };
        render(<CreateNotePanel user={user} />);

        const notePanel = screen.getByTestId('note-panel');
        expect(notePanel.classList).toContain('minimized');

        const noteContent = screen.getByTestId('note-content');
        act(() => noteContent.click());
        expect(notePanel.classList).not.toContain('minimized');
    });

    it('when clicking close button, if the note is not empty it is saved', () => {
        let user = { uid: '', name: '', image: '', email: '' }
        render(<CreateNotePanel user={user} />);

        const noteContent = screen.getByTestId('note-content');
        act(() => noteContent.click());

        const closeButton = screen.getByTestId('close-button');
        const title = screen.getByTestId('note-title');
        userEvent.type(title, 'Compras');
        userEvent.type(noteContent, 'leche,pan,huevos');
        act(() => closeButton.click());

        expect(saveNote).toBeCalledTimes(1);
        let note: Note = { title: 'Compras', content: 'leche,pan,huevos', id: '' };
        expect(saveNote).toBeCalledWith(user, note);
    });

    it('after saving the note the text box is cleared and hidden.', () => {
        saveNoteMock.mockReturnValueOnce(Promise.resolve());
        let user = { uid: '', name: '', image: '', email: '' }
        render(<CreateNotePanel user={user} />);

        const noteContent = screen.getByTestId<HTMLTextAreaElement>('note-content');
        act(() => noteContent.click());

        const closeButton = screen.getByTestId('close-button');
        const title = screen.getByTestId<HTMLInputElement>('note-title');
        userEvent.type(title, 'Compras');
        userEvent.type(noteContent, 'leche,pan,huevos');
        act(() => closeButton.click());

        expect(title.value).toBe('');
        expect(noteContent.value).toBe('');
        const notePanel = screen.getByTestId('note-panel');
        expect(notePanel.classList).toContain('minimized')
    })

    it('onCloseFn is called when clicked outside component', () => {
        let user = { uid: '', name: '', image: '', email: '' };
        saveNoteMock.mockReturnValueOnce(Promise.resolve());

        render(
            <div data-testid="test-click-outside">
                <CreateNotePanel user={user} />
            </div>
        );

        const noteContent = screen.getByTestId<HTMLTextAreaElement>('note-content');
        act(() => noteContent.click());

        const outside = screen.getByTestId('test-click-outside');
        const title = screen.getByTestId<HTMLInputElement>('note-title');
        userEvent.type(title, 'Compras');
        userEvent.type(noteContent, 'leche,pan,huevos');
        act(() => outside.click());

        expect(title.value).toBe('');
        expect(noteContent.value).toBe('');
        const notePanel = screen.getByTestId('note-panel');
        expect(notePanel.classList).toContain('minimized');
    })
})