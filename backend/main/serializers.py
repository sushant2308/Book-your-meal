from django.db.models import fields
from rest_framework import serializers
from .models import FoodItem,Order,UserDetail,RestrauntDetail,OrderItem
from django.contrib.auth import get_user_model, authenticate


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model=FoodItem
        fields=('name','id','price','image')

class UseriSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserDetail
        fields=('name','phone_no')

class RestrauSerializer(serializers.ModelSerializer):
    class Meta:
        model=RestrauntDetail
        fields=('name','Location','Address','image')   


class OrderItemSerializer(serializers.Serializer):
    class Meta:
        model=OrderItem
        fields=('desc','item','price','quantity')

class OrderSerializer(serializers.Serializer):
    orderitems=OrderItemSerializer(many=True)
    class Meta:
        model:Order
        fields=('created','is_active','status','id','orderitems','total')

class UserSerializer(serializers.ModelSerializer):
    """Serializer for the users object"""
    id=serializers.ReadOnlyField()
    placed_orders=OrderItemSerializer(many=True)
    orders=OrderItemSerializer(many=True)
    class Meta:
        model = get_user_model()
        fields = ('email', 'password', 'id','is_customer','placed_orders','orders')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        """Update a user, setting the password correctly and return it"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


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
            msg = _('Unable to authenticate with provided credentials')
            raise serializers.ValidationError(msg, code='authentication')

        attrs['user'] = user
        return attrs



