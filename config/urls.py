from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls.static import static
from accounts.views import DeleteMyAccountView, MyProfileView, RegisterView




urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', obtain_auth_token),
    path('api/', include('blog.urls')),
    path('api/register/', RegisterView.as_view()),
    path("api/me/delete/", DeleteMyAccountView.as_view()),
    path('api/profile/', MyProfileView.as_view()),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
