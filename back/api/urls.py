from django.urls import include, path
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token

from api.views.users import UserViewSet, GroupViewSet, AuthViewSet
from api.views.bigpictures import BigPictureViewSet, SubjectViewSet
from api.views.ratings import RatingViewSet

from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'auth', AuthViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'bigpictures', BigPictureViewSet)
router.register(r'subjects', SubjectViewSet)
router.register(r'ratings', RatingViewSet)

urlpatterns = [
    path('api/token-auth/', obtain_jwt_token),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
