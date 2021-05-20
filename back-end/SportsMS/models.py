from django.db import models

# Create your models here.

class Player(models.Model) :
	name = models.CharField(max_length=256)
	age = models.IntegerField()
	address = models.TextField()
	kitNumber = models.IntegerField()

	def __str__(self) :
		return self.name
