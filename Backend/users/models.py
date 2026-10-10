from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('client', 'Prospective Client / Buyer'),
        ('landowner', 'Landowner Partner'),
        ('advisor', 'Real Estate Portfolio Advisor'),
        ('admin', 'Executive Admin'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=30, blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='client')
    preferred_locations = models.CharField(max_length=255, blank=True)
    budget_range = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.user.username} ({self.get_role_display()})"
