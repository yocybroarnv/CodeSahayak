# -*- coding: utf-8 -*-
"""
Proxy to gurujii_api.py
This file ensures that Flask can be run via standard commands and fits the test imports.
"""
from gurujii_api import app, create_app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
