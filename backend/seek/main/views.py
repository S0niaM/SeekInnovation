
from rest_framework.response import Response
from rest_framework import status
from .models import Sector, Profile, Country
from .serializers import SectorSerializer, CountrySerializer
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import ProfileSerializer
from django.db import transaction
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken



import logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    email = request.data.get('email')
    name = request.data.get('name')
    company = request.data.get('company')
    country_id = request.data.get('country_id') 
    position = request.data.get('position')
    password = request.data.get('password')
    profile = request.data.get('profile')

    if not all([name, email, country_id, company, position, profile, password]):
        return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

    logger.info(f'Registering user: {email}, {name}, {company}, {country_id}, {position}')
    
    try:
        with transaction.atomic():
            user = User.objects.create_user(username=email, email=email, password=password)
            logger.info(f'User created: {user}')
            
            Profile.objects.create(
                name=name,
                email=email,
                password=user.password,  # Use caution here
                country_id=country_id,
                company=company,
                position=position,
                profile=profile,
            )
        return Response({'message': 'Profile registration is successful.'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        logger.error(f'Registration failed: {str(e)}')
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Ensure email and password are provided
    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
    
     # Debugging print statements
    print(f"Login email: {email}")
    print(f"Login password: {password}")

    # custom authentication logic to authenticate via email
    user = authenticate(request, username=email, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
    
    
@api_view(['GET'])
@permission_classes([AllowAny])
def sector_list(request):
    sectors = Sector.objects.all()
    serializer = SectorSerializer(sectors, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def country_list(request):
    try:
        countries = Country.objects.all()
        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class UserProfileViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.filter(email=self.request.user.email)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if queryset.exists():
            serializer = self.get_serializer(queryset.first())
            return Response(serializer.data)
        return Response({"detail": "Profile not found."}, status=404)
    
    def update(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if queryset.exists():
            profile = queryset.first()
            # Deserialize and update the profile
            serializer = self.get_serializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"detail": "Profile updated successfully.", "data": serializer.data})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"detail": "Profile not found."}, status=404)

    def destroy(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if queryset.exists():
            profile = queryset.first()
            profile.delete()
            return Response({"detail": "Profile deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        return Response({"detail": "Profile not found."}, status=404)