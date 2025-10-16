```bash
  uv init DjangoAdmin
  uv add django django-extensions django-unfold uvicorn[standard] whitenoise --link-mode=copy
  cd DjangoAdmin
  uv run django-admin startproject Admin .
  uv run manage.py startapp library
  uv run manage.py createsuperuser
  uv run manage.py makemigrations
  uv run manage.py migrate
  uv run python manage.py collectstatic --noinput
  uv run uvicorn Admin.asgi:application --host 127.0.0.1 --port 8000
```
