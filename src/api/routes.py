from flask import Flask, request, jsonify, Blueprint
from api.models import db, Favorito, Blacklist, User
from api.utils import APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

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

# Parte de la Lista negra

@api.route('/blacklist', methods=['GET'])
def get_blacklists():
    blacklist = Favorito.query.all()
    return jsonify([blacklist.serialize() for blacklist in blacklist]), 200

@api.route('/blacklist/<int:blacklist_id>', methods=['GET'])
def get_blacklist(blacklist_id):
    blacklist = Blacklist.query.get(blacklist_id)
    if not blacklist:
        raise APIException('Black list not found', status_code=404)
    return jsonify(blacklist.serialize()), 200

@api.route('/blacklist', methods=['POST'])
def create_blacklist():
    data = request.get_json()
    if not data or not data.get('user_id') or not data.get('show_id'):
        raise APIException('User ID and Show ID are required', status_code=400)
    
    new_blacklist = Blacklist(user_id=data['user_id'], show_id=data['show_id'])
    db.session.add(new_blacklist)
    db.session.commit()
    return jsonify(new_blacklist.serialize()), 201

@api.route('/blacklist/<int:blacklist_id>', methods=['PUT'])
def update_blacklist(blacklist_id):
    blacklist = Blacklist.query.get(blacklist_id)
    if not blacklist:
        raise APIException('Black list not found', status_code=404)

    data = request.get_json()
    if 'user_id' in data:
        blacklist.user_id = data['user_id']
    if 'show_id' in data:
        blacklist.show_id = data['show_id']
    
    db.session.commit()
    return jsonify(blacklist.serialize()), 200

@api.route('/blacklist/<int:blacklist_id>', methods=['DELETE'])
def delete_blacklist(blacklist_id):
    blacklist = Blacklist.query.get(blacklist_id)
    if not blacklist:
        raise APIException('Black list not found', status_code=404)

    db.session.delete(blacklist)
    db.session.commit()
    return '', 204

@api.route('/users', methods=['POST'])
def add_user():
    request_data = request.get_json()
    if not request_data or 'email' not in request_data or 'password' not in request_data:
        raise APIException('Invalid request body', status_code=400)

    new_user = User(email=request_data['email'])
    new_user.set_password(request_data['password'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize())

@api.route('/login', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()

    if user is None or not user.check_password(password):
        return jsonify({"msg" : "Invalid email or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id})

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.filter.get(current_user_id)
    return jsonify({"id": user.id, "email": user.email}), 200