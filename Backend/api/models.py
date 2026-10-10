from django.db import models

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('residential', 'Residential Condominium'),
        ('commercial', 'Commercial Tower'),
        ('mixed_use', 'Mixed Use Landmark'),
    ]

    STATUS_CHOICES = [
        ('ongoing', 'Under Construction / Ongoing'),
        ('completed', 'Ready to Move / Completed'),
        ('upcoming', 'Upcoming Prestige Launch'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='residential')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ongoing')
    location = models.CharField(max_length=150)
    address = models.CharField(max_length=300)
    area_sqft = models.CharField(max_length=100) # e.g. "3,250 – 5,800 sq ft"
    units_count = models.IntegerField(default=12)
    floors = models.IntegerField(default=14)
    handover_year = models.CharField(max_length=20, default='2027')
    rera_reg_no = models.CharField(max_length=100, blank=True)
    description = models.TextField()
    architectural_concept = models.TextField()
    amenities = models.JSONField(default=list)
    specifications = models.JSONField(default=dict)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.location})"

class Inquiry(models.Model):
    STATUS_CHOICES = [
        ('new', 'New Request'),
        ('contacted', 'VIP Advisor Contacted'),
        ('scheduled', 'Viewing Scheduled'),
        ('closed', 'Completed'),
    ]

    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    project_interest = models.CharField(max_length=200, blank=True)
    location_preference = models.CharField(max_length=100, blank=True)
    budget_range = models.CharField(max_length=100, blank=True)
    preferred_viewing_date = models.DateField(null=True, blank=True)
    message = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry from {self.name} for {self.project_interest or 'General'}"

class LandownerProposal(models.Model):
    owner_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=30)
    email = models.EmailField()
    plot_location = models.CharField(max_length=150)
    plot_size_katha = models.DecimalField(max_digits=6, decimal_places=2)
    road_width_feet = models.IntegerField(default=40)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Land Proposal: {self.owner_name} - {self.plot_location} ({self.plot_size_katha} Katha)"
