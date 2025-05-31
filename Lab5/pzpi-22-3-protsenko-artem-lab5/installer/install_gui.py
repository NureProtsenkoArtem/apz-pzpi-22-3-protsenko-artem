import tkinter as tk
from pages.welcome_page import WelcomePage
from pages.install_page import InstallPage
from pages.install_location_page import InstallLocationPage
from pages.finish_page import FinishPage


class InstallerApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Встановлення програми")
        self.geometry("500x300")
        self.resizable(False, False)
        self.frames = {}

        for F in (WelcomePage, InstallPage, InstallLocationPage, FinishPage):
            page_name = F.__name__
            frame = F(parent=self, controller=self)
            self.frames[page_name] = frame
            frame.place(relwidth=1, relheight=1)
        self.show_frame("WelcomePage")

    def show_frame(self, page_name):
        frame = self.frames[page_name]
        frame.tkraise()


if __name__ == "__main__":
    app = InstallerApp()
    app.mainloop()
