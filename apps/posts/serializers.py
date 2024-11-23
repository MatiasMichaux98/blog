from rest_framework import serializers
from .models import Category, Post
from apps.userProfile.serializers import ProfileSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model= Category
        fields = ['id','name']

class PostSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Post
        fields = ['id','title', 'description', 'category', 'tags', 'image']

class PostSerializers(serializers.ModelSerializer):
    profile = ProfileSerializer(source='Profile')

    class Meta:
        model = Post
        fields = ['id','title', 'description', 'category', 'tags', 'image','Profile']