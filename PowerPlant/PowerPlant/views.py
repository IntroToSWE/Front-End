from django.shortcuts import render
from django.http import HttpResponse
from .models import User
from .forms import NewUser

def index(request):
    return render(request, 'PowerPlant/homepage.html')

def member_new(request):
    if request.method == 'POST':
        form = NewUser(request.POST)
        if form.is_valid():
            form.save()
        form = NewUser()
    else:
        form = NewUser()
    return render(request, 'PowerPlant/new_user.html', {'form': form})