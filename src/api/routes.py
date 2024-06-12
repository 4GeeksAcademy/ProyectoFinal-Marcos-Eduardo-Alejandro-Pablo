from flask import Flask, request, jsonify, Blueprint, Response
from api.models import db, Favorito,  User
from api.utils import APIException
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_mail import Mail, Message
from datetime import datetime, timedelta
import jwt
import uuid
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)

# Allow CORS requests to this API

CORS(api, origins="*")
bcrypt = Bcrypt()
# Configuración de Flask-Mail
mail = Mail()
def configure_mail(app):
    app.config['MAIL_SERVER'] = 'smtp.office365.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False
    app.config['MAIL_USERNAME'] = 'cwspablo@outlook.com' #correo real y pass
    app.config['MAIL_PASSWORD'] = '4geeks4geeks'
    mail.init_app(app)

def generate_reset_token(email):
    # Payload con solo la información mínima necesaria
    payload = {
        'sub': email,  # Incluye solo el email como subject
        'exp': datetime.utcnow() + timedelta(minutes=10)  # Reduce la duración a 10 minutos para mayor seguridad
    }
    # Utiliza una clave secreta más corta
    secret_key = 'short_secret'
    return jwt.encode(payload, secret_key, algorithm='HS256')

# Decoding function remains the same
def decode_reset_token(token):
    try:
        payload = jwt.decode(token, 'short_secret', algorithms=['HS256'])
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

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
    if 'user_id' in data and data['user_id'] is not None:
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

@api.route('/users/<int:user_id>/favoritos', methods=['GET'])
def get_user_favoritos(user_id):
    user = User.query.get(user_id)
    if not user:
        raise APIException('User not found', status_code=404)
    favoritos = Favorito.query.filter_by(user_id=user_id).all()
    return jsonify([favorito.serialize() for favorito in favoritos]), 200

# Parte de la Lista negra

# @api.route('/blacklist', methods=['GET'])
# def get_blacklist():
#     blacklist = Blacklist.query.all()
#     return jsonify([blacklist.serialize() for blacklist in blacklist]), 200

# @api.route('/blacklist/<int:blacklist_id>', methods=['GET'])
# def get_blacklist2(blacklist_id):
#     blacklist = Blacklist.query.get(blacklist_id)
#     if not blacklist:
#         raise APIException('Black list not found', status_code=404)
#     return jsonify(blacklist.serialize()), 200

# @api.route('/blacklist', methods=['POST'])
# def create_blacklist():
#     data = request.get_json()
#     if not data or not data.get('user_id') or not data.get('show_id'):
#         raise APIException('User ID and Show ID are required', status_code=400)
    
#     new_blacklist = Blacklist(user_id=data['user_id'], show_id=data['show_id'])
#     db.session.add(new_blacklist)
#     db.session.commit()
#     return jsonify(new_blacklist.serialize()), 201

# @api.route('/blacklist/<int:blacklist_id>', methods=['PUT'])
# def update_blacklist(blacklist_id):
#     blacklist = Blacklist.query.get(blacklist_id)
#     if not blacklist:
#         raise APIException('Black list not found', status_code=404)

#     data = request.get_json()
#     if 'user_id' in data:
#         blacklist.user_id = data['user_id']
#     if 'show_id' in data:
#         blacklist.show_id = data['show_id']
    
#     db.session.commit()
#     return jsonify(blacklist.serialize()), 200

# @api.route('/blacklist/<int:blacklist_id>', methods=['DELETE'])
# def delete_blacklist(blacklist_id):
#     blacklist = Blacklist.query.get(blacklist_id)
#     if not blacklist:
#         raise APIException('Black list not found', status_code=404)

#     db.session.delete(blacklist)
#     db.session.commit()
#     return '', 204

@api.route('/users', methods=['POST'])
def add_user():
    request_data = request.get_json()
    if not request_data or 'email' not in request_data or 'password' not in request_data:
        raise APIException('Invalid request body', status_code=400)
    
    user_uuid = str(uuid.uuid4())
    password= request_data.get('password')
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=request_data['email'], password=hashed_password, user_uuid=user_uuid)

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize())

@api.route('/users', methods=['GET'])
@cross_origin(origin='*')
def handle_users():
    users = User.query.all()
    all_users = list(map(lambda x: x.serialize(), users))
    return jsonify(all_users), 200

@api.route('/login', methods=['OPTIONS'])
@cross_origin(origin='*')
def options():
    response = Response()
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    return response

@api.route('/login', methods=['POST', 'OPTIONS'])
@cross_origin(origin='*')
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()

    if user is None or not user.check_password(password):
        return jsonify({"msg" : "Invalid email or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id})

@api.route('/protected', methods=['GET'])
@cross_origin(origin='*')
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.filter.get(current_user_id)
    return jsonify({"id": user.id, "email": user.email}), 200

@api.route('/users/<int:user_id>', methods=['DELETE'])
@cross_origin(origin='*')
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        raise APIException('User not found', status_code=404)

    db.session.delete(user)
    db.session.commit()
    return '', 204

@api.route('/users/<int:user_id>', methods=['GET'])
@cross_origin(origin='*')
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        raise APIException('User not found', status_code=404)
    return jsonify(user.serialize()), 200

# Ruta para solicitar la recuperación de contraseña
@api.route('/forgot-password', methods=['POST'])
def forgot_password():
    email = request.json.get('email')
    user = User.query.filter_by(email=email).first()
    
    if user:
        user_uuid = user.user_uuid
        reset_link = f"http://127.0.0.1:3000/resetpassword/{user_uuid}"
        print(user_uuid, reset_link)
        msg = Message("Password Reset Request",
                      sender="cwspablo@outlook.com",  # Cambiar por tu correo
                      recipients=[email])
        msg.body = f"To reset your password, visit the following link: {reset_link}"
        mail.send(msg)
        
        return jsonify({"msg": "Password reset link sent"}), 200
    
    return jsonify({"msg": "Email not found"}), 404

@api.route('/reset-password', methods=['PUT'])
def recovery_password():
    data = request.get_json(force=True)
    try:
        user_uuid = data.get('user_uuid') 
        new_password = data.get('password')
        user = User.query.filter_by(user_uuid=user_uuid).first()
        hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        print (data, "dataa")
        print(user)
        print(user_uuid, "user_uuid")
        print(new_password)
        if user:
            user.password = hashed_password
            db.session.commit()
            return jsonify({"message": "Usuario confirmado exitosamente"}), 200
        else:
            return jsonify({"error": "Usuario no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": f"Error al confirmar el usuario: {str(e)}"}), 500