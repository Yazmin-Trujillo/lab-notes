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

        const noteAreaContainerMini = screen.getByTestId('note-area-container-mini');
        expect(noteAreaContainerMini).toBeInTheDocument();

        act(() => noteAreaContainerMini.click());
        expect(screen.queryByTestId('note-area-container-mini')).not.toBeInTheDocument();
        const noteAreaContainerMax = screen.getByTestId('maximized-area');
        expect(noteAreaContainerMax).toBeInTheDocument();
    });

    it('when clicking close button, if the note is not empty it is saved', () => {
        let user = { uid: '', name: '', image: '', email: '' }
        render(<CreateNotePanel user={user} />);

        const noteAreaContainerMini = screen.getByTestId('note-area-container-mini');

        act(() => noteAreaContainerMini.click());

        const noteContent = screen.getByTestId<HTMLTextAreaElement>('note-content');
        const title = screen.getByTestId<HTMLInputElement>('note-title');
        const closeButton = screen.getByTestId('close-button');

        userEvent.type(title, 'Compras');
        userEvent.type(noteContent, 'leche,pan,huevos');
        act(() => closeButton.click());

        expect(saveNoteMock).toBeCalledTimes(1);
        let note: Note = { title: 'Compras', content: 'leche,pan,huevos', id: '' };
        expect(saveNote).toBeCalledWith(user, note);
    });

    it('after saving the note, show note minimized.', () => {
        saveNoteMock.mockReturnValueOnce(Promise.resolve());
        let user = { uid: '', name: '', image: '', email: '' }
        render(<CreateNotePanel user={user} />);

        const noteAreaContainerMini = screen.getByTestId('note-area-container-mini');
        act(() => noteAreaContainerMini.click());

        const closeButton = screen.getByTestId('close-button');
        const title = screen.getByTestId<HTMLInputElement>('note-title');
        const noteContent = screen.getByTestId<HTMLTextAreaElement>('note-content');

        userEvent.type(title, 'Compras');
        userEvent.type(noteContent, 'leche,pan,huevos');
        act(() => closeButton.click());

        expect(noteAreaContainerMini).toBeInTheDocument();

    })

    it('onClickFn is called when clicked outside component', () => {
        let user = { uid: '', name: '', image: '', email: '' };
        saveNoteMock.mockReturnValueOnce(Promise.resolve());

        render(
            <div data-testid="test-click-outside">
                <CreateNotePanel user={user} />
            </div>
        );

        const noteAreaContainerMini = screen.getByTestId('note-area-container-mini');
        act(() => noteAreaContainerMini.click());
        expect(screen.queryByTestId('note-area-container-mini')).not.toBeInTheDocument();
        expect(screen.getByTestId('maximized-area')).toBeInTheDocument();
        const title = screen.getByTestId<HTMLInputElement>('note-title');
        const noteContent = screen.getByTestId<HTMLTextAreaElement>('note-content');

        userEvent.type(title, 'Compras');
        userEvent.type(noteContent, 'leche,pan,huevos');

        const outside = screen.getByTestId('test-click-outside');
        act(() => outside.click());

        expect(saveNoteMock).toBeCalledTimes(1);
        expect(noteAreaContainerMini).toBeInTheDocument();
    })
})