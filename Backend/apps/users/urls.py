from django.urls import path
from .views import RegisterView, LoginView,SlidebarView,ListUsersView,EditUsersView,DeleteUserView

urlpatterns = [
    path('register', RegisterView.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
    path('slidebar', SlidebarView.as_view(), name='slidebar'),
    path('list-users', ListUsersView.as_view(), name='list-users'),
    path('edit-users/<int:id>', EditUsersView.as_view(), name='edit-users'),
    path('delete-users/<int:id>', DeleteUserView.as_view(), name='delete-users'),
]
