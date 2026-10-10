from django.http import JsonResponse
from .models import SiteSetting

def health_check(request):
    return JsonResponse({
        "status": "online",
        "service": "Navana Real Estate Core API",
        "version": "1.0.0"
    })
