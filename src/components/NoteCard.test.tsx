import React from 'react';
import { render, screen } from '@testing-library/react';
import { deleteNote } from '../lib/DbService'
import NoteCard from './NoteCard';
import { Note } from '../models/Note';

jest.mock('../lib/DbService', () => ({ deleteNote: jest.fn() }))

describe('In the NoteCard component', () => {

    const deleteNoteMock = deleteNote as jest.MockedFunction<any>;

    it('single note is displayed', () => {
        const testNote: Note = { title: 'compras', content: 'pan', id: '2gf3d4s5s' }
        let user = { uid: '', name: '', image: '', email: '' };
        render(<NoteCard user={user} note={testNote} />);

        expect(screen.getByTestId('article')).toBeInTheDocument();
        expect(screen.getByText(testNote.title)).toBeInTheDocument();
        expect(screen.getByText(testNote.content)).toBeInTheDocument();
    });

    it('deleteNote is called when the trash can icon is clicked', () => {
        let user = { uid: '', name: '', image: '', email: '' };
        let note = { title: '', content: '', id: '' };
        render(<NoteCard user={user} note={note} />);

        const button = screen.getByTestId('delete-note');
        button.click();

        expect(deleteNoteMock).toBeCalledTimes(1);
    });
})