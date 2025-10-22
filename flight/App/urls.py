from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('api/auth/login/', views.CustomLoginView.as_view(), name='login'),
    path('api/auth/register/', views.RegisterView.as_view(), name='register'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/flights/', views.flight_list, name='flight_list'),
    path('api/flights/<int:pk>/', views.flight_detail, name='flight_detail'),
    path('api/search/', views.search_flights, name='search_flights'),

    path('api/bookings/create/', views.create_booking, name='create_booking'),
    path('api/bookings/my/', views.user_bookings, name='user_bookings'),
    path('api/bookings/<int:pk>/cancel/', views.cancel_booking, name='cancel_booking'),
    path('api/admin/users/', views.admin_user_list, name='admin_user_list'),
    path('api/admin/users/<int:pk>/', views.admin_user_detail, name='admin_user_detail'),
    path('api/users/', views.get_pending_users, name='get_users'),
    path('api/users/<int:user_id>/approve/', views.approve_user, name='approve_user'),
    path('api/users/<int:user_id>/reject/', views.reject_user, name='reject_user'),
]
