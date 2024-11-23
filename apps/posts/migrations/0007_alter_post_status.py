# Generated by Django 4.2.16 on 2024-11-23 15:31

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("posts", "0006_alter_post_status"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="status",
            field=models.CharField(
                choices=[
                    ("Draft", "Draft"),
                    ("Active", "Active"),
                    ("Disabled", "Disabled"),
                ],
                default="Active",
                max_length=100,
            ),
        ),
    ]
