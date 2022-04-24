import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from './Main';
import { saveNote } from '../lib/DbService'

jest.mock('../lib/DbService');

describe('Main component', () => {
    // const [showNoteArea, setShowNoteArea] = React.useState();
    const saveNoteMock = saveNote as jest.MockedFunction<any>;

    it('call setShowNoteArea() when clicking in input New Note', () => {
        // const spy = jest.spyOn(setShowNoteArea, '');
        let user={uid:'', name:'', image:'', email:''}
        render(<Main user={user} />);

        const inputNewNote = screen.getByTestId('inputNewNote');
        inputNewNote.click();
        const title = screen.getByTestId('inputTitle');


        expect(title).toBeInTheDocument();
        });

})