from utils.extensions import db
from flask import request
from models import ALL_MODELS
from schema import ALL_SCHEMA


def get_model_schema(table_name=None):
    model = ALL_MODELS.get(table_name, None)
    schema = ALL_SCHEMA.get(table_name, None)
    return model, schema


def get_books(table_name=None):
    model, schema = get_model_schema(table_name=table_name)
    data = model.query.all()
    return schema(many=True).dump(data)


def get_search(table_name=None):
    model, schema = get_model_schema(table_name=table_name)
    search_arg = request.args
    if search_arg:
        search_value = dict(search_arg)["search_value"]
        obj = model.query.filter(model.book_name.ilike(f"%{search_value}%")).all()
        if obj:
            return schema(many=True).dump(obj)


def post_books(table_name=None):
    request_body = request.get_json()
    model, schema = get_model_schema(table_name=table_name)
    data = model(**request_body)
    db.session.add(data)
    db.session.commit()
    return schema().dump(data)


def get_users(table_name=None, id=None):
    model, schema = get_model_schema(table_name=table_name)
    if id:
        data = model.query.get(id)
        return schema().dump(data)
    data = model.query.all()
    return schema(many=True).dump(data)


def post_users(table_name=None):
    request_body = request.get_json()
    user_model, user_schema = get_model_schema(table_name=table_name)
    data = user_model(**request_body)
    db.session.add(data)
    db.session.commit()
    return user_schema().dump(data)


def patch_users(table_name=None, id=None):
    request_body = request.get_json()
    books = request_body.pop("books", None)
    user_model, user_schema = get_model_schema(table_name=table_name)
    data_obj = user_model.query.get(id)
    for column, value in request_body.items():
        setattr(data_obj, column, value)
    if books:
        borrow_model, borrow_schema = get_model_schema(table_name="borrow")
        books_model, books_schema = get_model_schema(table_name="books")
        books_instance = books_model.query.get(books[0])
        request_data = dict(users_id=data_obj.id, books_id=books[0])
        borrow_data = borrow_model(**request_data)
        db.session.add(borrow_data)
        db.session.commit()
        borrow_data.set_due_date()
        books_instance.copies -= 1
        db.session.commit()
    db.session.add(data_obj)
    db.session.commit()
    return user_schema().dump(data_obj)
