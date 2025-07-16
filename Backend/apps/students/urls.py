from django.urls import path
from .views import StudentCreateView,StudentListView,StudentEditView,StudentDeleteView

urlpatterns = [
    path('create-student', StudentCreateView.as_view(), name='create-student'),
    path('list-student', StudentListView.as_view(), name='list-student'),
    path('update-student/<int:id>', StudentEditView.as_view(), name='update-student'),
    path('delete-student/<int:id>', StudentDeleteView.as_view(), name='delete-student'),
]
