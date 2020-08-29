
from rest_framework import permissions


class IsAdmin(permissions.BasePermission):

  def has_permission(self, request, view):
    return request.user and request.user.is_staff


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS or (request.user and request.user.is_staff)
