"""Initial migration

Revision ID: ba8ebd48d93d
Revises: feaaaa5f3ff2
Create Date: 2025-04-16 16:51:53.511488

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ba8ebd48d93d'
down_revision: Union[str, None] = 'feaaaa5f3ff2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
