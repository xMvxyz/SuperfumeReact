# Integración React + Spring Boot - SuperfumeReact

## Configuración del Backend (Spring Boot)

### 1. Configurar CORS en application.properties

Agrega estas líneas a tu archivo `src/main/resources/application.properties`:

```properties
# ===================================
# CORS Configuration
# ===================================
# Permitir requests desde React (desarrollo y producción)
spring.web.cors.allowed-origins=http://localhost:5173,http://localhost:5175,https://xmvxyz.github.io
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
spring.web.cors.max-age=3600

# ===================================
# Server Configuration
# ===================================
server.port=8080
spring.application.name=Superfume

# ===================================
# Base Path para API
# ===================================
server.servlet.context-path=/api
```

### 2. Configuración JWT (si usas autenticación con tokens)

Si implementas JWT en Spring Boot, agrega:

```properties
# ===================================
# JWT Configuration
# ===================================
jwt.secret=tu-secret-key-muy-segura-de-al-menos-256-bits
jwt.expiration=86400000
# 86400000 ms = 24 horas
```

### 3. Estructura de Respuestas Esperadas

El frontend React espera las siguientes estructuras JSON:

#### **POST /api/auth/login**
Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Usuario Ejemplo",
    "role": "CLIENTE"
  }
}
```

#### **POST /api/auth/register**
Request:
```json
{
  "email": "nuevo@example.com",
  "password": "password123",
  "name": "Nuevo Usuario"
}
```

Response: (igual que login)

#### **GET /api/products**
Response:
```json
[
  {
    "id": 1,
    "nombre": "Perfume Ejemplo",
    "precio": 89.99,
    "descripcion": "Descripción del perfume",
    "imagen": "url-de-imagen.jpg",
    "categoria": "Hombre",
    "stock": 50
  }
]
```

#### **POST /api/pedidos**
Request:
```json
{
  "items": [
    {
      "id": 1,
      "nombre": "Perfume A",
      "precio": 89.99,
      "qty": 2,
      "total": 179.98
    }
  ],
  "total": 179.98,
  "direccion": "Calle Principal 123",
  "metodoPago": "TARJETA"
}
```

Response:
```json
{
  "id": 1,
  "fecha": "2025-12-01T10:30:00",
  "estado": "PENDIENTE",
  "total": 179.98,
  "items": [...],
  "direccion": "Calle Principal 123"
}
```

---

## Configuración del Frontend (React)

### 1. Variables de Entorno

Ya está configurado en .env.local:
```env
VITE_API_BASE=http://localhost:8080/api
```

### 2. Servicios Disponibles

#### Autenticación (services/usuario.jsx)
- register({ email, password, name }) - Registrar usuario
- login({ email, password }) - Iniciar sesión
- logout() - Cerrar sesión
- getProfile() - Obtener perfil del usuario actual

#### Productos (services/perfume.jsx)
- list() - Listar todos los productos
- get(id) - Obtener producto por ID
- create(product) - Crear producto (admin)
- update(id, updates) - Actualizar producto
- remove(id) - Eliminar producto

#### Carrito (services/carrito.jsx)
- getCart() - Obtener carrito
- addItem(item) - Agregar item
- updateItem(id, updates) - Actualizar cantidad
- removeItem(id) - Eliminar item
- clearCart() - Vaciar carrito

#### Pedidos (services/pedido.jsx)
- list() - Listar pedidos del usuario
- get(id) - Obtener pedido por ID
- create(orderData) - Crear pedido
- updateStatus(id, { estado }) - Actualizar estado
- cancel(id) - Cancelar pedido

#### Pagos (services/pago.jsx)
- processPayment(paymentData) - Procesar pago
- get(id) - Obtener detalles de pago
- getByOrder(orderId) - Obtener pagos de un pedido
- list() - Listar todos los pagos

---

## Pasos para Integrar

### En Spring Boot:

1. Abrir src/main/resources/application.properties
2. Copiar la configuración CORS de arriba
3. Reiniciar el servidor Spring Boot
4. Verificar que corra en http://localhost:8080

### En React:

1. Ya está configurado - .env.local creado
2. Reiniciar el dev server:
   ```bash
   npm run dev
   ```
3. Verificar la consola del navegador para ver los requests a la API

---

## Probar la Integración

### 1. Verificar Backend
```bash
# En navegador o Postman:
http://localhost:8080/api/products

# Debería devolver lista de productos (o array vacío)
```

### 2. Verificar Frontend
```bash
# La app React ya intentará conectarse automáticamente
# Si VITE_API_BASE está configurado, usará el backend
# Si no, usará localStorage como fallback
```

### 3. Verificar CORS
Abre la consola del navegador (F12) y busca errores como:
- "CORS policy: No 'Access-Control-Allow-Origin'"
- Si no ves este error, CORS está bien configurado

---

## Seguridad

### Headers que el frontend envía automáticamente:

```javascript
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json
```

### En Spring Boot, valida el token JWT en cada endpoint protegido:

```java
@RestController
@RequestMapping("/api")
public class PerfumeController {
    
    @GetMapping("/products")
    public ResponseEntity<?> getProducts() {
        // Público - sin autenticación
        return ResponseEntity.ok(perfumeService.findAll());
    }
    
    @PostMapping("/products")
    @PreAuthorize("hasRole('ADMIN')") // Solo admin
    public ResponseEntity<?> createProduct(@RequestBody PerfumeRequestDto dto) {
        return ResponseEntity.ok(perfumeService.create(dto));
    }
}
```

---

## Checklist de Integración

- [ ] Backend corriendo en `http://localhost:8080`
- [ ] CORS configurado en `application.properties`
- [ ] Frontend tiene `.env.local` con `VITE_API_BASE=http://localhost:8080/api`
- [ ] Dev server reiniciado después de crear `.env.local`
- [ ] Endpoints devuelven las estructuras JSON esperadas
- [ ] JWT tokens se generan correctamente en login/register
- [ ] No hay errores de CORS en la consola del navegador

---

## Troubleshooting

### Error: "Network Error"
- Verifica que Spring Boot esté corriendo
- Verifica el puerto en VITE_API_BASE

### Error: "CORS policy"
- Agrega la configuración CORS en application.properties
- Reinicia Spring Boot

### Error: "401 Unauthorized"
- Verifica que el token JWT se esté generando correctamente
- Verifica que el token se envíe en el header Authorization
- Verifica que la validación JWT esté correcta en el backend

### El frontend sigue usando localStorage
- Asegúrate de que .env.local exista en react-app/
- Reinicia el dev server (npm run dev)
- Verifica con console.log(import.meta.env.VITE_API_BASE) en el código
