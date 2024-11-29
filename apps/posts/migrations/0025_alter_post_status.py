# Generated by Django 4.2.16 on 2024-11-27 20:14

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("posts", "0024_alter_post_status"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="status",
            field=models.CharField(
                choices=[
                    ("Active", "Active"),
                    ("Draft", "Draft"),
                    ("Disabled", "Disabled"),
                ],
                default="Active",
                max_length=100,
            ),
        ),
    ]