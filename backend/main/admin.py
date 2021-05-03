from django.contrib import admin
from django.utils.translation import gettext as _
from .models import User,RestrauntDetail,UserDetail,FoodItem,Order,OrderItem

admin.site.register(User)
admin.site.register(RestrauntDetail)
admin.site.register(UserDetail)
admin.site.register(FoodItem)
admin.site.register(Order)
admin.site.register(OrderItem)



