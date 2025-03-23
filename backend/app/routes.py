from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import db, Product

main = Blueprint('main', __name__)

@main.route('/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'pong'})

@main.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([
        {
            'id': p.id,
            'name': p.name,
            'price': p.price,
            'description': p.description,
            'image_url': p.image_url,
            'category': p.category,
            'subcategory': p.subcategory
        } for p in products
    ])

@main.route('/products', methods=['POST'])
# @jwt_required()
def create_product():
    # current_user = get_jwt_identity()
    # if not current_user['is_admin']:
    #     return jsonify({'error': 'Unauthorized'}), 403

    data = request.get_json()
    product = Product(
        name=data['name'],
        price=data['price'],
        description=data.get('description'),
        image_url=data.get('image_url'),
        category=data.get('category'),
        subcategory=data.get('subcategory'),
    )
    db.session.add(product)
    db.session.commit()
    return jsonify({'message': 'Product created successfully', 'product_id': product.id})

@main.route('/products/bulk', methods=['POST'])
# @jwt_required(optional=True)
def bulk_upload_products():
    data = request.get_json()
    products = data.get('products', [])

    created_count = 0
    for p in products:
        product = Product(
            name=p.get('name'),
            price=p.get('price'),
            description=p.get('description'),
            image_url=p.get('image_url'),
            category=p.get('category'),
            subcategory=p.get('subcategory')
        )
        db.session.add(product)
        created_count += 1

    db.session.commit()
    return jsonify({'message': 'Bulk upload successful', 'created': created_count}), 201

