from django.contrib import admin
from .models import Project, Inquiry, LandownerProposal

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'status', 'location', 'handover_year', 'featured')
    list_filter = ('category', 'status', 'featured')
    search_fields = ('title', 'location', 'address')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email', 'project_interest', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'phone', 'email', 'project_interest')

@admin.register(LandownerProposal)
class LandownerProposalAdmin(admin.ModelAdmin):
    list_display = ('owner_name', 'plot_location', 'plot_size_katha', 'phone', 'created_at')
    search_fields = ('owner_name', 'plot_location', 'phone')
