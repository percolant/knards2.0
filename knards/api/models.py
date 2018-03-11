from django.db import models
# from django.db.models.signals import post_save
from django.utils import formats
# from django.dispatch import receiver
# from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User


# @receiver(post_save, sender=User)
# def create_auth_token(sender, instance=None, created=False, **kwargs):
#     if created:
#         Token.objects.create(user=instance)


class Tag(models.Model):
    tag_name = models.CharField(max_length=70, blank=False)

    def __str__(self):
        return self.tag_name


class Card(models.Model):
    user = models.ForeignKey(User, default=1, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, blank=False, default="New Card")
    create_date = models.DateTimeField(auto_now=False, auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True, auto_now_add=False)
    is_private = models.BooleanField(default=False, blank=False)
    is_creator_hidden = models.BooleanField(default=False, blank=False)
    tags = models.ManyToManyField(Tag, blank=True)
    count_seen = models.IntegerField(blank=False, default=0)
    count_know = models.IntegerField(blank=False, default=0)

    def __str__(self):
        return "{}: Created on {}; Updated on {}; Creator: {}".format(
            self.title,
            formats.date_format(self.create_date, 'SHORT_DATETIME_FORMAT'),
            formats.date_format(self.update_date, 'SHORT_DATETIME_FORMAT'),
            self.user.get_full_name()
        )


class EntryType(models.Model):
    type_name = models.CharField(max_length=30, blank=False)

    def __str__(self):
        return self.type_name


class Rule(models.Model):
    description = models.CharField(max_length=200, blank=False)

    def __str__(self):
        return self.description


class Entry(models.Model):
    content = models.TextField(blank=True)
    card = models.ForeignKey(Card, on_delete=models.CASCADE, related_name='entries')
    type = models.ForeignKey(EntryType, on_delete=models.CASCADE)
    hint = models.CharField(max_length=255, blank=True)
    rule = models.ForeignKey(Rule, on_delete=models.CASCADE)
    order = models.IntegerField(blank=False, default=0)

    def __str__(self):
        return self.content


class Score(models.Model):
    card = models.ForeignKey(Card, on_delete=models.CASCADE, related_name='score')
    user = models.ForeignKey(User, default=1, on_delete=models.CASCADE)
    revise_date = models.DateTimeField(auto_now=True)
    is_right = models.BooleanField(default=False, blank=False)

    def __str__(self):
        return "{}: Revised by: {}. On {}.".format(
            self.card,
            self.user.get_full_name(),
            formats.date_format(self.revise_date, 'SHORT_DATETIME_FORMAT'),
        )
