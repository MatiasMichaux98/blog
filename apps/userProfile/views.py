from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from .serializers import ProfileSerializer
from .models import Profile
from apps.authentication.models import User
# Create your views here.
class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = ProfileSerializer

    def get_object(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)
        profile = Profile.objects.get(user=user)
        return profile