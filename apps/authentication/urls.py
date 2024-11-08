from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from apps.authentication import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # Endpoint de autenticación
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
