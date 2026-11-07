"""Abstract class (ABC, @abstractmethod) dan pola interface."""
from abc import ABC, abstractmethod
import math


class Shape(ABC):
    @abstractmethod
    def luas(self): ...

    def info(self):
        return f"{type(self).__name__}: luas={self.luas():.2f}"


class Persegi(Shape):
    def __init__(self, s):
        self.s = s

    def luas(self):
        return self.s ** 2


class Lingkaran(Shape):
    def __init__(self, r):
        self.r = r

    def luas(self):
        return math.pi * self.r ** 2


class DatabaseConnector(ABC):  # interface
    @abstractmethod
    def connect(self): ...

    @abstractmethod
    def query(self, sql): ...


class SQLite(DatabaseConnector):
    def connect(self):
        return "terhubung ke SQLite"

    def query(self, sql):
        return f"SQLite menjalankan: {sql}"


for s in (Persegi(4), Lingkaran(3)):
    print(s.info())
try:
    Shape()
except TypeError as e:
    print("Error:", e)
db = SQLite()
print(db.connect(), "|", db.query("SELECT 1"))
