import os
from installer import check_and_install_postgresql, check_and_install_dotnet, check_and_install_chocolatey, check_and_install_task
from db_setup import setup_database
from server_runner import run_server
from config_updater import update_appsettings
from encrypt_utils import encrypt_file, decrypt_file
from dotenv import load_dotenv
import getpass

#Finds the most recent backup file in a specified directory.
def find_latest_backup(directory, extension=".sql"):
    """
    Finds the most recent backup file in the specified directory.

    Args:
        directory (str): Path to the directory containing backup files.
        extension (str): File extension to filter by (default is ".sql").

    Returns:
        str: Path to the most recent backup file, or None if no file is found.
    """
    try:
        files = [f for f in os.listdir(directory) if f.endswith(extension)]
        if not files:
            return None
        files.sort(key=lambda x: os.path.getmtime(os.path.join(directory, x)), reverse=True)
        return os.path.join(directory, files[0])
    except Exception as e:
        print(f"Error while finding backup files: {e}")
        return None
    
# Main function to deploy the server.
def install_all():
    """Main function to deploy the server."""
    print("Checking prerequisites...")

    load_dotenv()
    encryption_key = os.getenv("ENCRYPTION_KEY")

    if not encryption_key:
        print("Encryption key not found in .env file. Exiting.")
        return

    encryption_key = encryption_key.encode()

    check_and_install_chocolatey()
    check_and_install_postgresql()
    check_and_install_dotnet()
    check_and_install_task()

    print("Server deployment completed successfully!")

if __name__ == "__main__":
    install_all()
