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
    username = serializers.SerializerMethodField()
    date = serializers.DateTimeField(format='%d/%m/%Y')
    day = serializers.SerializerMethodField()
    month = serializers.SerializerMethodField()
    year = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ['id','title', 'description', 'category', 'tags', 'image','date','profile_image','username','day','month','year']

    def get_profile_image(self, obj):
        # Devuelve la URL de la imagen de perfil del usuario que creó el post
        profile = obj.user.profile  # `user` se relaciona con `Profile` mediante una señal
        if profile and profile.image:
            return profile.image.url
        return None 
    #obtener nombre
    def get_username(self, obj):
        return obj.user.username
    
    #obtener dia /mes/año por separado 
    def get_day(self, obj):
        return obj.date.strftime('%d')
    def get_month(self, obj):
        return obj.date.strftime('%b')
    def get_year(self, obj):
        return obj.date.strftime('%Y')
    
class PostSerializers(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id','title', 'description', 'category', 'tags', 'image','date']