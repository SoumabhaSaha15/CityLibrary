### ⚙️ Backend Ecosystem (Django)

|                                                                   Icon                                                                   | Link                                                           | Description                                                                     |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------- | :------------------------------------------------------------------------------ |
|            <img src="https://static.djangoproject.com/img/icon-touch.e4872c4da341.png" width="32" height="32" alt="Django" />            | [Django](https://www.djangoproject.com)                        | High-level Python web framework encouraging rapid development and clean design. |
|       <img src="https://www.django-rest-framework.org/theme/img/favicon.ico" width="32" height="32" alt="Django REST Framework" />       | [Django REST Framework](https://www.django-rest-framework.org) | Powerful toolkit for building web APIs on top of Django.                        |
|                       <img src="https://unfoldadmin.com/favicon.ico" width="32" height="32" alt="Unfold Admin" />                        | [Django Unfold](https://unfoldadmin.com)                       | Modern, clean theme for the Django Admin interface built with Tailwind CSS.     |
|                     <img src="https://sqlite.org/images/sqlite370_banner.svg" width="80" height="32" alt="SQLite" />                     | [SQLite](https://sqlite.org)                                   | Lightweight, serverless, self-contained SQL database engine.                    |
| <img src="https://cloudinary.com/wp-content/uploads/sites/6/2020/09/favicon-32x32-1.png?w=32" width="32" height="32" alt="Cloudinary" /> | [Cloudinary](https://cloudinary.com)                           | Cloud-based service for managing, optimizing, and delivering images and videos. |
|                      <img src="https://docs.astral.sh/uv/assets/logo-letter.svg" width="32" height="32" alt="uv" />                      | [uv](https://docs.astral.sh/uv)                                | Extremely fast Python package and project manager written in Rust.              |

### 📷 Previews

<!-- Admin Panel Overview -->
<details>
  <summary>View Admin Panel Overview</summary>
  <img src="./../images/admin-panel.png" alt="Admin Panel Overview">
</details>

<!-- Author Details -->
<details>
  <summary>View Author Details</summary>
  <img src="./../images/admin-panel-author-details.png" alt="Author Details">
</details>

<!-- Author List -->
<details>
  <summary>View Author List</summary>
  <img src="./../images/admin-panel-author-list.png" alt="Author List">
</details>

<!-- Book Details -->
<details>
  <summary>View Book Details</summary>
  <img src="./../images/admin-panel-book-details.png" alt="Book Details">
</details>

<!-- Book List -->
<details>
  <summary>View Book List</summary>
  <img src="./../images/admin-panel-book-list.png" alt="Book List">
</details>

<!-- Borrow List -->
<details>
  <summary>View Borrow List</summary>
  <img src="./../images/admin-panel-borrow-list.png" alt="Borrow List">
</details>

<!-- User Profile -->
<details>
  <summary>View User Profile</summary>
  <img src="./../images/admin-panel-user-profile.png" alt="User Profile">
</details>

### ⭐ Useful commands for uv

```bash
  uv init DjangoAdmin
  uv sync --link-mode=copy
  uv add <pkg-name> --link-mode=copy
  cd DjangoAdmin
  uv run django-admin startproject Admin .
  uv run manage.py startapp library
  uv run manage.py createsuperuser
  uv run manage.py makemigrations
  uv run manage.py migrate
  uv run manage.py collectstatic --noinput
  uv run manage.py runserver
  uv run uvicorn Admin.asgi:application --host 127.0.0.1 --port 8000
```

### 📊 Useful graph_viz commands

```bash
  ./manage.py graph_models library --app-style graph_viz.json -o er-diagram.svg
  # for all apps
  ./manage.py graph_models -a --app-style graph_viz.json -o er-diagram.svg
```
