from django.db import models
import uuid
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
    is_customer=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)
    objects = UserManager()

    USERNAME_FIELD = 'email'

class FoodItem(models.Model):
    parent=models.ForeignKey(User,on_delete=models.CASCADE,related_name="items")
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name=models.CharField(max_length=255,default="")
    price=models.IntegerField(default=0)
    category=models.CharField(max_length=25)
    image=models.ImageField()

    def parent_id(self):
        return str(self.parent.id)

class UserDetail(models.Model):
    parent=models.ForeignKey(User,on_delete=models.CASCADE,related_name="udetails")
    name=models.CharField(max_length=255,default="")
    phone_no=models.CharField(max_length=255,default="")


class RestrauntDetail(models.Model):
    parent=models.ForeignKey(User,on_delete=models.CASCADE,related_name="rdetails")
    name=models.CharField(max_length=255,default="")
    latitude=models.CharField(max_length=255,default="")
    longitude=models.CharField(max_length=255,default="")
    address=models.CharField(max_length=1500,default="")
    rating=models.IntegerField(default=0)
    image=models.ImageField(null=True)

class Order(models.Model):
    customer=models.ForeignKey(User,on_delete=models.CASCADE,related_name="placed_order")
    Restraunt=models.ForeignKey(User,on_delete=models.CASCADE,related_name="orders")
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created = models.DateTimeField(auto_now_add=True)
    is_active=models.BooleanField(default=True)
    status=models.CharField(max_length=10,default="placed")
    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return '%s' % (self.id)

    def total(self):
        total = 0
        for item in self.orderitems.all():
            total = total + int(item.total())
        return str(total)

class OrderItem(models.Model):
    order=models.ForeignKey(Order,on_delete=models.CASCADE,related_name="orderitems")
    desc = models.CharField(max_length=500, null=True)
    item = models.ForeignKey(FoodItem, on_delete=models.PROTECT, null=True)
    price = models.IntegerField(default=0)
    quantity = models.IntegerField(default=1, null=False)

    def total(self):
        total = self.price * self.quantity
        return str(total)