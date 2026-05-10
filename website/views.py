from django.shortcuts import render

# Create your views here.

def home(request):
    return render(request,'website/index-2.html')


def about(request):
    return render(request,'website/about.html')

def services(request):
    return render(request,'website/service.html')

def pages(request):
    return render(request,'website/pages.html')

def blog(request):
    return render(request,'website/blog.html')

def choose_us(request):
    return render(request,'website/choose-us.html')

def connect(request):
    return render(request,'website/contact.html')  

def login_register(request):
    return render(request,'website/login-register.html') 


def products(request):
    return render(request,'website/products.html')



# def certifications (request):
#     return render(request,'website/Certifications.html')


def training(request):
    return render(request,'website/training.html')

def privacy(request):
    return render(request,'website/privacy_policy.html')

def terms(request):
    return render(request,'website/terms.html')

def R_n_D(request):
    return render(request,'website/r&d.html')
