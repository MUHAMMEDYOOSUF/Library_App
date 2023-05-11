from marshmallow import fields, Schema


class BaseModel(Schema):
    "base schema"

    is_active = fields.Boolean(required=False)
    is_delete = fields.Boolean(required=False)
