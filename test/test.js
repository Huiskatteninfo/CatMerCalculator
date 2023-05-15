// Get the form container element
const formContainer = document.getElementById('form-container');
const merCalculator = new MerCalculator();

TRANSLATIONS_NL = {
    Weight: 'Gewicht',
    Age: 'Leeftijd',
    '0-4 months': '0 tot 4 maanden',
    '4-9 months': '4 tot 9 maanden',
    '9-12 months': '9 tot 12 maanden',
    '>12 months': 'Meer dan 12 maanden',
    Activity: 'Activiteit',
    Active: 'Actief',
    'Not Active/Indoor Cat': 'Niet actief / Binnen kat',
    Peculiarities: 'Bijzonderheden',
    None: 'Geen',
    Neutered: 'Gecastreed',
    Gestating: 'Zwanger',
    Lactating: 'Laterende kat',
    'Number of Kittens': 'Aantal Kittens',
    'Recommended calories': 'Aanbevolen calorieën per dag',
};
// Create the cat energy form
if(formContainer != null)
    merCalculator.createCatEnergyForm(formContainer, TRANSLATIONS_NL);