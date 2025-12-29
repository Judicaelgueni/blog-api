from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from .models import Profile




class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Vérification username
        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Nom d’utilisateur déjà utilisé"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Création utilisateur + profil + token
        user = User.objects.create_user(username=username, password=password)
        Profile.objects.create(user=user)
        Token.objects.create(user=user)

        return Response({"message": "Utilisateur créé"}, status=status.HTTP_201_CREATED)
    
from rest_framework.permissions import IsAuthenticated
class DeleteMyAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        request.user.delete()
        return Response(
            {"detail": "Compte et articles supprimés"},
            status=status.HTTP_204_NO_CONTENT
        )
    
#nouvel ajout


from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from .serializers import ProfileSerializer

class MyProfileView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        serializer = ProfileSerializer(request.user.profile)
        return Response(serializer.data)

    def patch(self, request):
        serializer = ProfileSerializer(
            request.user.profile,
            data=request.data,
            partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
