import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import Access from './components/Access';
import Notes from './components/Notes';

jest.mock('./Components/Access');
jest.mock('./Components/Notes');

describe('App component', () => {
  const accessMock = Access as jest.MockedFunction<typeof Access>;
  const notesMock = Notes as jest.MockedFunction<typeof Notes>;

  it('show navigation links', async () => {
    accessMock.mockImplementation(() => <div>access's Test Text</div>);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    await screen.findByText(/access's Test Text/);

    const accessLink = screen.getByText(/Access/);
    expect(accessLink).toBeInTheDocument();
    const notesLink = screen.getByText(/Notes/);
    expect(notesLink).toBeInTheDocument();
  });

  it('displays access page with route "/"', async () => {
    accessMock.mockImplementation(() => <div>access's Test Text</div>);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const access = await screen.findByText(/access's Test Text/);
    expect(access).toBeInTheDocument();
  });

  it('display notes page with route "/notes"', async () => {
    notesMock.mockImplementation(() => <div>my notes</div>);
    render(
      <MemoryRouter initialEntries={["/notes"]}>
        <App />
      </MemoryRouter>
    );

    const notes = await screen.findByText(/my notes/);
    expect(notes).toBeInTheDocument();
  })
});
