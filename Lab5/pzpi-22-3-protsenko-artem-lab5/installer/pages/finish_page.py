import tkinter as tk
from tkinter import ttk


class FinishPage(tk.Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller

        ttk.Label(self, text="Встановлення успішно завершено!",
                  font=("Arial", 14)).pack(pady=60)

        exit_button = ttk.Button(
            self, text="Завершити", command=self.controller.quit)
        exit_button.pack()
