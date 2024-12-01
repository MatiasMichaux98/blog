from django.urls import path
from apps.posts import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('create-post/', views.CreatePostView.as_view(), name='create-post'),
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('post/', views.PostListView.as_view(), name='post-list'),  # Corrige el nombre de la ruta
    path('post/<int:id>/', views.PostDetailView.as_view(), name='post-detail'),
    path('user/<int:user_id>/posts/', views.UserPostListView.as_view(), name='user-specific-posts'),
    path('category/<int:category_id>/', views.PostCategoryList.as_view(), name='posts_by_category'),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
