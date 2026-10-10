from django.db import models

class SiteSetting(models.Model):
    company_name = models.CharField(max_length=150, default='Navana Real Estate Ltd.')
    tagline = models.CharField(max_length=255, default="Crafting Tomorrow's Landmarks")
    hotline = models.CharField(max_length=50, default='+880 9613-222333')
    headquarters = models.TextField(default='Navana Tower, 45 Gulshan Avenue, Gulshan 1, Dhaka 1212, Bangladesh')
    email = models.EmailField(default='info@navanarealestate.com')
    years_excellence = models.IntegerField(default=28)
    completed_projects = models.IntegerField(default=120)
    ongoing_projects = models.IntegerField(default=35)
    total_sqft_delivered = models.CharField(max_length=50, default='15M+ sq. ft.')

    def __str__(self):
        return self.company_name
