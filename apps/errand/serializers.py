from rest_framework import serializers
from enumfields.drf.serializers import EnumSupportSerializerMixin

from apps.errand.models import Errand


class ErrandSerializer(EnumSupportSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = Errand
       # fields =  ('id', 'title', 'description','tags', 'created_at')
        fields = '__all__'
