from django.shortcuts import render
from rest_framework import status , generics
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Post, Category
from apps.authentication.models import User
from .serializers import PostSerializer,PostSerializers,CategorySerializer
from rest_framework.exceptions import PermissionDenied

# Create your views here.
#crear Post
class CreatePostView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers
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


class PostCategoryList(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        category_id = self.kwargs.get('category_id')
        category = get_object_or_404(Category, id=category_id)
        return Post.objects.filter(category=category)
    
class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    def get_serializer_context(self):
        return {'request': self.request}
    

class UserPostListView(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        #obtener el ususario id por el user_id que viene en los parametros de la URL 
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(User, id=user_id)
        return Post.objects.filter(user=user)
        
class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'id'
    
    