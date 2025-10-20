import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn()
  }
})

describe('Header', () => {
  test('renders main links and toggles search overlay', () => {
    render(<MemoryRouter><Header /></MemoryRouter>)

    expect(screen.getByText(/Inicio/i)).toBeInTheDocument()
    expect(screen.getByText(/Tienda/i)).toBeInTheDocument()
    expect(screen.getByText(/Contacto/i)).toBeInTheDocument()

    const searchBtn = screen.getAllByLabelText(/Buscar/i)[0]
    fireEvent.click(searchBtn)

    expect(screen.getByPlaceholderText(/Buscar Productos/i)).toBeInTheDocument()

    const cancelBtn = screen.getByText(/Cancelar/i)
    fireEvent.click(cancelBtn)
    expect(screen.queryByPlaceholderText(/Buscar Productos/i)).not.toBeInTheDocument()
  })
})
