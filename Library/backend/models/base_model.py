from utils.extensions import db


class BaseModel(db.Model):
    "base model"

    __abstract__ = True

    is_active = db.Column(db.Boolean, nullable=True, default=True)
    is_delete = db.Column(db.Boolean, nullable=True, default=False)
