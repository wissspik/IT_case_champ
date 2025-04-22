"""Initial migration

Revision ID: 25360a5a9881
Revises: a5762c5ddb26
Create Date: 2025-04-16 16:44:16.473237

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '25360a5a9881'
down_revision: Union[str, None] = 'a5762c5ddb26'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
