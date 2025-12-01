import '@testing-library/jest-dom'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Carousel from '../Carousel'

describe('Carousel', () => {
  const images = [
    '/img/slide1.jpg',
    '/img/slide2.jpg',
    '/img/slide3.jpg'
  ]

  beforeEach(() => {
    vi.useFakeTimers() // control del tiempo para simular intervalos
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  test('no renderiza nada si no hay imágenes', () => {
    const { container } = render(<Carousel images={[]} />)
    expect(container.firstChild).toBeNull()
  })

  test('renderiza la primera imagen por defecto', () => {
    render(<Carousel images={images} />)
    const firstImage = screen.getByAltText('slide-0')
    expect(firstImage).toBeInTheDocument()
    expect(firstImage).toBeVisible()
  })

  test('permite navegar a la siguiente imagen con el botón "next"', () => {
    render(<Carousel images={images} />)

    const nextButton = screen.getByLabelText('next')
    fireEvent.click(nextButton)

    // La segunda imagen debe ser visible
    const secondImage = screen.getByAltText('slide-1')
    expect(secondImage).toBeVisible()
  })

  test('permite navegar a la imagen anterior con el botón "previous"', () => {
    render(<Carousel images={images} />)

    const prevButton = screen.getByLabelText('previous')
    fireEvent.click(prevButton)

    // Como retrocede desde índice 0, debe ir a la última
    const lastImage = screen.getByAltText('slide-2')
    expect(lastImage).toBeVisible()
  })

  test('cambia automáticamente de imagen después del intervalo', () => {
    render(<Carousel images={images} interval={3000} />)

    const first = screen.getByAltText('slide-0')
    expect(first).toBeVisible()

    // Avanzamos 3 segundos simulados
    act(() => {
      vi.advanceTimersByTime(3000)
    })

    const second = screen.getByAltText('slide-1')
    expect(second).toBeVisible()
  })

  test('permite seleccionar directamente una imagen usando los indicadores', () => {
    render(<Carousel images={images} />)

    const goToBtn = screen.getByLabelText('go-to-2')
    fireEvent.click(goToBtn)

    const thirdImage = screen.getByAltText('slide-2')
    expect(thirdImage).toBeVisible()
  })
})
