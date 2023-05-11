from .users import Users
from .books import Books
from .base_model import BaseModel
from .borrow import Borrow

ALL_MODELS = dict(books=Books, users=Users, base_model=BaseModel, borrow=Borrow)
