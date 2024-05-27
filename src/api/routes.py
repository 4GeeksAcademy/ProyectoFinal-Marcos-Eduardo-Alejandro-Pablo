from flask import Flask, request, jsonify, Blueprint
from api.models import db, Favorito
from api.utils import APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/favoritos', methods=['GET'])
def get_favoritos():
    favoritos = Favorito.query.all()
    return jsonify([favorito.serialize() for favorito in favoritos]), 200

@api.route('/favoritos/<int:favorito_id>', methods=['GET'])
def get_favorito(favorito_id):
    favorito = Favorito.query.get(favorito_id)
    if not favorito:
        raise APIException('Favorito not found', status_code=404)
    return jsonify(favorito.serialize()), 200

@api.route('/favoritos', methods=['POST'])
def create_favorito():
    data = request.get_json()
    if not data or not data.get('user_id') or not data.get('show_id'):
        raise APIException('User ID and Show ID are required', status_code=400)
    
    new_favorito = Favorito(user_id=data['user_id'], show_id=data['show_id'])
    db.session.add(new_favorito)
    db.session.commit()
    return jsonify(new_favorito.serialize()), 201

@api.route('/favoritos/<int:favorito_id>', methods=['PUT'])
def update_favorito(favorito_id):
    favorito = Favorito.query.get(favorito_id)
    if not favorito:
        raise APIException('Favorito not found', status_code=404)

    data = request.get_json()
    if 'user_id' in data:
        favorito.user_id = data['user_id']
    if 'show_id' in data:
        favorito.show_id = data['show_id']
    
    db.session.commit()
    return jsonify(favorito.serialize()), 200

@api.route('/favoritos/<int:favorito_id>', methods=['DELETE'])
def delete_favorito(favorito_id):
    favorito = Favorito.query.get(favorito_id)
    if not favorito:
        raise APIException('Favorito not found', status_code=404)

    db.session.delete(favorito)
    db.session.commit()
    return '', 204
