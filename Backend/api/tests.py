from django.test import TestCase
from .models import Project

class ProjectModelTest(TestCase):
    def setUp(self):
        self.project = Project.objects.create(
            title="Navana Platinum Tower",
            slug="navana-platinum-tower",
            category="residential",
            status="ongoing",
            location="Gulshan 2, Dhaka",
            address="Plot 14, Road 71, Gulshan 2",
            area_sqft="4,200 sq ft",
            description="Luxury residential landmark in Gulshan 2.",
            architectural_concept="Biophilic design with continuous cantilevers."
        )

    def test_project_creation(self):
        self.assertEqual(str(self.project), "Navana Platinum Tower (Gulshan 2, Dhaka)")
