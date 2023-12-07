from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from account.serializers import UserLoginSerializer,UserProfileSerializer,UserRegistrationSerializer,UserPasswordChangeSerializer,SendPasswordResetEmailSerializer,PasswordResetSerializer
from django.contrib.auth import authenticate
from account.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from account.models import User


# generating token manually
def generate_token(user):
	refresh = RefreshToken.for_user(user)
	return {
		'access':str(refresh.access_token),
		'refresh':str(refresh),
	}


class UserRegistrationView(APIView):
	renderer_classes = [UserRenderer]

	def post(self,request,format=None):
		serializer = UserRegistrationSerializer(data=request.data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.save()
			tokens = generate_token(user)
			return Response({'token':tokens,'msg':'registration success'})
		return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
	


class UserLoginView(APIView):
	renderer_classes = [UserRenderer]

	def post(self,request):
		serializer = UserLoginSerializer(data=request.data)
		if serializer.is_valid():
			email = serializer.data.get('email')
			password = serializer.data.get('password')
			user = authenticate( email= email , password= password )
			if user is not None:
				tokens = generate_token(user)
				return Response({'token':tokens,'msg':'login success'},status=status.HTTP_200_OK)
			else:
				return Response({'error':'invalid credentials'},status=status.HTTP_404_NOT_FOUND)
		else:
			return Response({'error':'non_field_error'},status=status.HTTP_400_BAD_REQUEST)
		


class UserProfileView(APIView):
	renderer_classes = [UserRenderer]
	permission_classes = [IsAuthenticated]

	def get(self,request):
		serializer = UserProfileSerializer(request.user)
		return Response(serializer.data)
	

class UserPasswordChangeView(APIView):
	renderer_classes = [UserRenderer]
	permission_classes = [IsAuthenticated]

	def post(self,request):
		serializer = UserPasswordChangeSerializer(data = request.data,context={'user':request.user})
		if serializer.is_valid():
			return Response({'msg':'password has been successfully changed'},status=status.HTTP_200_OK)
		else:
			return Response(serializer.errors)
		

class SendPasswordResetEmailView(APIView):
	renderer_classes=[UserRenderer]

	def post(self,request):
		serializer = SendPasswordResetEmailSerializer(data=request.data)
		if serializer.is_valid(raise_exception=True):
			email = serializer.data.get('email')
			return Response({'msg':'password reset link has been sent please check your email'},status=status.HTTP_200_OK)
		
class PasswordResetView(APIView):
	renderer_classes=[UserRenderer]

	def post(self,request,uid,token):
		serializer = PasswordResetSerializer(data = request.data,context={'uid':uid,'token':token})
		if serializer.is_valid():
			return Response({'msg':'password reset successful'},status=status.HTTP_200_OK)
		return Response(serializer.errors)