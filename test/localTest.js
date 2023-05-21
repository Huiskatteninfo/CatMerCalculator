document.addEventListener("DOMContentLoaded", () => {
    // Get the form container element
    const formContainer = document.getElementById('form-container');
    const merCalculator = new MerCalculator.MerCalculator();

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
        Lactating: 'Lacterende kat',
        'Number of Kittens': 'Aantal Kittens',
        'Recommended calories': 'Aanbevolen calorieën per dag',
        'Week of lactation': 'Week van lactatie',
        'Weeks 1-2': 'Week 1-2',
        'Weeks 3-4': 'Week 3-4',
        'Week 5':'Week 5',
        'Week 6':'Week 6',
        'Week 7':'Week 7',
    };
    // Create the cat energy form
    if(formContainer != null)
        merCalculator.createCatEnergyForm(formContainer, TRANSLATIONS_NL, "");
});