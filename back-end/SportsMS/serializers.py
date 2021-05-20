from rest_framework import serializers
from .models import Player
from rest_framework.authtoken.models import Token

class PlayerSerializer(serializers.ModelSerializer) :
	class Meta :
		model = Player
		fields = '__all__'