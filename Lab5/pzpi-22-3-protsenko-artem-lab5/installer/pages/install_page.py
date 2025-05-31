import tkinter as tk
from tkinter import ttk, messagebox
import subprocess
import threading
import time
import os
from main import install_all

class InstallPage(tk.Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller

        self.label = ttk.Label(
            self, text="Встановлення залежностей...", font=("Arial", 14))
        self.label.pack(pady=30)

        self.progress = ttk.Progressbar(
            self, orient="horizontal", length=400, mode="determinate")
        self.progress.pack(pady=20)

    def start(self):
        threading.Thread(target=self.install).start()

    def install(self):
        try:
            self.update_progress(0)
            self.simulate_progress()
            self.run_installer()
            self.update_progress(100)
            self.controller.show_frame("InstallLocationPage")

        except Exception as e:
            messagebox.showerror("Помилка", str(e))

    def simulate_progress(self):
        for i in range(1, 51):
            time.sleep(0.03)
            self.update_progress(i)

    def run_installer(self):
        install_all()

    def update_progress(self, value):
        self.progress["value"] = value
        self.update_idletasks()
