from django.db import models

class Student(models.Model):
  class Subject(models.IntegerChoices):
    MATHS= 1, 'maths'
    ENGLISH = 2, 'english'
    HINDI = 3, 'hindi'
    SOCIAL =4,'social'
    PHYSICS =5,'physics'


  name = models.CharField(max_length=255)
  subject_name = models.IntegerField(choices=Subject.choices)
  marks = models.IntegerField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.name