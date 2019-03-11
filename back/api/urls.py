from django.urls import include, path
from rest_framework import routers

from api.views.users import UserViewSet, GroupViewSet
from api.views.arguments import ArgumentViewSet
from api.views.bigpictures import BigPictureViewSet


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'arguments', ArgumentViewSet)
router.register(r'bigpictures', BigPictureViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
