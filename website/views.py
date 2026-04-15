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



def product_detail(request, product_slug):

    products = {

        "lms": {
            "title": "Learning Management System (LMS)",
            "image": "images/lms.png",

            "description": "Learning Management System (LMS) is a software platform used to create, manage, deliver,  and track online learning or training programs. It allows organizations, schools, and training institutes to provide digital courses, monitor learner progress, and manage educational content in one centralized system. An LMS enables instructors to upload study materials, videos, assignments, quizzes, and certifications, while learners can access courses anytime, track their progress, complete assessments, and interact with instructors online. It helps make learning more flexible, organized, and accessible from anywhere through the internet.",
           
            "features": [

                {
                    "title": "Course Management",
                    "desc": "Create, organize, and manage online courses and learning modules.",
                    "icon": "fas fa-book"
                },


                {
                    "title": "User Management",
                    "desc": "Manage students, instructors, and administrators in one platform.",
                    "icon": "fas fa-users"
                },


                {
                    "title": "Content Delivery",
                    "desc": "Provide videos, documents, and study materials for online learning.",
                     "icon": "fas fa-video"
                },



                {
                    "title": "Progress Tracking",
                    "desc": "Monitor learner progress, course completion, and performance.",
                    "icon": "fas fa-chart-line"
                },



                {
                    "title": "Online Assessments",
                    "desc": "Conduct quizzes, assignments, and exams digitally.",
                    "icon": "fas fa-file-alt"
                },



                {
                    "title": "Reporting & Analytics",
                    "desc": "Track learning data and generate performance reports.",
                    "icon": "fas fa-chart-pie"
                },


                {
                    "title": "Data Security & Backup",
                    "desc": "Protects learner information and ensures safe storage of educational data.",
                    "icon": "fas fa-shield-alt"
                },

              ] 
        },

        "attendance": {
            "title": "Attendance Management System (AMS)",
            "image": "images/attendance.png",

            "description": "Attendance Management System is a digital solution used to record, monitor, and manage the attendance of employees or students. It replaces manual registers with automated systems that ensure accurate and efficient attendance tracking. The system collects attendance data through technologies such as biometric devices, RFID cards, mobile apps, or web-based systems, recording details like date, time, and user identity. It also allows administrators to monitor attendance in real time, generate reports, and manage features like leave, shifts, and payroll integration. Overall, it helps organizations improve accuracy, efficiency, and transparency while saving time and reducing manual errors..",

            "features": [

                {
                    "title": "Automated Attendance Tracking",
                    "desc": "Automatically record attendance using biometric devices, RFID, or online login systems.",
                    "icon": "fas fa-fingerprint"
                },


                {
                    "title": "Real-Time Monitoring",
                    "desc": "Track attendance and working hours in real time.",
                    "icon": "fas fa-clock"
                },


                {
                    "title": "Leave Management",
                    "desc": "Manage employee or student leave requests and approvals.",
                    "icon": "fas fa-calendar-check"

                },



                {
                    "title": "Attendance Reports",
                    "desc": "Generate detailed reports for attendance, absences, and late arrivals.",
                    "icon": "fas fa-file-alt"
                },



                {
                    "title": "Integration with Payroll",
                    "desc": "Integrate attendance data with payroll systems for accurate salary calculations.",
                    "icon": "fas fa-money-check-alt"
                },



                {
                    "title": "Mobile Access",
                    "desc": "Access attendance records anytime using mobile devices.",
                    "icon": "fas fa-mobile-alt"
                },


                {
                    "title": "Data Security",
                    "desc": "Ensure secure storage and protection of attendance records.",
                    "icon": "fas fa-shield-alt"
                },

              ] 
        },

        "cms": {
            "title": "Club Management System (CMS)",
            "image": "images/cms.png",

            "description": "Club Management System is a digital platform that helps clubs and organizations manage their activities and operations efficiently. It allows administrators to manage member information, registrations, events, attendance, and payments in a centralized system.The system also provides tools for event scheduling, communication with members, and generating reports, helping clubs stay organized and improve member engagement while reducing manual work.",

            "features": [

                {
                    "title": "Member Management",
                    "desc": "Automatically record attendance using biometric devices, RFID, or online login systems.",
                    "icon": "fas fa-users"
                   
                },


                {
                    "title": "Membership Registration",
                    "desc": "Allow new members to register and join the club easily.",
                    "icon": "fas fa-user-plus"
                    
                },


                {
                    "title": "Event Management",
                    "desc": "Plan, schedule, and manage club events, meetings, and activities.",
                    "icon": "fas fa-calendar-alt"
                   
                },



                {
                    "title": "Attendance Tracking",
                    "desc": "Monitor attendance for events and meetings in real time.",
                    "icon": "fas fa-check-circle"
                    
                },



                {
                    "title": "Payment & Fee Management",
                    "desc": "Track membership fees, subscriptions, and payment records.",
                    "icon": "fas fa-credit-card"
                    
                },


                {
                    "title": "Communication Tools",
                    "desc": "Send announcements, notifications, and updates to members.",
                    "icon": "fas fa-bullhorn"
                    
                },

                 {
                    "title": "Reports & Analytics",
                    "desc": "Generate reports on membership, events, and financial records.",
                    "icon": "fas fa-chart-bar"
                    
                },

              ] 
        }

    }

    product = products.get(product_slug)

    return render(request,'website/product-detail.html',{
        'product':product
    })



def certifications (request):
    return render(request,'website/certifications.html')


def training(request):
    return render(request,'website/training.html')

def privacy(request):
    return render(request,'website/privacy_policy.html')

def terms(request):
    return render(request,'website/terms.html')

def R_n_D(request):
    return render(request,'website/r&d.html')