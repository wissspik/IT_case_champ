from sqlalchemy.types import TypeDecorator, TEXT
import json
class JSONText(TypeDecorator):
    impl = TEXT

    def process_bind_param(self, value, dialect):
        # Сериализуем в JSON с ensure_ascii=False, чтобы не эскейпить кириллицу
        return json.dumps(value, ensure_ascii=False)
    def process_result_value(self, value, dialect):
        if value is None:
            return None
        return json.loads(value)