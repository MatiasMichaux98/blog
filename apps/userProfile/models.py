from django.db import models
from apps.authentication.models import User 
from django.dispatch import receiver
from django.db.models.signals import post_save
from PIL import Image
# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.FileField(upload_to="image",default="image/iconoPerfil.jpg",null=True, blank=True)
    full_name = models.CharField(max_length=100, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    author = models.BooleanField(default=False)
    country = models.CharField(max_length=100, null=True,blank=True)
    date= models.DateField(auto_now_add=True)#se establece automaticamente con la fecha y hora 

    def __str__(self) -> str:
        return self.user.username
    
    def save(self, *args, **kwargs):
        if not self.full_name:
            self.full_name = self.user.full_name
        
         #llamamos al metodo origina para guardar el archivo
        super().save(*args, **kwargs)
        #esto es para abrir la imagen
        img_path = self.image.path
        img = Image.open(img_path)

        #comprimimos la imagen ajustando la calidad 
        if img.mode in ("RGBA","P"):
            img = img.convert("RGB")
        
        img.save(img_path, quality=50, optimize=True)



    #señales para que al crear un usuario se cree el perfil automaticamente 
    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)
    
    @receiver(post_save , sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()


