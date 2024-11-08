from django.urls import path
from apps.userProfile import views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
      path('profile/<int:user_id>/', views.ProfileView.as_view(), name='user_profile'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
