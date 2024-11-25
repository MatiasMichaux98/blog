from rest_framework import serializers
from .models import Profile
from apps.authentication.serializers import UserSerializer

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id','image','full_name','bio','author']
    
    def to_representation(self, instance):
        response =  super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response