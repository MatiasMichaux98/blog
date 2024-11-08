from django.db import models
from apps.userProfile.models import Profile
from apps.authentication.models import User

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
    Profile = models.ForeignKey(Profile,on_delete=models.CASCADE, null=True, blank=True)
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
