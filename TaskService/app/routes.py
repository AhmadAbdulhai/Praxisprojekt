from . import db
from flask import Blueprint, request, jsonify, make_response
from .models import Task
from .auth import token_required

bp = Blueprint('task', __name__, url_prefix='/task')

@bp.route('/create', methods=['POST'])
@token_required
def create_task(current_user):
    data = request.get_json()
    new_task = Task(user_id=current_user, title=data['title'], description=data['description'], status=data['status'])
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'message': 'Task created successfully'}), 201

@bp.route('/tasks/<int:task_id>', methods=['GET'])
@token_required
def get_task(current_user, task_id):
    task = Task.query.filter_by(id=task_id, user_id=current_user).first()
    if not task:
        return jsonify({'message': 'No task found'}), 404
    return jsonify({'title': task.title, 'description': task.description, 'status': task.status})

@bp.route('/tasks', methods=['GET'])
@token_required
def get_tasks(current_user):
    tasks = Task.query.filter_by(user_id=current_user).all()
    output = []
    for task in tasks:
        task_data = {
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'status': task.status
        }
        output.append(task_data)
    return jsonify({'tasks': output})


@bp.route('/tasks/<int:task_id>', methods=['PUT'])
@token_required
def update_task(current_user, task_id):
    task = Task.query.filter_by(id=task_id, user_id=current_user).first()
    if not task:
        return jsonify({'message': 'No task found'}), 404
    data = request.get_json()
    # Überprüfung, ob ein bestimmtes Feld in der Anfrage vorhanden ist und Aktualisierung des entsprechenden Feldes
    if 'title' in data:
        task.title = data['title']
    if 'description' in data:
        task.description = data['description']
    if 'status' in data:
        task.status = data['status']
    db.session.commit()
    return jsonify({'message': 'Task updated successfully'})

@bp.route('/tasks/<int:task_id>', methods=['DELETE'])
@token_required
def delete_task(current_user, task_id):
    task = Task.query.filter_by(id=task_id, user_id=current_user).first()
    if not task:
        return jsonify({'message': 'No task found'}), 404
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted successfully'})