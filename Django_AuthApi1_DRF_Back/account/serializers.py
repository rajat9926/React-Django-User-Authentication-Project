from rest_framework import serializers
from account.models import User
from django.utils.encoding import smart_str,force_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from account.utils import Util


class UserRegistrationSerializer(serializers.ModelSerializer):
	password2 = serializers.CharField(style={'input_type':"password"},write_only=True)
	class Meta:
		model = User
		fields = ['email','name','password','password2','tc']
		extra_kwargs = {'password':{'write_only':True}}

	def validate(self, data):
		password = data.get('password')
		password2 = data.get('password2')
		if password != password2:
			raise serializers.ValidationError("password and cnfpassword does not match")
		return data
	
	def create(self, validated_data):
		return User.objects.create_user(**validated_data)
	
# -------------------------------------------------------------------------------------------------

class UserProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['id','email','name']

# -------------------------------------------------------------------------------------------------

class UserPasswordChangeSerializer(serializers.Serializer):
	password = serializers.CharField(max_length=100 , style={'input_type':'password'})
	cnfpassword = serializers.CharField(max_length=100 , style={'input_type':'password'})

	def validate(self, data):
		password = data.get('password')
		cnfpassword = data.get('cnfpassword')
		user = self.context.get('user')
		if password != cnfpassword:
			raise serializers.ValidationError("password and cnfpassword does not match")
		user.set_password(password)
		user.save()
		return data

# -------------------------------------------------------------------------------------------------

class UserLoginSerializer(serializers.ModelSerializer):
	email = serializers.EmailField()
	class Meta:
		model = User
		fields = ['email','password']

	# def validate(self, data):
	# email = data.get('email')
	# password = data.get('password')
	# if password :
	# 	raise serializers.ValidationError("password and cnfpassword does not match")
	# return data

	# -------------------------------------------------------------------------------------------------

class SendPasswordResetEmailSerializer(serializers.Serializer):
	email = serializers.EmailField(max_length = 100)

	def validate(self, data):
		email = data.get('email')
		if User.objects.filter(email=email).exists():
			user = User.objects.get(email=email)
			uid = urlsafe_base64_encode(force_bytes(user.id))
			token = PasswordResetTokenGenerator().make_token(user)
			link = 'http://localhost:3000/api/resetpassword/'+uid+'/'+token
			print(link)
			email_data = {
				'subject':'Reset Password',
				'body':'Click the Link To reset PAssword'+ link,
				'to_email':user.email
			}
			Util.send_email(email_data)
			return data
		else:
			raise serializers.ValidationError('you are not an registered user')
		

class PasswordResetSerializer(serializers.Serializer):
	password = serializers.CharField(max_length=100 , style={'input_type':'password'})
	cnfpassword = serializers.CharField(max_length=100 , style={'input_type':'password'})

	def validate(self, data):
		try:
			password = data.get('password')
			cnfpassword = data.get('cnfpassword')
			uid = self.context.get('uid')
			token = self.context.get('token')
			if password != cnfpassword:
				raise serializers.ValidationError("password and cnfpassword does not match")
			id = smart_str(urlsafe_base64_decode(uid))
			user = User.objects.get(id=id)
			if not PasswordResetTokenGenerator().check_token(user,token):
				raise serializers.ValidationError("token is Not Valid or Expired")
			user.set_password(password)
			user.save()
			return data
		except DjangoUnicodeDecodeError as identifier:
			PasswordResetTokenGenerator().check_token(user,token)
			raise serializers.ValidationError('token is not valid')