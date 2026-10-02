# Lab 1 - Banco (Arquitectura de Software)

- `backend/`: API REST Spring Boot + MySQL (origen: https://github.com/diegobotia/lab12026p).
- `frontend/`: React (Vite + Axios) con 3 vistas: Clientes, Transferir, Histórico.

## Ejecutar en local
1. MySQL en el puerto 3306 (root/root). Crear la base: `CREATE DATABASE lab12026p;`
2. Backend: `cd backend && ./mvnw spring-boot:run` (http://localhost:8080)
3. Frontend: `cd frontend && npm install && npm run dev` (http://localhost:5173)

El frontend redirige `/api` al backend mediante el proxy de Vite.
