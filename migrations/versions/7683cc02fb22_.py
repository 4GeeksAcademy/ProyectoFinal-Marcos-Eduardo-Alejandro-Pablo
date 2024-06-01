"""empty message

Revision ID: 7683cc02fb22
Revises: 
Create Date: 2024-06-01 08:30:01.294491

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7683cc02fb22'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('blacklist')
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.String(length=128),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.String(length=128),
               type_=sa.VARCHAR(length=80),
               existing_nullable=False)

    op.create_table('blacklist',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('show_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='blacklist_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='blacklist_pkey')
    )
    # ### end Alembic commands ###