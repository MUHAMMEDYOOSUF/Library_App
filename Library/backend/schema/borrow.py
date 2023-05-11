from .base_model import BaseModel
from .books import Books
from marshmallow import fields


class Borrow(BaseModel):
    "user model"

    id = fields.Integer(required=False)
    users_id = fields.Int(
        required=True,
        allow_none=False,
    )
    user_name = fields.String(
        dump_only=True, required=False, attribute="users.username"
    )
    books_id = fields.Int(
        required=True,
        allow_none=False,
    )
    book_name = fields.String(
        dump_only=True, required=False, attribute="books.book_name"
    )
    borrow_date = fields.DateTime(dump_only=True)
    due_date = fields.DateTime(dump_only=True)
