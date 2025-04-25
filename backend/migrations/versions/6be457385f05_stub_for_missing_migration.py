"""stub for missing migration

Revision ID: 6be457385f05
Revises: ebd5f1b3915a
Create Date: 2025-04-19 20:32:48.785901

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6be457385f05'
down_revision: Union[str, None] = 'ebd5f1b3915a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
