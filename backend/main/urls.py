from django.urls import path
from . import views

app_name = 'main'
"""Api endpoints"""
urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),
    path('token/', views.CreateTokenView.as_view(), name='token'),
    path('me/', views.ManageUserView.as_view(), name='me'),
    path('restrau_detail/', views.restraunt_detail, name='restrau'),
    path('customer_detail/', views.customer_detail, name='customer'),
    path('addfooditem/slug:slug>/', views.add_item, name='add_food'),
    path('addorder/slug:slug>/', views.order_place, name='add_order'),
    path('food_item/<slug:slug>/',views.fooditem,name='food_item')
]