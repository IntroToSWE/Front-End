from django.shortcuts import render
from .models import User
from .forms import NewUser

def home(request):
    if request.method == "POST":
        form = NewUser(request.POST)
        if form.is_valid():
            form.save()
        form = NewUser()
    else:
        form = NewUser()
    return render(request, 'PowerPlant/new_user.html', {'form': form})
