# Generated by Django 3.2.20 on 2023-09-29 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wishes', '0002_alter_wish_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wish',
            name='image',
            field=models.ImageField(upload_to='wishes/'),
        ),
    ]