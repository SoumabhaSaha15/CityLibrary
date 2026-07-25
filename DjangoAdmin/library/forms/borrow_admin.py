from django import forms
from ..models import Borrow
from django.utils import timezone


class BorrowAdminForm(forms.ModelForm):
    class Meta:
        model = Borrow
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if not self.instance.pk and "approved_at" in self.fields:
            self.initial["approved_at"] = timezone.now().date()
