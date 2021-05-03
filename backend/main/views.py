from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, authentication, permissions, serializers,status
from rest_framework import response
from rest_framework.authtoken.views import ObtainAuthToken
from django.shortcuts import redirect, render,get_object_or_404
from rest_framework.settings import api_settings
from rest_framework import viewsets,generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSerializer,AuthTokenSerializer,FoodSerializer,OrderItemSerializer,OrderSerializer,RestrauSerializer,UseriSerializer
from .models import FoodItem,Order,OrderItem, User,UserDetail,RestrauntDetail

class CreateUserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer

    def create(self, request, *args, **kwargs):
        
        if( User.objects.filter(email=request.data['email']).exists()):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            user=User.objects.create(email=request.data['email'],password=request.data['password'],is_customer=request.data['is_customer'])
            user.save()
            if(request.data['is_customer']==True):
                item=request.data['udetails']
                udetails=UserDetail.objects.create(parent=user)
                udetails.name=item['name']
                udetails.phone_no=item['phone_no']
                udetails.save()
            else:
                item=request.data['rdetails']
                rdetails=RestrauntDetail.objects.create(parent=user)
                rdetails.name=item['name']
                rdetails.latitude=item['latitude']
                rdetails.longitude=item['longitude']
                rdetails.address=item['address']
                rdetails.save()

            return Response(UserSerializer(user).data)



 
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

@api_view(['GET',])
def fooditem(request,slug):
    user=User.objects.get(id=slug)
    food_items=FoodItem.objects.filter(parent=user)
    serializer=FoodSerializer(food_items,many=True)
    return Response(serializer.data)

@api_view(['GET',])
def fooditemlist(request):
    food_items=FoodItem.objects.all()
    serializer=FoodSerializer(food_items,many=True)

    return Response(serializer.data)

@api_view(['GET',])
def fooditembycategory(request,slug):
    food_items=FoodItem.objects.filter(category=slug)
    serializer=FoodSerializer(food_items,many=True)

    return Response(serializer.data)

@api_view(['GET',])
def restraulist(request):
    restrau=User.objects.filter(is_customer=False)
    serializer=UserSerializer(restrau,many=True)

    return Response(serializer.data)

@api_view(['GET',])
def restraubyid(request,slug):
    restrau=User.objects.get(id=slug)
    serializer=UserSerializer(restrau)

    return Response(serializer.data)

@api_view(['POST',])
def create_food(request):
    serializer=FoodSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(parent=request.user)
        return Response(serializer.data,status=status.HTTP_201_CREATED)

    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class AddOrderViewSet(viewsets.ModelViewSet):
    queryset=Order.objects.all()
    serializer_class=OrderSerializer

    def create(self, request, *args, **kwargs):
        customer=User.objects.get(id=request.data['customer_id'])
        restraunt=User.objects.get(id=request.data['restraunt_id'])
        order=Order.objects.create(customer=customer,Restraunt=restraunt)
        order_items=request.data['orderitems']
        order.save()
        for item in order_items:
            food=FoodItem.objects.get(id=item['id'])
            order_item=OrderItem.objects.create(item=food,order=order)
            order_item.desc=item['desc']
            order_item.price=item['price']
            order_item.quantity=item['quantity']
            order_item.save()
            print(item)

        return Response(OrderSerializer(order).data)


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
        print(request.user)
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