import React from 'react';
import { render, screen } from '@testing-library/react';
import NoteListPanel from './NoteListPanel';
import { seeNotes } from '../lib/DbService'
import { of } from 'rxjs';
import { Note } from '../models/Note';

jest.mock('../lib/DbService', () => ({ seeNotes: jest.fn() }))

describe('NoteListPanel component', () => {
    const seeNotesMock = seeNotes as jest.MockedFunction<any>

    it('notes container is displayed', () => {
        seeNotesMock.mockImplementation(() => of([]));

        let user = { uid: '', name: '', image: '', email: '' };
        render(<NoteListPanel user={user} />);

        const section = screen.getByTestId('section');
        expect(section).toBeInTheDocument();
    });

    it('multiple notes are displayed', () => {
        const testNote1: Note = { title: 'compras', content: 'pan', id: '1f2f3g3h4' }
        const testNote2: Note = { title: 'pendientes', content: 'lavar', id: '1f2f3g3h5' }
        seeNotesMock.mockImplementation(() => of([testNote1, testNote2]));

        let user = { uid: '', name: '', image: '', email: '' };
        render(<NoteListPanel user={user} />);

        expect(screen.getAllByTestId('article').length).toBe(2);
    });

});