from django.contrib import admin
from api.models import (
    Card,
    Tag,
    Entry,
    EntryType,
    Score,
    Rule
)

# Register your models here.
admin.site.register(Card)
admin.site.register(Tag)
admin.site.register(Entry)
admin.site.register(EntryType)
admin.site.register(Score)
admin.site.register(Rule)
