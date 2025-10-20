import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Footer from '../Footer'


describe('Componente Footer', () => {
  test('muestra el nombre del sitio', () => {
    render(<Footer />)
    expect(screen.getAllByText(/superfume/i)[0]).toBeInTheDocument()
  })

  test('muestra la dirección, teléfono y correo', () => {
    render(<Footer />)

    expect(screen.getByText(/Pasaje Mapocho 1329, Renca/i)).toBeInTheDocument()
    expect(screen.getByText('+56932190438')).toBeInTheDocument()
    expect(screen.getByText(/superfume@gmail.com/i)).toBeInTheDocument()
  })

  test('contiene las secciones Productos e Información adicional', () => {
    render(<Footer />)

    expect(screen.getByText(/Productos/i)).toBeInTheDocument()
    expect(screen.getByText(/Información Adicional/i)).toBeInTheDocument()

    // Verificamos algunos enlaces de ejemplo
    expect(screen.getByText(/Azzaro/i)).toBeInTheDocument()
    expect(screen.getByText(/Chanel/i)).toBeInTheDocument()
    expect(screen.getByText(/Conocenos/i)).toBeInTheDocument()
  })

  test('muestra el año actual', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(`© ${year} Superfume. Todos los derechos reservados.`)).toBeInTheDocument()
  })
})