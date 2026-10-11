from django.http import JsonResponse
from .models import SiteSetting

def health_check(request):
    return JsonResponse({
        "status": "online",
        "service": "SKz Real Estate Core API",
        "version": "1.0.0"
    })
