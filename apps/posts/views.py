from django.shortcuts import render
from rest_framework import status , generics
from rest_framework.permissions import AllowAny ,IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Post, Category
from .serializers import PostSerializer,CategorySerializer
# Create your views here.
#crear Post
class CreatePostView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes =  (IsAuthenticated,)
    parser_classes = [MultiPartParser, FormParser]
    #multiparser para manejar archivos como imagenes etc 
    #form parser para manejar datos comunes de formulario titulo bio etc

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        print(self.request.data)
        serializer.save(user=user)

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'id'

