from django.urls import path
from .views import StudentCreateView,StudentListView

urlpatterns = [
    path('create-student', StudentCreateView.as_view(), name='create-student'),
    path('list-student', StudentListView.as_view(), name='list-student'),
]
