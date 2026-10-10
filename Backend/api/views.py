from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Project, Inquiry, LandownerProposal
from .serializers import ProjectSerializer, InquirySerializer, LandownerProposalSerializer

class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get('category')
        project_status = self.request.query_params.get('status')
        location = self.request.query_params.get('location')
        if category and category != 'all':
            qs = qs.filter(category=category)
        if project_status and project_status != 'all':
            qs = qs.filter(status=project_status)
        if location:
            qs = qs.filter(location__icontains=location)
        return qs

class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'slug'

class InquiryCreateView(generics.CreateAPIView):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer

class LandownerProposalCreateView(generics.CreateAPIView):
    queryset = LandownerProposal.objects.all()
    serializer_class = LandownerProposalSerializer

class FeasibilityCalculatorView(APIView):
    def post(self, request):
        katha = float(request.data.get('katha', 10))
        road_width = float(request.data.get('road_width', 40))
        location = request.data.get('location', 'Gulshan')

        # Architectural FAR (Floor Area Ratio) estimation based on Dhaka RAJUK building code
        base_far = 3.5 if road_width < 30 else (4.25 if road_width < 60 else 5.0)
        potential_built_up_sqft = int(katha * 720 * base_far)
        estimated_units = max(6, int(potential_built_up_sqft / 3200))
        estimated_floors = min(24, int(potential_built_up_sqft / (katha * 720 * 0.5)))
        
        return Response({
            'katha': katha,
            'road_width': road_width,
            'location': location,
            'estimated_far': base_far,
            'total_potential_sqft': potential_built_up_sqft,
            'estimated_units': estimated_units,
            'estimated_floors': estimated_floors,
            'handover_timeline_months': 36 if katha <= 15 else 48,
            'partnership_structure': '50/50 Joint Venture or Bespoke Revenue Share',
            'status': 'success'
        }, status=status.HTTP_200_OK)
