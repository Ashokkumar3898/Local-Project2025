Overview
The Hotel Management System (HMS) is a comprehensive full-stack application designed to streamline hospitality operations, including room bookings, guest management, and billing services. This project demonstrates a modern Microservices-ready architecture using a decoupled Frontend and Backend.

🛠 Tech Stack
Frontend
Framework: Angular 20.x (utilizing the latest Angular Signals for reactive state management).

Styling: Tailwind CSS for a responsive, utility-first UI.

Authentication: JWT (JSON Web Tokens) for secure, stateless session management.

Backend
Core: ASP.NET Core (C#) for high-performance RESTful APIs.

Database: SQL Server with Entity Framework Core (Code-First approach).

Security: Role-based Authorization (Admin, Staff, Guest).

🚀 Core Modules & Features
1. Secure Authentication & Authorization
Implemented a custom JWT-based Authentication system with refresh tokens to ensure secure user sessions.

Role-based access control (RBAC) to restrict sensitive administrative features.

2. Dynamic Room Booking Engine
A real-time availability checker that prevents double-booking using SQL Transactions on the backend.

Frontend state synchronization using Angular Signals to ensure the UI updates instantly when a room is selected.

3. Guest Management & Billing
Automated invoice generation upon checkout.

Comprehensive guest history logs for loyalty tracking.

4. Modern UI Components
Integrated sliding modal forms for a smooth user experience when adding or editing room details.

Fully responsive design optimized for desktop and tablet usage in hotel lobbies.

🏗 System Architecture
The application follows a clean N-Tier Architecture:

Presentation Layer: Angular Single Page Application (SPA).

API Layer: ASP.NET Core Web API with Middleware for logging and error handling.

Data Access Layer: Repository Pattern with Entity Framework Core.

Database: Structured SQL Server schema for data integrity.

💻 Getting Started
Prerequisites
Node.js v20.x or higher

.NET SDK 8.0/9.0

SQL Server Instance

Development Setup
Clone the repository:

Bash
git clone https://github.com/Ashokkumar3898/Local-Project2025.git
Start the Backend:
Navigate to the src/API folder and run dotnet run.

Start the Frontend:

Bash
ng serve
Access the app at http://localhost:4200/.

🧠 Technical Challenges Solved
Performance Optimization: Reduced bundle sizes by 30% by implementing Lazy Loading for feature modules.

State Management: Replaced complex RxJS logic with Angular Signals, leading to cleaner, more maintainable code.

Concurrency: Solved race conditions during peak booking times using database-level locking.
