from .base_model import BaseModel
from utils.extensions import db
from sqlalchemy.sql import func
from datetime import datetime, timedelta


class Borrow(BaseModel):
    "user model"

    __tablename__ = "borrow"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    users_id = db.Column(
        db.Integer,
        db.ForeignKey(
            "users.id",
        ),
        nullable=True,
    )
    books_id = db.Column(
        db.Integer,
        db.ForeignKey(
            "books.id",
        ),
        nullable=True,
    )
    users = db.relationship(
        "Users",
        foreign_keys=[
            users_id,
        ],
        backref=db.backref("users_borrow", lazy="dynamic"),
    )
    books = db.relationship(
        "Books",
        foreign_keys=[
            books_id,
        ],
        backref=db.backref("books_borrow", lazy="dynamic"),
    )
    borrow_date = db.Column(db.DateTime(timezone=True), default=func.now())
    due_date = db.Column(db.DateTime(timezone=True))

    def set_due_date(self):
        self.due_date = self.borrow_date + timedelta(weeks=2)
