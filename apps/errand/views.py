from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, viewsets

from apps.errand import serializers
from apps.errand.models import Errand

# Create your views here.


def index(request):
    return HttpResponse('Errand app\'s api has been successfully created')


class ErrandListCreateAPIView(generics.ListCreateAPIView):
    queryset = Errand.objects.all()
    serializer_class = serializers.ErrandSerializer

    def get(self, request):
        return self.list(request)

    def post(self, request):
        return self.create(request)


class ErrandRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Errand.objects.all()
    serializer_class = serializers.ErrandSerializer
    lookup_field = 'id'

    def get(self, request, id=None):
        return self.retrieve(request, id)

    def put(self, request, id=None):
        return self.partial_update(request)

    def delete(self, request, id=None):
        return self.destroy(request, id)


class ErrandViewSet(viewsets.ModelViewSet):
    queryset = Errand.objects.all()
    serializer_class = serializers.ErrandSerializer
