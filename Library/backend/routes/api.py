from flask import Blueprint, request
from importlib import import_module

business = import_module("business.logic")

api = Blueprint("api", __name__, url_prefix="/api/v1")


@api.route("/<table_name>", methods=["GET", "POST"])
def get_post(table_name):
    response = getattr(business, request.method.lower() + "_" + table_name, None)
    return response(table_name=table_name)


@api.route("/<table_name>/<id>", methods=["PUT", "PATCH", "GET"])
def get_update(table_name, id):
    response = getattr(business, request.method.lower() + "_" + table_name, None)
    return response(table_name=table_name, id=id)


@api.route("/search", methods=["GET", "POST"])
def get_search():
    response = getattr(business, request.method.lower() + "_" + "search", None)
    return response(table_name="books")
