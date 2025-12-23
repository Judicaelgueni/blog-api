from django.db import models
from django.contrib.auth.models import User


class Article(models.Model):
    titre = models.CharField(max_length=200)
    contenu = models.TextField()
    image = models.ImageField(
        upload_to="articles/",
        null=True,
        blank=True
    )
    auteur = models.ForeignKey(User, on_delete=models.CASCADE, related_name='articles')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titre
