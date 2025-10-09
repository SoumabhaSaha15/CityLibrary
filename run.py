import subprocess
import sys


def prod():
    """Runs the waitress server."""
    try:
        subprocess.run(
            [
                "waitress-serve",
                "--host",
                "127.0.0.1",
                "--port",
                "8000",
                "CityLibrary.wsgi:application",
            ],
            check=True,
        )
    except KeyboardInterrupt:
        print("Production server stopped.")
        sys.exit(0)


def dev():
    """Runs the Django development server."""
    try:
        subprocess.run([sys.executable, "manage.py", "runserver"], check=True)
    except KeyboardInterrupt:
        print("Development server stopped.")
        sys.exit(0)


def main():
    if len(sys.argv) < 2:
        print("Usage: run <command>")
        print("Available commands: prod, dev")
        sys.exit(1)

    command = sys.argv[1]
    if command == "prod":
        prod()
    elif command == "dev":
        dev()
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)


if __name__ == "__main__":
    main()
