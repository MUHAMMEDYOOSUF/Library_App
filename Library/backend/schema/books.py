from .base_model import BaseModel
from marshmallow import fields, Schema


class Books(BaseModel):
    "user model"

    id = fields.Integer(required=False)
    book_name = fields.Str(
        required=True,
        allow_none=False,
    )
    author = fields.Str(
        required=True,
        allow_none=False,
    )
    copies = fields.Integer(required=False)
    is_available = fields.Boolean(required=False)
