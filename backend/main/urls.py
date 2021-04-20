from django.urls import path
from . import views

app_name = 'main'
"""Api endpoints"""
urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),#checked
    path('token/', views.CreateTokenView.as_view(), name='token'),#checked
    path('me/', views.ManageUserView.as_view(), name='me'),#checked
    path('restrau_detail/', views.restraunt_detail, name='restrau'),#checked
    path('customer_detail/', views.customer_detail, name='customer'),#checked
    path('allfoodlist/', views.fooditemlist, name='allfoodlist'),#checked
    path('food_by_category/<slug:slug>/', views.fooditembycategory, name='allfoodlist'),#checked
    path('foodlist/<slug:slug>/', views.fooditem, name='foodlist'),#checked
    path('add_food/', views.create_food, name='add_food'),#checked
    path('addorder/<slug:slug>/', views.order_place, name='add_order'),
    path('food_item/<slug:slug>/',views.add_item,name='food_item'),
    path('restrau_item/<slug:slug>/',views.restrau_by_food,name='food_item'),
]