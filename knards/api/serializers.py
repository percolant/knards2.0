from rest_framework import serializers
from api.models import (
    Tag,
    Card,
    EntryType,
    Rule,
    Entry,
    Score
)
from django.contrib.auth.models import User


class TagsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = (
            'id',
            'tag_name',
        )


class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            # 'email',
            # 'first_name',
            # 'last_name',
            # 'is_active',
            # 'is_staff'
        )


class EntryTypesSerializer(serializers.ModelSerializer):

    class Meta:
        model = EntryType
        fields = (
            'id',
            'type_name'
        )


class RulesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rule
        fields = (
            'id',
            'description'
        )


class EntriesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Entry
        fields = (
            'id',
            'content',
            'card',
            'type',
            'hint',
            'rule',
            'order'
        )


class ScoresSerializer(serializers.ModelSerializer):

    class Meta:
        model = Score
        fields = (
            'id',
            'card',
            'user',
            'revise_date',
            'is_right'
        )


class CardsSerializer(serializers.ModelSerializer):
    entries = EntriesSerializer(many=True, required=False)

    class Meta:
        model = Card
        fields = (
            'id',
            'user',
            'title',
            'create_date',
            'update_date',
            'is_private',
            'is_creator_hidden',
            'tags',
            'count_seen',
            'count_know',
            'entries'
        )


class CardsRenderedSerializer(serializers.ModelSerializer):
    entries = EntriesSerializer(many=True, required=False)
    tags = TagsSerializer(many=True, required=False)
    user = UsersSerializer(many=False, required=True)
    score = ScoresSerializer(many=True, required=False)

    class Meta:
        model = Card
        fields = (
            'id',
            'user',
            'title',
            'create_date',
            'update_date',
            'is_private',
            'is_creator_hidden',
            'tags',
            'count_seen',
            'count_know',
            'entries',
            'score'
        )
