

from django.urls import path
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
router = DefaultRouter()
router.register(r'profile', views.UserProfileViewSet, basename='user-profile')

urlpatterns = [
     path('', include(router.urls)),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('sectors/', views.sector_list, name='sector-list'),
    path('countries/', views.country_list, name='country-list'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    ##path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]

