from rest_framework.views import APIView
from rest_framework import status
from django.db import transaction
from core.response import success_response, error_response
from .models import Student
from .serializers import StudentSerializer
from core.pagination import MyCustomPagination
from rest_framework.permissions import IsAuthenticated

class StudentCreateView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            with transaction.atomic():
                name = request.data.get("name")
                subject = request.data.get("subject_name")
                mark = request.data.get("marks")

                if not all([name, subject, mark]):
                    return error_response("All fields are required", status=status.HTTP_400_BAD_REQUEST)

                existing_student = Student.objects.filter(name=name, subject_name=subject).first()

                if existing_student:
                    existing_student.marks = int(mark)
                    existing_student.save()
                    serializer = StudentSerializer(existing_student)
                    return success_response("Student record updated", serializer.data, status=status.HTTP_200_OK)

                else:
                    serializer = StudentSerializer(data=request.data)
                    if serializer.is_valid():
                        serializer.save()
                        return success_response("Student created successfully", serializer.data, status=status.HTTP_201_CREATED)
                    else:
                        return error_response("Validation failed", serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return error_response("Error while processing student entry", str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class StudentListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        try:
            students = Student.objects.all().order_by('-id')
            paginator = MyCustomPagination()
            paginated_qs = paginator.paginate_queryset(students, request)
            serializer = StudentSerializer(paginated_qs, many=True)
            return paginator.get_paginated_response(serializer.data)

        except Exception as e:
              return error_response("Error while fetch student", str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)