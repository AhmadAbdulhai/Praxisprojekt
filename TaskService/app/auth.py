from flask import request, jsonify, current_app
from functools import wraps
import jwt

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!', 'token_received': 'None'}), 403

        try:
            if 'Bearer ' in token:
                token = token.split(" ")[1]
            else:
                raise ValueError("Token format is incorrect. Expected 'Bearer <token>'.")
            
            # Dekodiert den Token. Stellen Sie sicher, dass der korrekte öffentliche Schlüssel und Algorithmus verwendet wird.
            data = jwt.decode(token, current_app.config['JWT_PUBLIC_KEY'], algorithms=["RS256"])
            current_user_id = data['sub']
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!', 'token_received': token}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token is invalid!', 'token_received': token}), 403
        except Exception as e:
            # Zurückgeben der Fehlermeldung und des empfangenen Tokens für detailliertere Rückmeldungen
            return jsonify({
                'message': 'Token could not be verified!',
                'error_details': str(e),
                'token_received': token
            }), 403

        return f(current_user_id, *args, **kwargs)
    
    return decorated
