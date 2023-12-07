from django.contrib.auth.base_user import BaseUserManager

class UserManager(BaseUserManager):
    
	def create_user(self, email, name,tc,password=None,password2=None):
			if not email:
					raise ValueError(("The Email must be set"))
			email = self.normalize_email(email)
			user = self.model(email=email , name=name , tc=tc)
			user.set_password(password)
			user.save()
			return user

	def create_superuser(self, email, password, name,tc):
			user = self.create_user(email=email	,	name=name	,	tc=tc, password=password)
			# user.is_admin=True
			user.is_staff=True
			user.save()
			return user