from api.models import BigPicture, BaseUser
from api.serializers import BigPictureSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class SubjectsPage(APIView):

    def get(self, request, format=None):
        subjects = BigPicture.objects.filter(kind=SUBJECT_CODE).order_by('-modification_date')
        serializer = BigPictureSerializer(subjects, many=True)
        return Response(serializer.data)
