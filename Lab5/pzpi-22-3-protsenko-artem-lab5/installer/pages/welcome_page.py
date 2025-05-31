import tkinter as tk
from tkinter import ttk

class WelcomePage(tk.Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller

        label = ttk.Label(self, text="Ласкаво просимо до встановлення!", font=("Arial", 16))
        label.pack(pady=60)

        start_button = ttk.Button(self, text="Почати встановлення", command=self.start_installation)
        start_button.pack()

    def start_installation(self):
        self.controller.show_frame("InstallPage")
        self.controller.frames["InstallPage"].start()
