from django.db import models
from apps.userProfile.models import Profile
from apps.authentication.models import User
from PIL import Image
# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    

class Post(models.Model):
    STATUS = {
        ("Active","Active"),
        ("Draft","Draft"),
        ("Disabled","Disabled"),
    }
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile,on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to="image",null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    tags = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=100, choices=STATUS, default="Active")
    view = models.IntegerField(default=0)
    likes = models.ManyToManyField(User, blank=True, related_name="like_user")
    slug = models.SlugField(unique=True, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        #llamamos al metodo origina para guardar el archivo
        super().save(*args, **kwargs)

        #esto es para abrir la imagen
        img_path = self.image.path
        img = Image.open(img_path)

        #comprimimos la imagen ajustando la calidad 
        if img.mode in ("RGBA","P"):
            img = img.convert("RGB")
        
        img.save(img_path, quality=50, optimize=True)
