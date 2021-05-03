from django.db import models
from django.db.models import fields
from rest_framework import serializers
from rest_framework.fields import ReadOnlyField
from .models import FoodItem,Order, User,UserDetail,RestrauntDetail,OrderItem
from django.contrib.auth import get_user_model, authenticate


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model=FoodItem
        fields=('name','id','price','image','category','parent_id')

class UseriSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserDetail
        fields=('name','phone_no')
 
class RestrauSerializer(serializers.ModelSerializer):
    class Meta:
        model=RestrauntDetail
        fields=('name','latitude','longitude','address','image')   


class OrderItemSerializer(serializers.ModelSerializer):
    item=FoodSerializer(read_only=True)
    class Meta:
        model=OrderItem
        fields=('desc','price','quantity','item',)

class OrderSerializer(serializers.ModelSerializer):
    orderitems=OrderItemSerializer(many=True,read_only=True)
    class Meta:
        model=Order
        fields=('created','is_active','status','id','orderitems','total',)


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the users object"""
    id=serializers.ReadOnlyField()
    udetails=UseriSerializer(many=True,read_only=True)
    rdetails=RestrauSerializer(many=True,read_only=True)
    items=FoodSerializer(many=True,read_only=True)
    class Meta:
        model = User
        fields = ('email', 'password', 'id','is_customer','udetails','rdetails','items',)
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}


class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user authentication object"""
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        if not user:
            msg = ('Unable to authenticate with provided credentials')
            raise serializers.ValidationError(msg, code='authentication')

        attrs['user'] = user
        return attrs



