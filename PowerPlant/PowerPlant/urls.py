from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path('new/', views.user_new, name='user_new'),
]