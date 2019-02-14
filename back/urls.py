from django.urls import include, path
from rest_framework import routers
from views.users import UserViewSet, GroupViewSet
from views.elements import ElementViewSet
from views.arguments import ArgumentViewSet
from views.information import InformationViewSet
from views.problems import ProblemViewSet
from views.solutions import SolutionViewSet
from views.bigpictures import BigPictureViewSet


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'elements', ElementViewSet)
router.register(r'arguments', ArgumentViewSet)
router.register(r'information', InformationViewSet)
router.register(r'problems', ProblemViewSet)
router.register(r'solutions', SolutionViewSet)
router.register(r'bigpictures', BigPictureViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
