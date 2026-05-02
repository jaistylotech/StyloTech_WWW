from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('service/', views.services, name='service'),
    path('pages/', views.pages, name='pages'),
    path('connect/', views.connect, name='connect'), 
    path('certifications/', views.certifications, name='certifications'),
    path('training/', views.training, name='training'),
    path('privacy/', views.privacy, name='privacy'),
    path('terms/', views.terms, name='terms'),
    path('r&d/', views.R_n_D, name='R_n_D'),
    path('products/', views.products, name='products'),
]