from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from .models import Player
from .serializers import PlayerSerializer

from asgiref.sync import sync_to_async

@sync_to_async
@api_view(['GET'])
@permission_classes([AllowAny])
def getPlayers(request) :
	players = Player.objects.all()
	serializer = PlayerSerializer(players, many=True)
	return Response({'success':True, 'data':serializer.data})

@sync_to_async
@api_view(['POST'])
@permission_classes([AllowAny])
def createPlayer(request) :
	serializer = PlayerSerializer(data=request.data)
	if serializer.is_valid() :
		serializer.save()
	else :
		return Response({'success':False})
	return Response({'success':True,'data':serializer.data})

@sync_to_async
@api_view(['PUT'])
@permission_classes([AllowAny])
def updatePlayer(request, id) :
	try :
		player = Player.objects.get(id=id)
	except :
		print('Failed to fetch')
		return Response({'success':False})
	serializer = PlayerSerializer(instance=player, data=request.data)
	if serializer.is_valid() :
		serializer.save()
	else :
		print('Failed to save')
		return Response({'success':False})
	return Response({'success':True, 'data':serializer.data})

@sync_to_async
@api_view(['DELETE'])
@permission_classes([AllowAny])
def deletePlayer(request, id) :
	try :
		player = Player.objects.get(id=id)
	except :
		return Response({'success':False})
	player.delete()
	return Response({'success':True})
	

