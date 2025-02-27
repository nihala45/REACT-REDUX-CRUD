from django.urls import path, include
from .views import RegisterView, LoginView, UserDetailView,AdminLoginView
from rest_framework.routers import DefaultRouter




urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', UserDetailView.as_view(), name='user-details'),
    path('admin/login/', AdminLoginView.as_view(),name='admin-login' ),
    
]