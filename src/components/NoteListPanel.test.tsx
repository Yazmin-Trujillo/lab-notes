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

    it('single note is displayed', () => {
        const testNote: Note = { title: 'compras', content: 'pan' }
        seeNotesMock.mockImplementation(() => of([testNote]));

        let user = { uid: '', name: '', image: '', email: '' };
        render(<NoteListPanel user={user} />);

        expect(screen.getByTestId('article')).toBeInTheDocument();
        expect(screen.getByText(testNote.title)).toBeInTheDocument();
        expect(screen.getByText(testNote.content)).toBeInTheDocument();

    });

    it('multiple notes are displayed', () => {
        const testNote: Note = { title: 'compras', content: 'pan' }
        seeNotesMock.mockImplementation(() => of([testNote, testNote]));

        let user = { uid: '', name: '', image: '', email: '' };
        render(<NoteListPanel user={user} />);

        expect(screen.getAllByTestId('article').length).toBe(2);
    });

});