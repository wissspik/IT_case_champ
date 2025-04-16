from alembic import op
import sqlalchemy as sa


# Используем режим пакетной обработки для поддержки SQLite
def ff():
    with op.batch_alter_table("countries", schema=None) as batch_op:
        batch_op.alter_column('picture',
                                existing_type=sa.Text(),    # Предыдущий тип столбца
                                type_=sa.String(),          # Новый тип (VARCHAR)
                                existing_nullable=True)
