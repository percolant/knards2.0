import time
import json
from django.core.paginator import Paginator
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from api.models import (
    Card,
    Tag,
    Entry,
    EntryType,
    Score,
    Rule
)
from api.serializers import (
    CardsSerializer,
    CardsRenderedSerializer,
    TagsSerializer,
    EntriesSerializer,
    EntryTypesSerializer,
    RulesSerializer,
    ScoresSerializer
)


class CardsList(APIView):
    def get(self, request):
        cards = Card.objects.all()
        for card in cards:
            card.entries.set(Entry.objects.filter(card=card.pk))
        serializer = CardsSerializer(cards, many=True)

        return Response(serializer.data)

    def post(self, request):
        tag_ids = []
        for tag in request.data['tags']:
            try:
                tag = Tag.objects.get(tag_name=tag)
                tag_ids.append(tag.id)
            except Tag.DoesNotExist:
                serializer = TagsSerializer(data=tag)
                if serializer.is_valid():
                    serializer.save()
                    tag_ids.append(serializer.data.id)
            else:
                continue

        request.data['tags'] = tag_ids
        serializer = CardsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(
                user=request.user
            )
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CardsRenderedList(APIView):
    def get(self, request):
        cards = Card.objects.all()
        for card in cards:
            card.entries.set(Entry.objects.filter(card=card.pk))
        serializer = CardsRenderedSerializer(cards, many=True)

        return Response(serializer.data)

    def put(self, request):
        tags_included = request.data['tags_included']
        tags_excluded = request.data['tags_excluded']
        tags_included_strict = request.data['tags_included_strict']

        tags_included_ids = Tag.objects.filter(tag_name__in=tags_included).values('id')
        tags = [tag for tag in tags_included_ids]
        tags_included_list = []
        for tag in tags:
            tags_included_list.append(tag['id'])
        tags_excluded_ids = Tag.objects.filter(tag_name__in=tags_excluded).values('id')
        tags = [tag for tag in tags_excluded_ids]
        tags_excluded_list = []
        for tag in tags:
            tags_excluded_list.append(tag['id'])
        tags_included_strict_ids = Tag.objects.filter(tag_name__in=tags_included_strict).values('id')
        tags = [tag for tag in tags_included_strict_ids]
        tags_included_strict_list = []
        for tag in tags:
            tags_included_strict_list.append(tag['id'])

        cards = Card.objects.all()
        if not tags_included_strict:
            if tags_included:
                cards = cards.filter(tags__in=tags_included_list).distinct()
            if tags_excluded:
                cards = cards.exclude(tags__in=tags_excluded_list).distinct()
        else:
            if tags_included:
                for tag in tags_included_list:
                    cards = cards | cards.filter(tags__id__contains=tag)
            if tags_excluded:
                cards = cards.exclude(tags__in=tags_excluded_list).distinct()
            if tags_included_strict:
                for tag in tags_included_strict_list:
                    cards = cards.filter(tags__id__contains=tag).distinct()

        if request.data['date_create_from']:
            cards = cards.filter(create_date__gte=time.strftime(request.data['date_create_from'])).distinct()
        if request.data['date_create_to']:
            cards = cards.filter(create_date__lte=time.strftime(request.data['date_create_to'])).distinct()
        if request.data['date_edit_from']:
            cards = cards.filter(create_date__gte=time.strftime(request.data['date_edit_from'])).distinct()
        if request.data['date_edit_to']:
            cards = cards.filter(create_date__lte=time.strftime(request.data['date_edit_to'])).distinct()

        if request.data['mode'] == 'list':
            if request.data['sort'] == 'create_date_desc':
                cards = cards.order_by('-create_date')
            if request.data['sort'] == 'create_date_asc':
                cards = cards.order_by('create_date')
            if request.data['sort'] == 'edit_date_desc':
                cards = cards.order_by('-update_date')
            if request.data['sort'] == 'edit_date_asc':
                cards = cards.order_by('update_date')

            p = Paginator(cards, 10)
            serializer = CardsRenderedSerializer(p.page(request.data['page']).object_list, many=True)
            if p.page(request.data['page']).has_next():
                return Response(serializer.data, status=status.HTTP_206_PARTIAL_CONTENT)
            else:
                return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.data['mode'] == 'revise-settings':
            for card in cards:
                card.score.set(Score.objects.filter(card=card.pk, user=request.user.id))
            serializer = CardsRenderedSerializer(cards, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.data['mode'] == 'revise-run':
            for card in cards:
                card.score.set(Score.objects.filter(card=card.pk, user=request.user.id))
            cards = cards.order_by('score__is_right', 'score__revise_date')
            p = Paginator(cards, 1)
            serializer = CardsRenderedSerializer(cards, many=True)
            if p.page(request.data['page']).has_next():
                return Response(serializer.data, status=status.HTTP_206_PARTIAL_CONTENT)
            else:
                return Response(serializer.data, status=status.HTTP_200_OK)


class CardDetail(APIView):
    def get(self, request, pk):
        try:
            card = Card.objects.get(pk=pk)
        except Card.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        card = Card.objects.get(pk=pk)
        card.entries.set(Entry.objects.filter(card=pk))
        serializer = CardsSerializer(card)

        return Response(serializer.data)

    def put(self, request, pk):
        try:
            card = Card.objects.get(pk=pk)
        except Card.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        tag_ids = []
        for tag in request.data['tags']:
            try:
                tag = Tag.objects.get(tag_name=tag)
                tag_ids.append(tag.id)
            except Tag.DoesNotExist:
                serializer = TagsSerializer(data=tag)
                if serializer.is_valid():
                    serializer.save()
                    tag_ids.append(serializer.data.id)
            else:
                continue

        request.data['tags'] = tag_ids

        serializer = CardsSerializer(card, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            card = Card.objects.get(pk=pk)
        except Card.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        card.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CardRenderedDetail(APIView):
    def get(self, request, pk):
        try:
            card = Card.objects.get(pk=pk)
        except Card.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        card = Card.objects.get(pk=pk)
        card.entries.set(Entry.objects.filter(card=pk).order_by('order'))
        serializer = CardsRenderedSerializer(card)

        return Response(serializer.data)


class TagsList(APIView):
    def get(self, request):
        tags = Tag.objects.all()
        serializer = TagsSerializer(tags, many=True)

        return Response(serializer.data)

    def post(self, request):
        tag_ids = []
        for tag in request.data['tags']:
            try:
                tag_id = Tag.objects.get(tag_name=tag)
                tag_ids.append(tag_id.id)
            except Tag.DoesNotExist:
                data = {"tag_name": tag}
                serializer = TagsSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    tag_ids.append(serializer.data['id'])
            else:
                continue
        if 'card_id' in request.data:
            if request.data['card_id']:
                card = Card.objects.get(pk=request.data['card_id'])
                card.tags.set(tag_ids)
                card.save()
                # return Response(status=status.HTTP_207_MULTI_STATUS)
        # else:
        resp = {}
        return Response(json.dumps(resp), status=status.HTTP_200_OK)

    def put(self, request):
        try:
            tag = Tag.objects.get(tag_name=request.data['tag_text'])
        except Tag.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            Card.objects.filter(tags=tag.id)
        except Card.DoesNotExist:
            Tag.objects.filter(pk=tag.id).delete()

        return Response(status=status.HTTP_200_OK)


class TagDetail(APIView):
    def get(self, request, pk):
        try:
            tag = Tag.objects.get(pk=pk)
        except Tag.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        tag = Tag.objects.get(pk=pk)
        serializer = TagsSerializer(tag)

        return Response(serializer.data)

    def put(self, request, pk):
        try:
            tag = Tag.objects.get(pk=pk)
        except Tag.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = TagsSerializer(tag, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            tag = Tag.objects.get(pk=pk)
        except Tag.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = TagsSerializer(tag, many=False)

        taglist = []
        taglist.append(pk)
        cards = Card.objects.filter(tags__in=taglist).distinct()
        if cards:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            tag.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


class EntriesList(APIView):
    def get(self, request):
        entries = Entry.objects.all()
        serializer = EntriesSerializer(entries, many=True)

        return Response(serializer.data)

    def post(self, request):
        serializer = EntriesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EntryDetail(APIView):
    def get(self, request, pk):
        try:
            entry = Entry.objects.get(pk=pk)
        except Entry.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        entry = Entry.objects.get(pk=pk)
        serializer = EntriesSerializer(entry)

        return Response(serializer.data)

    def put(self, request, pk):
        try:
            entry = Entry.objects.get(pk=pk)
        except Entry.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = EntriesSerializer(entry, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            entry = Entry.objects.get(pk=pk)
        except Entry.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class EntryTypesList(APIView):
    def get(self, request):
        entry_types = EntryType.objects.all()
        serializer = EntryTypesSerializer(entry_types, many=True)

        return Response(serializer.data)

    # uncomment when adding a new entry type
    # def post(self, request):
    #     serializer = EntryTypesSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EntryTypeDetail(APIView):
    def get(self, request, pk):
        try:
            entry_type = EntryType.objects.get(pk=pk)
        except EntryType.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        entry_type = EntryType.objects.get(pk=pk)
        serializer = EntryTypesSerializer(entry_type)

        return Response(serializer.data)

    # uncomment to edit an entry type
    # def put(self, request, pk):
    #     try:
    #         entry_type = EntryType.objects.get(pk=pk)
    #     except EntryType.DoesNotExist:
    #         return Response(status=status.HTTP_404_NOT_FOUND)
    #
    #     serializer = EntryTypesSerializer(entry_type, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # uncomment to delete an entry type
    # def delete(self, request, pk):
    #     try:
    #         entry_type = EntryType.objects.get(pk=pk)
    #     except EntryType.DoesNotExist:
    #         return Response(status=status.HTTP_404_NOT_FOUND)
    #
    #     entry_type.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)


class RulesList(APIView):
    def get(self, request):
        rules = Rule.objects.all()
        serializer = RulesSerializer(rules, many=True)

        return Response(serializer.data)

    def post(self, request):
        serializer = RulesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RuleDetail(APIView):
    def get(self, request, pk):
        try:
            rule = Rule.objects.get(pk=pk)
        except Rule.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        rule = Rule.objects.get(pk=pk)
        serializer = RulesSerializer(rule)

        return Response(serializer.data)

    def put(self, request, pk):
        try:
            rule = Rule.objects.get(pk=pk)
        except Rule.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = RulesSerializer(rule, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            rule = Rule.objects.get(pk=pk)
        except Rule.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        rule.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ScoresList(APIView):
    def get(self, request):
        scores = Score.objects.all()
        serializer = ScoresSerializer(scores, many=True)

        return Response(serializer.data)

    def post(self, request):
        serializer = ScoresSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(
                user=request.user
            )
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ScoreDetail(APIView):
    def get(self, request, pk):
        try:
            score = Score.objects.get(pk=pk)
        except Score.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        score = Score.objects.get(pk=pk)
        serializer = ScoresSerializer(score)

        return Response(serializer.data)

    def put(self, request, pk):
        try:
            score = Score.objects.get(pk=pk)
        except Score.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ScoresSerializer(score, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            score = Score.objects.get(pk=pk)
        except Score.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        score.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
