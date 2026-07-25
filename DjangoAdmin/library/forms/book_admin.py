from django import forms
from ..models import Book
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout
# Fieldset, Row, Column, Submit


class BookAdminForm(forms.ModelForm):
    number_of_copies = forms.IntegerField(
        required=False,
        min_value=1,
        initial=1,
        label="Generate Copies",
        help_text="Specify how many physical copies to generate automatically.",
        # widget=
        widget=forms.NumberInput(
            attrs={
                # Explicitly binds the field into Unfold's internal Tailwind design utility block
                "class": "border border-base-200 bg-white font-medium min-w-20 placeholder-base-400 rounded-default shadow-xs text-font-default-light text-sm focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 group-[.errors]:border-red-600 focus:group-[.errors]:outline-red-600 dark:bg-base-900 dark:border-base-700 dark:text-font-default-dark dark:group-[.errors]:border-red-500 dark:focus:group-[.errors]:outline-red-500 dark:scheme-dark group-[.primary]:border-transparent disabled:!bg-base-50 dark:disabled:!bg-base-800 px-3 py-2 w-full max-w-2xl"
            }
        ),
    )

    class Meta:
        model = Book
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            "number_of_copies"
        )
        self.helper.form_tag = False  # Let Django Admin handle the <form> wrapper tag
