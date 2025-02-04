# Generated by Django 5.1.1 on 2024-09-18 12:23

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='General_Choices',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('choices', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Sector',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=254, unique=True, validators=[django.core.validators.EmailValidator()])),
                ('name', models.CharField(max_length=255)),
                ('position', models.CharField(max_length=255)),
                ('phone', models.CharField(max_length=15)),
                ('profile', models.CharField(choices=[('Buyer', 'Buyer'), ('Seller', 'Seller'), ('Cluster', 'Cluster')], default='Buyer', max_length=10)),
                ('company', models.CharField(max_length=255)),
                ('company_link', models.URLField(blank=True, max_length=255)),
                ('company_description', models.TextField(blank=True)),
                ('image1', models.CharField(blank=True, max_length=255)),
                ('image2', models.CharField(blank=True, max_length=255)),
                ('image3', models.CharField(blank=True, max_length=255)),
                ('image4', models.CharField(blank=True, max_length=255)),
                ('profile_picture', models.CharField(blank=True, max_length=255)),
                ('video1', models.CharField(blank=True, max_length=255)),
                ('pdf', models.CharField(blank=True, max_length=255)),
                ('sector_type', models.BooleanField(default=False)),
                ('sector_subcategory', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.country')),
            ],
            options={
                'verbose_name': 'Users',
            },
        ),
        migrations.CreateModel(
            name='Sector_headers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('sector', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.sector')),
            ],
        ),
        migrations.CreateModel(
            name='Sector_subcategories',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('header', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.sector_headers')),
                ('sector', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.sector')),
            ],
        ),
        migrations.CreateModel(
            name='Offers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=1)),
                ('description', models.TextField(blank=True)),
                ('price', models.IntegerField(blank=True)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.profile')),
                ('name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.sector_subcategories')),
            ],
        ),
        migrations.CreateModel(
            name='Needs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=1)),
                ('description', models.TextField(blank=True)),
                ('price', models.IntegerField(blank=True)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.profile')),
                ('name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.sector_subcategories')),
            ],
        ),
        migrations.CreateModel(
            name='Sector_types',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=100)),
                ('sector', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.sector')),
            ],
        ),
        migrations.CreateModel(
            name='Sector_user',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sector_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.sector')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.profile')),
            ],
        ),
    ]
