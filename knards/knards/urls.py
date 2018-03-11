from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('new/', TemplateView.as_view(template_name='new.html'), name='new'),
    path('list/', TemplateView.as_view(template_name='list.html'), name='list'),
    path('edit/<int:pk>/', TemplateView.as_view(template_name='edit.html'), name='edit'),
    path('revise/', TemplateView.as_view(template_name='revise.html'), name='revise'),
    path('profile/', TemplateView.as_view(template_name='list.html'), name='profile'),
    path('logout/', TemplateView.as_view(template_name='list.html'), name='logout'),
    path('api/', include('api.urls'))
]
