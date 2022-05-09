import React from 'react';
import { render, screen } from '@testing-library/react';
import { updateNote, deleteNote } from '../lib/DbService'
import { Note } from '../models/Note';
import EditNoteCard from './EditNoteCard';
import userEvent from '@testing-library/user-event';

jest.mock('../lib/DbService', () => ({ updateNote: jest.fn(), deleteNote: jest.fn() }))

describe('EditNoteCard component', () => {

    const updateNoteMock = updateNote as jest.MockedFunction<any>;
    const deleteNoteMock = deleteNote as jest.MockedFunction<any>;


    it('I must be able to see the note displayed with a title and/or content', () => {
        let user = { uid: '', name: '', image: '', email: '' };
        const testNote: Note = { title: 'compras', content: 'pan', id: '2gf3d4s5s' }
        const onCloseFn = jest.fn();

        render(<EditNoteCard user={user} note={testNote} onClose={onCloseFn} />);
        const title = screen.getByTestId<HTMLInputElement>('note-title');
        const noteContent = screen.getByTestId<HTMLTextAreaElement>('note-content');
        const closeButton = screen.getByTestId("close-button")

        expect(title.value).toBe('compras');
        expect(noteContent.value).toBe('pan');
        expect(closeButton).toBeInTheDocument();
        expect(deleteNoteMock).not.toBeCalled();
        expect(updateNoteMock).not.toBeCalled();
    })

    it('I should be able to save changes to the note', () => {
        let user = { uid: '', name: '', image: '', email: '' };
        let testNote: Note = { title: 'compras', content: 'pan', id: '2gf3d4s5s' }
        const onCloseFn = jest.fn();

        render(<EditNoteCard user={user} note={testNote} onClose={onCloseFn} />);

        const closeButton = screen.getByTestId('close-button');
        const title = screen.getByTestId<HTMLInputElement>('note-title');
        const content = screen.getByTestId<HTMLTextAreaElement>('note-content');
        userEvent.type(title, ' pendientes');
        userEvent.type(content, ', leche');
        closeButton.click();

        expect(updateNoteMock).toBeCalledTimes(1);
        expect(title.value).toBe('compras pendientes');
        expect(content.value).toBe('pan, leche');
    })

    it('onClickFn is called when clicked outside component', () => {
        let user = { uid: '', name: '', image: '', email: '' };
        let note = { title: '', content: '', id: '' };
        const onCloseFn = jest.fn();

        render(
            <div data-testid="test-click-outside">
                <EditNoteCard user={user} note={note} onClose={onCloseFn} />
            </div>
        );

        const outside = screen.getByTestId('test-click-outside');
        outside.click();

        expect(onCloseFn).toHaveBeenCalledTimes(1);
    })
})