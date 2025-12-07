"""Add service_id to appointments

Revision ID: e1f2a3b4c5d6
Revises: bc9c4e6fbf48
Create Date: 2025-12-07 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e1f2a3b4c5d6'
down_revision: Union[str, Sequence[str], None] = 'bc9c4e6fbf48'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Add service_id column to appointments table
    op.add_column('appointments', sa.Column('service_id', sa.Integer(), nullable=True))
    op.create_foreign_key(
        'fk_appointments_service_id_services',
        'appointments', 'services',
        ['service_id'], ['id'],
        ondelete='CASCADE'
    )
    
    # Update existing appointments to have a default service_id (assuming service with id=1 exists)
    op.execute('UPDATE appointments SET service_id = 1 WHERE service_id IS NULL')
    
    # Make service_id non-nullable after setting default values
    op.alter_column('appointments', 'service_id', nullable=False)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint('fk_appointments_service_id_services', 'appointments', type_='foreignkey')
    op.drop_column('appointments', 'service_id')
