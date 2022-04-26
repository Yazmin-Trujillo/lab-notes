import React from 'react';
import { render } from '@testing-library/react';
import NoteListPanel from './NoteListPanel';
import { seeNotes } from '../lib/DbService'


jest.mock('../lib/DbService', () => ({ seeNotes: jest.fn() }))

describe('NoteListPanel component', () => {
    const seeNotesMock = seeNotes as jest.MockedFunction<any>

    it('notes are displayed', () => {
        let user = { uid: '', name: '', image: '', email: '' };
        render(<NoteListPanel user={user} />);

        expect(seeNotesMock).toBeCalledTimes(1);

    });

});