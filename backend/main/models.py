from django.db import models
import uuid
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin
# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Creates and saves a new user"""
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """Creates and saves a new super user"""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model that suppors using email instead of username"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=255, unique=True)
    is_customer=models.BooleanField()
    objects = UserManager()

    USERNAME_FIELD = 'email'

class FoodItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name=models.CharField(max_length=255)
    price=models.IntegerField(default=0)
    image=models.ImageField()

class UserDetail(models.Model):
    name=models.CharField(max_length=255)
    parent=models.ForeignKey(User,on_delete=models.CASCADE,related_name="details")
    phone_no=models.CharField(max_length=255)


class RestrauntDetail(models.Model):
    parent=models.ForeignKey(User,on_delete=models.CASCADE,related_name="details")
    name=models.CharField(max_length=255)
    Location=models.CharField(max_length=255)
    Address=models.CharField(max_length=1500)
    phone_no=models.CharField(max_length=255)
    image=models.ImageField()