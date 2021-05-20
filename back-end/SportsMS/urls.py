from django.urls import path
from .views import getPlayers, createPlayer, updatePlayer, deletePlayer

urlpatterns = [
    path('get/', getPlayers, name='GET PLAYERS'),
    path('create/', createPlayer, name='CREATE PLAYER'),
    path('update/<int:id>', updatePlayer, name='UPDATE PLAYER'),
    path('delete/<int:id>', deletePlayer, name='DELETE PLAYER'),
]