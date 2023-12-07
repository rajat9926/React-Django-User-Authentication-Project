from django.contrib import admin
from account.models import User
from django.contrib.auth.admin import UserAdmin
# Register your models here.



class UserModelAdmin(UserAdmin):
	list_display = ('id','name',"email", "is_staff","tc")
	list_filter = ("is_staff",)
	fieldsets = (
			('User Credential', {"fields": ("email", "password")}),('Personal Info',{"fields":("name","tc")}),
			("Permissions", {"fields": ("is_staff",)}),
	)
	add_fieldsets = (
			(None, {
					"classes": ("wide",),
					"fields": (
							"email","name","tc","password1", "password2", "is_staff",
							"is_active",
					)}
			),
	)
	search_fields = ("email",)
	ordering = ("email",)
	filter_horizontal=()

admin.site.register(User, UserModelAdmin)