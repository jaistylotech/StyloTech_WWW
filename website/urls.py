from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('service/', views.services, name='service'),
    path('pages/', views.pages, name='pages'),
    path('contact/', views.contact, name='contact'), 
    path('product/<slug:product_slug>/', views.product_detail, name='product_detail'),
    path('certifications/', views.certifications, name='certifications'),
    path('training/', views.training, name='training'),
    path('privacy/', views.privacy, name='privacy'),
    path('terms/', views.terms, name='terms'),
]