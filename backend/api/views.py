from django.shortcuts import render
from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, action
from django.contrib.auth import authenticate
from .models import User
from .serializers import UserSerializer

# Create your views here.
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    print('hihiih')

class LoginView(APIView):
    def post(self, request,*args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        print(email,password)
        print(user)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh' : str(refresh),
                'access' : str(refresh.access_token),
                  'is_superuser': user.is_superuser
            })
        return Response({'error' : "Invalid Credentials"}, status=400)
    
    
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self):
        print(self.request.user)
        return self.request.user
    
    


class AdminLoginView(APIView):
    def post(self,request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email,password = password)
        print(email,password)
        print(user)

        if user is not None and user.is_superuser:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh' : str(refresh),
                'access' : str(refresh.access_token),
                  'is_superuser': user.is_superuser
            })
        return Response({'detail' : 'Invalid credentials or not an admin '}, status=status.HTTP_401_UNAUTHORIZED)
    
