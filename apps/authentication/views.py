from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
from django.db import IntegrityError
from rest_framework.response import Response
from rest_framework import status, generics


from apps.authentication import models as api_models
from apps.authentication import serializers as api_serializer
from rest_framework.permissions import AllowAny
# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(seld, request, *args, **kwargs):
        try:
            return super().post(request,*args,**kwargs)
        except IntegrityError as e:
            return Response({'Error': str(e)},
                           status=status.HTTP_400_BAD_REQUEST )

class RegisterView(generics.CreateAPIView):
    query = api_models.User.objects.all()
    permission_classes = (AllowAny, )
    serializer_class = api_serializer.RegisterSerializer