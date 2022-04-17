import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

function MockAccess() {
  return <div>MockComponentContent</div>;
}
function MockNotes() {
  return <div>mis notas</div>;
}

jest.mock('./routes/Access', () => {
  return MockAccess;
})
jest.mock('./routes/Notes', () => {
  return MockNotes;
})

describe('App component', () => {
  it('show navigation links', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    await screen.findByText(/MockComponentContent/);

    const accessLink = screen.getByText(/Access/i);
    expect(accessLink).toBeInTheDocument();
    const notesLink = screen.getByText(/Notes/i);
    expect(notesLink).toBeInTheDocument();
  });
  it('displays access page with route "/"', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const access = await screen.findByText(/MockComponentContent/);
    expect(access).toBeInTheDocument();
  });

  it('display notes page with route "/notes"', async () => {
    render(
      <MemoryRouter initialEntries={["/notes"]}>
        <App />
      </MemoryRouter>
    );

    const notes = await screen.findByText(/mis notas/);
    expect(notes).toBeInTheDocument();
  })
});
