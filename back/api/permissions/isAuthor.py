
from rest_framework import permissions


class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow authors of an object to edit it.
    """
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS or (request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        return request.method in permissions.SAFE_METHODS or (obj.author == request.user or request.user.is_staff)
