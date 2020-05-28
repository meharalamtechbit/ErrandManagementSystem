from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'manage-errand', views.ErrandViewSet)


urlpatterns = [
    path('', views.index, name='index'),
    path('', include(router.urls)),
    path('errands/', views.ErrandListCreateAPIView.as_view(), name='errands_list'),
    path('errands-details/<int:id>', views.ErrandRetrieveUpdateDestroyAPIView.as_view(), name='errand_details'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
