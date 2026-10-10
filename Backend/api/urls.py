from django.urls import path
from .views import (
    ProjectListCreateView,
    ProjectDetailView,
    InquiryCreateView,
    LandownerProposalCreateView,
    FeasibilityCalculatorView
)

urlpatterns = [
    path('projects/', ProjectListCreateView.as_view(), name='project-list'),
    path('projects/<slug:slug>/', ProjectDetailView.as_view(), name='project-detail'),
    path('inquiries/', InquiryCreateView.as_view(), name='inquiry-create'),
    path('landowner-proposals/', LandownerProposalCreateView.as_view(), name='landowner-proposal-create'),
    path('feasibility-calculator/', FeasibilityCalculatorView.as_view(), name='feasibility-calculator'),
]
