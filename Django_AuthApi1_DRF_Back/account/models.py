from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
from .managers import UserManager



class User(AbstractBaseUser):
	email = models.EmailField(verbose_name='Email', unique=True, max_length=255)
	is_staff = models.BooleanField(default=False)
	is_active = models.BooleanField(default=True)
	name = models.CharField(max_length=100)
	tc = models.BooleanField()
	created_at = models.DateTimeField( auto_now_add=True)
	updated_at = models.DateTimeField( auto_now=True)


	USERNAME_FIELD = "email"
	REQUIRED_FIELDS = ['name','tc']

	objects = UserManager()

	def __str__(self):
			return self.email
	
	def has_perm(self, perm, obj=None):
				return self.is_staff

	def has_module_perms(self, app_label):
				return self.is_staff