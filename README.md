<div align="center">
  <img src="./ViteServer/public/logo.svg" alt="CityLibrary Logo" width="120" height="120" />
  
  # 📚 CityLibrary
  
  **A Sleek, Modern Digital Library Management System**
  
  <p align="center">
    <a href="#-overview">Overview</a> •
    <a href="#-core-features">Features</a> •
    <a href="#-frontend-ecosystem">Frontend</a> •
    <a href="#-backend-ecosystem">Backend</a>
  </p>
</div>

---

### 🌟 Overview

**CityLibrary** is a high-performance, full-stack application designed to make digital cataloging, author indexing, and book borrowing an effortless and immersive experience.

Built with a headless architectural philosophy, the platform separates robust server-side business logic and validation from a lightning-fast, state-synchronized single-page frontend.

---

### 🚀 Core Features

- 📖 **Advanced Cataloging:** Filter books dynamically by specific ranges, sub-string matching, matching fields, and cross-relational metadata models.
- ✍️ **Comprehensive Author Indexing:** Clean, dedicated views showcasing author nationalities, profiles, and historical publications.
- 🎫 **Fluid Borrowing Workflows:** Seamless routing mechanics to manage rental forms without losing interface context.
- 🎨 **Adaptive Theming:** Zero-flash theme initialization supporting custom visual configurations out of the box.

---

### 🎨 Frontend Ecosystem (React)

The frontend is a fully type-safe, optimized single-page application powered by **Vite** and **React 19**. It leverages the modern **TanStack** suite for structural state-machine predictability:

<table>
  <tr>
    <td><strong>Routing & Layouts</strong></td>
    <td><code>@tanstack/react-router</code> & <code>@tanstack/router-plugin</code><br>Enforces compile-time type-safe navigation and sequential, structure-driven layout nesting.</td>
  </tr>
  <tr>
    <td><strong>Server State Cache</strong></td>
    <td><code>@tanstack/react-query</code> & <code>@tanstack/react-query-persist-client</code><br>Handles zero-latency cache persistence, data pre-fetching, and declarative global query states.</td>
  </tr>
  <tr>
    <td><strong>Client State</strong></td>
    <td><code>@tanstack/react-store</code><br>A lightweight, framework-agnostic global store managing system preferences dynamically.</td>
  </tr>
  <tr>
    <td><strong>UX Primtives</strong></td>
    <td><code>@zag-js/react</code><br>State-machine driven, accessible building blocks powering components like toasts and pagination.</td>
  </tr>
  <tr>
    <td><strong>Forms & Verification</strong></td>
    <td><code>react-hook-form</code> & <code>zod</code><br>Validates complex client-side interactions safely before database communication.</td>
  </tr>
  <tr>
    <td><strong>Interface Styling</strong></td>
    <td><code>tailwindcss</code> & <code>daisyui</code><br>A utility-first visual toolkit supplying beautiful semantic design tokens for automated dark/light themes.</td>
  </tr>
  <tr>
    <td><strong>Accessibility Tools</strong></td>
    <td><code>@tanstack/react-hotkeys</code><br>Injects global and scope-bound keyboard shortcuts that automatically unregister on page unmount.</td>
  </tr>
</table>

---

### ⚙️ Backend Ecosystem (Django)

The backend is engineered as a secure, distributed data provider using **Django** partitioned across clear configuration boundaries:

<table>
  <tr>
    <td><strong>API Layer</strong></td>
    <td><code>djangorestframework</code><br>Builds the type-safe REST endpoint layout consumed by the React app.</td>
  </tr>
  <tr>
    <td><strong>Relational Filtering</strong></td>
    <td><code>django-filter</code><br>Enables deep double-underscore model queries spanning many-to-many lookup bounds (e.g., partial genre name queries).</td>
  </tr>
  <tr>
    <td><strong>Environment Security</strong></td>
    <td><code>django-environ</code><br>Isolates sensitive production runtime values securely away from repository source trees.</td>
  </tr>
  <tr>
    <td><strong>Media Handling</strong></td>
    <td><code>cloudinary</code><br>Handles automated cloud asset optimization and content delivery network pipelines for high-resolution book jackets and profiles.</td>
  </tr>
</table>

---

<div align="center">
  <sub>CityLibrary Architecture • Maintained by <a href="https://github.com/soumabhasaha15">soumabhasaha15</a></sub>
</div>
