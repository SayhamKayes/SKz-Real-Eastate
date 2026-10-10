import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'real_estate.settings')
django.setup()

from api.models import Project

projects_to_seed = [
    {
        "title": "Navana Platinum Square",
        "slug": "navana-platinum-square",
        "category": "residential",
        "status": "ongoing",
        "location": "Gulshan 2, Dhaka",
        "address": "Road 71, Gulshan 2 (Diplomatic Zone Enclave)",
        "area_sqft": "4,650 – 5,800 sq ft",
        "units_count": 14,
        "floors": 16,
        "handover_year": "2026",
        "rera_reg_no": "RAJUK/BP/GUL-2023-891",
        "description": "An unprecedented synthesis of Scandinavian architectural clarity and tropical biophilic landscaping in Gulshan.",
        "architectural_concept": "Cantilevered garden terraces, panoramic thermal-break glazing, and biophilic vertical gardens.",
        "amenities": ["Infinity Sky Pool", "Wellness Spa & Sauna", "Executive Club Lounge", "Technogym Fitness Studio", "Triple-Height Grand Lobby"],
        "specifications": {"structure": "Earthquake resistant shear-wall RC system", "facade": "Saint-Gobain triple-glazed curtain wall"},
        "featured": True
    },
    {
        "title": "Navana Pristine Pavilion",
        "slug": "navana-pristine-pavilion",
        "category": "commercial",
        "status": "completed",
        "location": "Gulshan 1, Dhaka",
        "address": "Plot 128, Gulshan Avenue, Dhaka",
        "area_sqft": "3,800 – 12,500 sq ft Floorplates",
        "units_count": 28,
        "floors": 20,
        "handover_year": "2024",
        "rera_reg_no": "RAJUK/BP/COMM-2021-312",
        "description": "Grade-A intelligent corporate tower featuring high-efficiency floor plates and Fortune 500 amenities.",
        "architectural_concept": "Sculptural double-skin ceramic facade reducing thermal gain by 38%.",
        "amenities": ["Helipad Access", "Central BMS", "High Speed Destination Lifts", "Double Glazing", "Auditorium"],
        "specifications": {"power": "100% full standby generator with synchronizer", "certification": "LEED Platinum Certified"},
        "featured": True
    },
    {
        "title": "Navana Grand Veranda",
        "slug": "navana-grand-veranda",
        "category": "residential",
        "status": "ongoing",
        "location": "Banani, Dhaka",
        "address": "Road 11, Block F, Banani",
        "area_sqft": "3,200 – 4,100 sq ft",
        "units_count": 18,
        "floors": 14,
        "handover_year": "2027",
        "rera_reg_no": "RAJUK/BP/BAN-2024-104",
        "description": "Exclusive garden condominiums with wrap-around balconies overlooking lakeside vistas.",
        "architectural_concept": "Modern tropical minimalism inspired by Geoffrey Bawa, prioritizing cross-ventilation.",
        "amenities": ["Lakeside Promenade", "Kids Play Enclave", "Zen Garden", "Residents Cafe"],
        "specifications": {"flooring": "Imported Spanish glazed porcelain tiles", "fittings": "Grohe concealed fixtures"},
        "featured": True
    },
    {
        "title": "Navana Silicon Oasis",
        "slug": "navana-silicon-oasis",
        "category": "mixed_use",
        "status": "upcoming",
        "location": "Tejgaon Commercial Area, Dhaka",
        "address": "Shaheed Tajuddin Ahmed Sarani, Tejgaon",
        "area_sqft": "5,000 – 25,000 sq ft",
        "units_count": 42,
        "floors": 24,
        "handover_year": "2028",
        "rera_reg_no": "RAJUK/BP/TEJ-2025-007",
        "description": "Next-generation mixed-use landmark featuring tech incubation offices, luxury studio lofts, and boutique dining.",
        "architectural_concept": "Futuristic kinetic solar facade and multi-tier public sky atrium.",
        "amenities": ["Sky Terrace Park", "EV Superchargers", "Smart Parking Guidance", "Co-working Hub"],
        "specifications": {"connectivity": "Redundant dark fiber backbone", "energy": "Rooftop solar PV farm"},
        "featured": False
    }
]

created_count = 0
for data in projects_to_seed:
    obj, created = Project.objects.update_or_create(
        slug=data["slug"],
        defaults=data
    )
    if created:
        created_count += 1
        print(f"Created project: {obj.title}")
    else:
        print(f"Updated project: {obj.title}")

print(f"Seeding finished. {Project.objects.count()} total projects in database.")
