# Generated by Django 4.2.16 on 2024-11-23 15:25

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("posts", "0005_remove_post_imageprofil"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="status",
            field=models.CharField(
                choices=[
                    ("Active", "Active"),
                    ("Disabled", "Disabled"),
                    ("Draft", "Draft"),
                ],
                default="Active",
                max_length=100,
            ),
        ),
    ]
