from flask import Flask
from importlib import import_module
from routes.api import api


def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    app.config["DEBUG"] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///library.db"
    __blueprint = import_module("routes.api")
    __extensions = import_module("utils.extensions")
    _cors = getattr(__extensions, "cors", None)
    _api = getattr(__blueprint, "api", None)
    _db = getattr(__extensions, "db", None)
    _migrate = getattr(__extensions, "migrate", None)
    _db.init_app(app)
    _migrate.init_app(app, _db)
    _cors.init_app(app)
    app.register_blueprint(_api)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=4000)

import models
