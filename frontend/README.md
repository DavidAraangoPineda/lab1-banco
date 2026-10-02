# Banco UdeA - Frontend (Lab 1 Arquitectura de Software)

Frontend en React (Vite + Axios) para el backend https://github.com/diegobotia/lab12026p

## Vistas
1. **Clientes**: consulta y creación de clientes.
2. **Transferir**: transferencia de dinero entre cuentas.
3. **Histórico**: tabla de transacciones por cliente.

## Ejecución
1. Levantar el backend (`./mvnw spring-boot:run`, puerto 8080, MySQL con la base `lab12026p`).
2. En esta carpeta: `npm install` y `npm run dev` (http://localhost:5173).

Vite redirige `/api` a `http://localhost:8080` (ver `vite.config.js`), por lo que no se requiere CORS en el backend.
