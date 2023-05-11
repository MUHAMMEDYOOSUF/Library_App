from .base_model import BaseModel
from utils.extensions import db


class Books(BaseModel):
    "books model"

    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    book_name = db.Column(db.String(50), nullable=False)
    author = db.Column(db.String(50), nullable=False)
    copies = db.Column(db.Integer, nullable=False)
    is_available = db.Column(db.Boolean, nullable=True, default=True)

    def __setattr__(self, name, value):
        if name == "copies":
            if value == 0:
                self.is_available = False
        super().__setattr__(name, value)
