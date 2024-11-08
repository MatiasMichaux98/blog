from django.urls import path
from apps.posts import views


urlpatterns = [
     path('create-post/', views.CreatePostView.as_view(), name='create-post'),
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('post/', views.PostListView.as_view(), name='post-list'),  # Corrige el nombre de la ruta
    path('post/<int:id>/', views.PostDetailView.as_view(), name='post-detail'),

]