from rest_framework import viewsets
from .models import Movie,Category
from .serializers import MovieSerializer,CategorySerializer
from django_filters import rest_framework as filters

class Moviefilter(filters.FilterSet):
    movie_name = filters.CharFilter(lookup_expr='icontains')
    category = filters.NumberFilter()
    region = filters.NumberFilter()
    class Meta:
        module = Movie
        fields = ['movie_name','category','region']
class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()  # 指定数据集
    serializer_class = MovieSerializer  # 指定序列化器
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = Moviefilter

class CategaryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()  # 指定数据集
    serializer_class = CategorySerializer  # 指定序列化器