import React from 'react';
import { render, screen } from '@testing-library/react';
import { deleteNote } from '../lib/DbService'
import NoteCard from './NoteCard';

jest.mock('../lib/DbService', () => ({ deleteNote: jest.fn() }))

describe('In the NoteCard component ', () => {

    const deleteNoteMock = deleteNote as jest.MockedFunction<any>;

    it('deleteNote is called when the trash can icon is clicked', () => {
        let user = { uid: '', name: '', image: '', email: '' };
        let note = { title: '', content: '', id: '' };
        render(<NoteCard user={user} note={note} />);

        const button = screen.getByTestId('delete-note');
        button.click();

        expect(deleteNoteMock).toBeCalledTimes(1);
    });
})