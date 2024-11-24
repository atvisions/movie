from rest_framework import viewsets
from .models import Movie,Category
from .serializers import MovieSerializer,CategorySerializer

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()  # 指定数据集
    serializer_class = MovieSerializer  # 指定序列化器

class CategaryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()  # 指定数据集
    serializer_class = CategorySerializer  # 指定序列化器