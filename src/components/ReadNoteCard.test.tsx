import React from 'react';
import { render, screen } from '@testing-library/react';
import { deleteNote } from '../lib/DbService'
import { Note } from '../models/Note';
import ReadNoteCard from './ReadNoteCard';

jest.mock('../lib/DbService', () => ({ deleteNote: jest.fn() }))

describe('In the ReadNoteCard component', () => {

    const deleteNoteMock = deleteNote as jest.MockedFunction<any>;

    it('single note is displayed', () => {
        const testNote: Note = { title: 'compras', content: 'pan', id: '2gf3d4s5s' }
        let user = { uid: '', name: '', image: '', email: '' };
        const onClickFn = jest.fn();

        render(<ReadNoteCard user={user} note={testNote} onClick={onClickFn} />);

        expect(screen.getByTestId('article')).toBeInTheDocument();
        expect(screen.getByText(testNote.title)).toBeInTheDocument();
        expect(screen.getByText(testNote.content)).toBeInTheDocument();
    });

    it('deleteNote is called when the trash can icon is clicked', () => {
        let user = { uid: '', name: '', image: '', email: '' };
        let note = { title: '', content: '', id: '' };
        const onClickFn = jest.fn();

        render(<ReadNoteCard user={user} note={note} onClick={onClickFn} />);

        const button = screen.getByTestId('delete-note');
        button.click();

        expect(deleteNoteMock).toBeCalledTimes(1);
    });

    it('onClickFn is called when clicked inside component', () => {
        let user = { uid: '', name: '', image: '', email: '' };
        let note = { title: '', content: '', id: '' };
        const onClickFn = jest.fn();

        render(<ReadNoteCard user={user} note={note} onClick={onClickFn} />);

        const inside = screen.getByTestId('article');
        inside.click();

        expect(onClickFn).toHaveBeenCalledTimes(1);
    })

})