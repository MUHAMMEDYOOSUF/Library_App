from .base_model import BaseModel
from marshmallow import fields


class Users(BaseModel):
    "user model"

    id = fields.Integer(required=False)
    username = fields.Str(
        required=True,
        allow_none=False,
    )
    password = fields.Str(
        required=True,
        allow_none=False,
    )
    users_borrow = fields.List(fields.Nested("Borrow", dump_only=True))
