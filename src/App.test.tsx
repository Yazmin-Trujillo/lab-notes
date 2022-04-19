import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Login from './components/Login';
import Notes from './components/Notes';
import { userChanged } from './lib/AuthService';
import { of } from 'rxjs';

jest.mock('./components/Login');
jest.mock('./components/Notes');
jest.mock('./lib/AuthService');

describe('App component', () => {

  const loginMock = Login as jest.MockedFunction<typeof Login>;
  const notesMock = Notes as jest.MockedFunction<typeof Notes>;
  const userChangedMock = userChanged as jest.MockedFunction<any>

  it('displays Login page when user is undefined', async () => {
    userChangedMock.mockImplementation(() => of(undefined));
    loginMock.mockImplementation(() => <div>access's Test Text</div>);

    render(<App />);

    const login = await screen.findByText(/access's Test Text/);
    expect(login).toBeInTheDocument();
  });

  it('display Notes page when user is defined', async () => {
    userChangedMock.mockImplementation(() => of({ name: 'cualquiercosa', image: 'cualquiercosa' }));
    notesMock.mockImplementation(() => <div>my notes</div>);

    render(<App />);

    const notes = await screen.findByText(/my notes/);
    expect(notes).toBeInTheDocument();
  });

});
