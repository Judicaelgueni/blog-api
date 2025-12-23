from rest_framework import serializers
from .models import Article
from django.contrib.auth.models import User

class ArticleSerializer(serializers.ModelSerializer):
    auteur = serializers.ReadOnlyField(source='auteur.username')
    image = serializers.ImageField(required=False)

    class Meta:
        model = Article
        fields = "__all__"
