# Generated by Django 4.2.16 on 2024-11-23 14:35

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("posts", "0002_alter_post_status"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="status",
            field=models.CharField(
                choices=[
                    ("Disabled", "Disabled"),
                    ("Draft", "Draft"),
                    ("Active", "Active"),
                ],
                default="Active",
                max_length=100,
            ),
        ),
    ]
