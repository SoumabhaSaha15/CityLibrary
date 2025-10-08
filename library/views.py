from django.shortcuts import render
from django.http import HttpResponse
# from .models import Books,Client,Admin,Borrow
# from django.core import serializers
# from django.views.decorators.csrf import csrf_exempt, csrf_protect
# from django.http import JsonResponse
# import json

# Create your views here.
def home(request):
  return HttpResponse('Hello, World.')
