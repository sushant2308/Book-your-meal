from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from . import views

app_name = 'main'
"""Api endpoints"""
from rest_framework.routers import DefaultRouter
router = DefaultRouter(trailing_slash=False)
router.register(r'addorder', views.AddOrderViewSet)
router.register(r'create', views.CreateUserViewSet)
urlpatterns = [
    path('token/', views.CreateTokenView.as_view(), name='token'),#checked
    path('me/', views.ManageUserView.as_view(), name='me'),#checked
    path('restrau_detail/', views.restraunt_detail, name='restrau'),#checked
    path('customer_detail/', views.customer_detail, name='customer'),#checked
    path('allfoodlist/', views.fooditemlist, name='allfoodlist'),#checked
    path('food_by_category/<slug:slug>/', views.fooditembycategory, name='allfoodlist'),#checked
    path('foodlist/<slug:slug>/', views.fooditem, name='foodlist'),#checked
    path('add_food/', views.create_food, name='add_food'),#checked
    path('food_item/<slug:slug>/',views.add_item,name='food_item'),
    path('restrauntlist/',views.restraulist,name='food_item'),#checked
    path('restraunt/<slug:slug>/',views.restraubyid,name='food_item'),#checked
    
]
urlpatterns += router.urls