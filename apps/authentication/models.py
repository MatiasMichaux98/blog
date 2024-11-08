from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class User(AbstractUser):
    username = models.CharField(unique=True, max_length=100)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=100, null=True, blank=True)
    otp = models.CharField(max_length=100, null=True, blank=True)

    USERNAME_FIELD = 'email'# establece que el campo principal para la autenticación es el email
    REQUIRED_FIELDS= ['username'] #campo adicional que se requiere para crear un usuario con createsuperuser 

    def __str__(self):
        return self.email
    
    def save(self, *args, **kwars):
        email_username = self.email.split("@")
        if not self.full_name:
            self.full_name = email_username
        if not self.username:
            self.username = email_username
        
        super(User, self).save(*args,**kwars)

