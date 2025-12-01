# SuperfumeReact - Guía Rápida de Integración Backend

## Cambios Realizados

### 1. Configuración de API
- .env.local creado con VITE_API_BASE=http://localhost:8080/api
- .env.example creado como plantilla para otros desarrolladores
- Interceptor JWT agregado en client.js para autenticación automática

### 2. Nuevos Servicios
- services/pedido.jsx - Gestión de pedidos (PedidoController)
- services/pago.jsx - Gestión de pagos (PagoController)

### 3. Características de Seguridad
- Token JWT se agrega automáticamente en header Authorization: Bearer <token>
- Redirección automática a /login si token expira (401)
- Soporte para modo offline/online automático

---

## Próximos Pasos

### Para el Backend (Spring Boot):

1. Configurar CORS en application.properties:
   ```properties
   spring.web.cors.allowed-origins=http://localhost:5173,http://localhost:5175,https://xmvxyz.github.io
   spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
   spring.web.cors.allowed-headers=*
   server.servlet.context-path=/api
   ```

2. Verificar endpoints coincidan con los servicios React:
   - /api/auth/login → LoginRequestDto
   - /api/auth/register → RegisterRequestDto
   - /api/perfumes → PerfumeController
   - /api/pedidos → PedidoController
   - /api/pagos → PagoController
   - /api/carrito → CarritoController

3. Implementar JWT en Spring Boot (si no está):
   - Generar token en /auth/login y /auth/register
   - Validar token en endpoints protegidos

### Para el Frontend (React):

1. Reiniciar el dev server:
   ```bash
   cd react-app
   npm run dev
   ```

2. Probar la integración:
   - Login → Debe enviar request a http://localhost:8080/api/auth/login
   - Productos → Debe cargar desde http://localhost:8080/api/perfumes
   - Carrito → Debe sincronizarse con backend

---

## Documentación Completa

Lee INTEGRACION.md para:
- Estructura de requests/responses esperada
- Configuración detallada de CORS
- Troubleshooting de errores comunes
- Checklist completo de integración

---

## Modo de Desarrollo

La app funciona en dos modos:

### Modo Online (con backend)
```env
VITE_API_BASE=http://localhost:8080/api
```
- Datos en PostgreSQL/MySQL vía Spring Boot
- Autenticación JWT real
- Carrito persistente en base de datos

### Modo Offline (sin backend)
```env
VITE_API_BASE=
```
- Datos en localStorage del navegador
- Autenticación simulada
- Carrito persistente en navegador

---

## Estructura de Servicios

```
src/services/
├── client.js       → Axios client con interceptor JWT
├── usuario.jsx     → Auth (login, register, logout)
├── perfume.jsx     → CRUD productos
├── carrito.jsx     → Gestión carrito
├── pedido.jsx      → Gestión pedidos
└── pago.jsx        → Gestión pagos
```

---

## Ejemplo de Uso

### Crear un pedido desde el carrito:

```javascript
import { create } from '../services/pedido'
import { getCart, clearCart } from '../services/carrito'

async function checkout() {
  try {
    const cartItems = await getCart()
    const total = cartItems.reduce((sum, item) => sum + item.total, 0)
    
    const order = await create({
      items: cartItems,
      total: total,
      direccion: 'Calle Principal 123',
      metodoPago: 'TARJETA'
    })
    
    await clearCart()
    console.log('Pedido creado:', order)
  } catch (error) {
    console.error('Error al crear pedido:', error)
  }
}
```

---

## Listo para usar

1. Frontend configurado
2. Backend necesita configuración CORS
3. Verificar estructura de DTOs coincida con servicios React

Todo listo para conectar ambos proyectos.
