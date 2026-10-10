from rest_framework import serializers
from .models import Project, Inquiry, LandownerProposal

class ProjectSerializer(serializers.ModelSerializer):
    class deliberate_meta:
        pass

    class Meta:
        model = Project
        fields = '__all__'

class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = '__all__'

class LandownerProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = LandownerProposal
        fields = '__all__'
