from django.db import models
from enumfields import EnumField
from enum import Enum

# Create your models here.


class TestModel(models.Model):
    first_name = models.CharField(null=False, blank=False, max_length=50)
    last_name = models.CharField(max_length=50)


class Priority(Enum):
    High = '0'
    Normal = '1'
    Low = '2'


class BaseClass(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ('-created_at',)


class Errand(BaseClass):
    title = models.CharField(null=False, blank=False, max_length=100)
    description = models.TextField()
    created_date = models.DateTimeField(null=True)
    tags = models.TextField(null=True, blank=True)
    priority = EnumField(Priority, max_length=1, default=Priority.Low)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('created_date',)
