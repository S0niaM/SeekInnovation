from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.conf import settings
from django.core.validators import EmailValidator, MinLengthValidator

from django.utils.translation import gettext_lazy as _

class Country(models.Model):
    name =models.CharField(max_length=50)

class Sector(models.Model):
    name =models.CharField(max_length=50)


"""

User model

"""

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


"""

Profile Model

"""

class Profile(AbstractBaseUser):
    class ProfileChoices(models.TextChoices):
        BUYER = 'Buyer', _('Buyer')
        SELLER = 'Seller', _('Seller')
        CLUSTER = 'Cluster', _('Cluster')

    email = models.EmailField(unique=True, validators=[EmailValidator()])########
    name = models.CharField(max_length=255)########
    position = models.CharField(max_length=255, blank=True)########
    phone = models.CharField(max_length=15,blank=True)
    country =  models.ForeignKey(Country, on_delete=models.CASCADE )#######
    profile = models.CharField(
        max_length=10,
        choices=ProfileChoices.choices,
        default=ProfileChoices.BUYER
    )
    #sector = models.ForeignKey(Sector, on_delete=models.CASCADE )
    company = models.CharField(max_length=255)
    company_link = models.URLField(max_length=255, blank=True)
    company_description = models.TextField(blank=True)
    image1 = models.CharField(max_length=255, blank=True)
    image2 = models.CharField(max_length=255, blank=True)
    image3 = models.CharField(max_length=255, blank=True)
    image4 = models.CharField(max_length=255, blank=True)
    profile_picture = models.CharField(max_length=255, blank=True)
    video1 = models.CharField(max_length=255, blank=True)
    pdf = models.CharField(max_length=255, blank=True)
    sector_type = models.BooleanField(default =False)
    sector_subcategory =models.BooleanField (default =False)
    #PasswordHash = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.name}'s Profile"

    class Meta:
        verbose_name = 'Profile'
        verbose_name_plural = 'Profiles'
    
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'country', 'profile', 'company']

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'Users'

###################################################################################
class General_Choices(models.Model):
    choices = models.CharField(max_length=100)

"""

Sector Further Details Sections

"""
class Sector_types(models.Model): # different sector subtypes are stored here
    sector = models.ForeignKey(Sector, on_delete=models.CASCADE )
    type = models.CharField(max_length=100)

class Sector_headers(models.Model): # option headings are stored here
    sector = models.ForeignKey(Sector, on_delete=models.CASCADE )
    name = models.CharField(max_length=255)

class Sector_subcategories(models.Model): # options are stored here
    sector = models.ForeignKey(Sector, on_delete=models.CASCADE )
    header= models.ForeignKey(Sector_headers, on_delete=models.CASCADE)
    name =  models.CharField(max_length=255)

class Sector_user(models.Model): # User - Sector relationship model
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    sector_id = models.ForeignKey(Sector, on_delete=models.CASCADE)


#####################################################################################

"""
Offers and Needs Models

"""
class Offers(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    name = models.ForeignKey(Sector_subcategories, on_delete=models.CASCADE)
    quantity= models.IntegerField(default=1)
    description = models.TextField(blank=True)
    price = models.IntegerField(blank=True)


class Needs(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    name = models.ForeignKey(Sector_subcategories, on_delete=models.CASCADE)
    quantity= models.IntegerField(default=1)
    description = models.TextField(blank=True)
    price = models.IntegerField(blank=True)