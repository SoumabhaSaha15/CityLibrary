from django.shortcuts import render,HttpResponse
from django.http import HttpRequest

# Create your views here.
def home(request: HttpRequest) -> HttpResponse:
#   print(request.body)
  return render(request,'index.html')
