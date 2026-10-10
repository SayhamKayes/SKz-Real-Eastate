from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .serializers import UserSerializer

class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        # Demo guest user if not authenticated
        if self.request.user.is_authenticated:
            return self.request.user
        user, _ = User.objects.get_or_create(username='guest_investor', email='investor@navanarealestate.com')
        return user
