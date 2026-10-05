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
