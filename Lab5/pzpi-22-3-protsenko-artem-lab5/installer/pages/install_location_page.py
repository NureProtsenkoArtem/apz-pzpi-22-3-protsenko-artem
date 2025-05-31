import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import zipfile
import os
import sys


if getattr(sys, 'frozen', False):
    BASE_DIR = sys._MEIPASS
else:
    BASE_DIR = os.path.dirname(__file__)

ZIP_FILE = os.path.join(BASE_DIR, "PetHouseSystem.zip")


class InstallLocationPage(tk.Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller

        self.install_path = tk.StringVar()

        ttk.Label(self, text="Виберіть шлях для встановлення:",
                  font=("Arial", 12)).pack(pady=20)

        path_frame = ttk.Frame(self)
        path_frame.pack(pady=10)
        ttk.Entry(path_frame, textvariable=self.install_path,
                  width=40).pack(side="left")
        ttk.Button(path_frame, text="Обрати",
                   command=self.choose_install_path).pack(side="left", padx=5)

        self.progress = ttk.Progressbar(
            self, orient="horizontal", length=400, mode="determinate")
        self.progress.pack(pady=10)

        self.install_button = ttk.Button(
            self, text="Розпакувати та завершити", command=self.extract_files)
        self.install_button.pack(pady=30)

    def choose_install_path(self):
        path = filedialog.askdirectory()
        if path:
            self.install_path.set(path)

    def extract_files(self):
        try:
            target_dir = self.install_path.get()

            if not target_dir:
                messagebox.showwarning(
                    "Попередження", "Будь ласка, виберіть шлях для встановлення.")
                return

            with zipfile.ZipFile(ZIP_FILE, 'r') as zip_ref:
                files = zip_ref.namelist()
                total_files = len(files)

                self.progress["value"] = 0
                self.progress["maximum"] = total_files
                self.update_idletasks()

                for i, file in enumerate(files, start=1):
                    zip_ref.extract(file, target_dir)
                    self.progress["value"] = i
                    self.update_idletasks()

            self.create_run_bat(target_dir)

            self.controller.show_frame("FinishPage")
        except Exception as e:
            messagebox.showerror("Помилка", str(e))

    def create_run_bat(self, path):
        desktop = os.path.join(os.path.join(
            os.environ['USERPROFILE']), 'Desktop')

        bat_path = os.path.join(desktop, "pethouse runner.bat")

        with open(bat_path, "w", encoding="utf-8") as bat_file:
            bat_file.write(f"""@echo off
cd /d "{path}\\PetHouseSystem"
task run_app
pause
""")
