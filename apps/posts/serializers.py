from rest_framework import serializers
from .models import Category, Post
from apps.userProfile.serializers import ProfileSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model= Category
        fields = ['id','name']

class PostSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    profile_image = serializers.SerializerMethodField() 
    
    class Meta:
        model = Post
        fields = ['id','title', 'description', 'category', 'tags', 'image','profile_image']

    def get_profile_image(self, obj):
        # Devuelve la URL de la imagen de perfil del usuario que creó el post
        profile = obj.user.profile  # `user` se relaciona con `Profile` mediante una señal
        if profile and profile.image:
            return profile.image.url
        return None 

class PostSerializers(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['id','title', 'description', 'category', 'tags', 'image']