from rest_framework import generics, authentication, permissions, serializers,status
from rest_framework import response
from rest_framework.authtoken.views import ObtainAuthToken
from django.shortcuts import redirect, render,get_object_or_404
from rest_framework.settings import api_settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSerializer,AuthTokenSerializer,FoodSerializer,OrderItemSerializer,OrderSerializer,RestrauSerializer,UseriSerializer
from .models import FoodItem,Order,OrderItem, User,UserDetail,RestrauntDetail

class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = UserSerializer


class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for user"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retrieve and return authentication user"""
        return self.request.user

@api_view(['GET', 'POST','DELETE'])
def fooditem(request,slug):
    if(request.METHOD=='GET'):
        user=User.objects.get(id=slug)
        food_items=FoodItem.objects.filter(parent=user)
        serializer=FoodSerializer(food_items,many=True)

        return Response(serializer.data)

    if(request.METHOD=='POST'):
        serializer=FoodItem(data=request.data)
        if serializer.is_valid():
            serializer.save(parent=request.user)
            return Response(serializer.data,status=status.HTTP_201_CREATED)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    if(request.METHOD=='DELETE'):
        food_item=FoodItem.objects.get(id=slug)
        food_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST',])
def order_place(request,slug):
    serializer=OrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(customer=request.user,Restraunt=User.objects.get(id=slug))
        return Response(serializer.data,status=status.HTTP_201_CREATED)

    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST',])
def add_item(request,slug):
    serializer=OrderItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(order=Order.objects.get(id=slug))
        return Response(serializer.data,status=status.HTTP_201_CREATED)

    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST',])
def restraunt_detail(request):
    serializer=RestrauSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(parent=request.user)
        return Response(serializer.data,status=status.HTTP_201_CREATED)

    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST',])
def restraunt_detail(request):
    serializer=RestrauSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(parent=request.user)
        return Response(serializer.data,status=status.HTTP_201_CREATED)

    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST',])
def customer_detail(request):
    serializer=UseriSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(parent=request.user)
        return Response(serializer.data,status=status.HTTP_201_CREATED)

    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)