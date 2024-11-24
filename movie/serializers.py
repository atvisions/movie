#引入serializers
from rest_framework import serializers
from .models import Movie,Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'  

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'  
        #fields = ['id','movie_name'] #指定字段 