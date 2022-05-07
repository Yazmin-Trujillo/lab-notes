import React from 'react';
import { render, screen } from '@testing-library/react';
import { updateNote } from '../lib/DbService'
import { Note } from '../models/Note';
import EditNoteCard from './EditNoteCard';
import userEvent from '@testing-library/user-event';

jest.mock('../lib/DbService', () => ({ updateNote: jest.fn() }))

describe('EditNoteCard component', () => {

    const updateNoteMock = updateNote as jest.MockedFunction<any>;

    it('I must be able to see the note displayed with a title and/or content', () => {
        let user = { uid: '', name: '', image: '', email: '' };
        const testNote: Note = { title: 'compras', content: 'pan', id: '2gf3d4s5s' }
        const onClickFn = jest.fn();

        render(<EditNoteCard user={user} note={testNote} onClick={onClickFn} />);
        const title = screen.getByTestId<HTMLInputElement>('note-title');
        const noteContent = screen.getByTestId<HTMLTextAreaElement>('note-content');
        const closeButton = screen.getByTestId("close-button")

        expect(title.value).toBe('compras');
        expect(noteContent.value).toBe('pan');
        expect(closeButton).toBeInTheDocument();
        expect(updateNoteMock).toBeCalledTimes(0);
    })

    it('I should be able to save changes to the note', () => {
        let user = { uid: '', name: '', image: '', email: '' };
        const testNote: Note = { title: 'compras', content: 'pan', id: '2gf3d4s5s' }
        const onClickFn = jest.fn();

        render(<EditNoteCard user={user} note={testNote} onClick={onClickFn} />);

        const closeButton = screen.getByTestId('close-button');
        const title = screen.getByTestId<HTMLInputElement>('note-title');
        const content = screen.getByTestId<HTMLTextAreaElement>('note-content');
        userEvent.type(title, ' pendientes');
        userEvent.type(content, ', leche');
        closeButton.click();

        expect(updateNoteMock).toBeCalledTimes(1);
        expect(title.value).toBe('compras pendientes');
        expect(content.value).toBe('pan, leche');
        // let note: Note = { title: 'Compras', content: 'leche,pan,huevos', id: '' };
        // expect(saveNote).toBeCalledWith(user, note);
    })

    it('onClickFn is called when clicked outside component', () => {
        let user = { uid: '', name: '', image: '', email: '' };
        let note = { title: '', content: '', id: '' };
        const onClickFn = jest.fn();

        render(
            <div data-testid="test-click-outside">
                <EditNoteCard user={user} note={note} onClick={onClickFn} />
            </div>
        );

        const outside = screen.getByTestId('test-click-outside');
        outside.click();

        expect(onClickFn).toHaveBeenCalledTimes(1);
    })
})