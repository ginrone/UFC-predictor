from django import forms

class fighterForm(forms.Form):
    fighter1 = forms.CharField(max_length=100)
    fighter2 = forms.CharField(max_length=100)