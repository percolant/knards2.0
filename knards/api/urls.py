from django.urls import path
from . import views

urlpatterns = [
    path('cards/', views.CardsList.as_view()),
    path('cards/<int:pk>/', views.CardDetail.as_view()),
    path('cards-rendered/', views.CardsRenderedList.as_view()),
    path('cards-rendered/<int:pk>/', views.CardRenderedDetail.as_view()),
    path('tags/', views.TagsList.as_view()),
    path('tags/<int:pk>/', views.TagDetail.as_view()),
    path('entries/', views.EntriesList.as_view()),
    path('entries/<int:pk>/', views.EntryDetail.as_view()),
    path('entry-types/', views.EntryTypesList.as_view()),
    path('entry-types/<int:pk>/', views.EntryTypeDetail.as_view()),
    path('rules/', views.RulesList.as_view()),
    path('rules/<int:pk>/', views.RuleDetail.as_view()),
    path('scores/', views.ScoresList.as_view()),
    path('scores/<int:pk>/', views.ScoreDetail.as_view()),
]
