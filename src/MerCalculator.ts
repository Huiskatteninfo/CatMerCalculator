export type MerTranslations = {
    Weight: string,
    Age: string,
    '0-4 months': string,
    '4-9 months': string,
    '9-12 months': string,
    '>12 months': string,
    Activity: string,
    Active: string,
    'Not Active/Indoor Cat': string,
    Peculiarities: string,
    None: string,
    Neutered: string,
    Gestating: string,
    Lactating: string,
    'Number of Kittens': string,
    'Recommended calories': string,
    'Week of lactation': string,
    'Weeks 1-2': string,
    'Weeks 3-4': string,
    'Week 5':'Week 5',
    'Week 6':'Week 6',
    'Week 7':'Week 7'
}

export class MerCalculator {
    /**
     * Calculates the daily energy requirements for a queen cat based on her weight, gestation period, lactation period, and number of kittens
     * @param {number} weight - The weight of the queen cat in kilograms
     * @param {boolean} gestation - Whether or not the queen cat is in gestation (true or false). If false, cat is in Lactation
     * @param {number} numberKittens - The number of kittens the queen cat is lactating
     * @param {number} lactationWeek - The week of lactation
     * @returns {number} - The daily energy requirements of the queen cat in kcal
     */
    public calculateQueenEnergy(
        weight: number,
        gestation: boolean=true,
        numberKittens: number=0,
        lactationWeek: number=6
    ): number {
        let energyRequirement = 0;
    
        // Calculate the energy requirements during gestation if applicable
        if (gestation) {
            energyRequirement += weight ** 0.67 * 140;
        }
        // Calculate the energy requirements during lactation if applicable
        else {
            let l = 1;
            if(lactationWeek <= 2) {
                l = 0.9
            } else if(lactationWeek <= 4) {
                l = 1.2
            } else if(lactationWeek <= 5) {
                l = 1.1
            } else if (lactationWeek <= 6) {
                l = 1
            } else {
                l = 0.8
            }

            if (numberKittens < 3) {
                energyRequirement += weight ** 0.67 * 100 + 18 * weight * l;
            } else if (numberKittens >= 3 && numberKittens <= 4) {
                energyRequirement += weight ** 0.67 * 100 + 60 * weight * l;
            } else if (numberKittens > 4) {
                energyRequirement += weight ** 0.67 * 100 + 70 * weight * l;
            }
        }
    
        return energyRequirement;
    }
    
    /**
     * Calculates the daily energy requirements for a cat based on its weight, neutered status, indoor lifestyle, and activity level
     * @param {number} weight - The weight of the cat in kilograms
     * @param {boolean} neutered - Whether or not the cat is neutered (true or false)
     * @param {number} age - Age of cats in months, for adult cats (> 12 months) the number does not affect the outcome
     * @param {boolean} isActive - Whether or not the cat is active (true or false) In case of indoor cat use false
     * @returns {number} - The daily energy requirements of the cat in kcal
     */
    public calculateEnergyRequirements(
        weight: number,
        age: number,
        neutered: boolean=true,
        isActive: boolean=true
    ): number {
        let energyRequirement = 0;
    
        // Calculate the energy requirements for indoor and/or neutered cats
        if (!isActive || neutered) {
            energyRequirement = weight ** 0.67 * 75;
        } else {
            energyRequirement = weight ** 0.67 * 100;
        }
    
        if(age < 4) {
            energyRequirement *= 2;
        }
        else if(age < 9) {
            energyRequirement *= 1.75;
        }
        else if(age < 12) {
            energyRequirement *= 1.5;
        }
        return energyRequirement;
    }

    /**
     * Creates and displays a form for calculating the daily energy requirements of a cat.
     * The form allows the user to input the cat's weight, age, activity level, and any peculiarities (e.g., neutered, gestating, lactating).
     * Based on the input values, the function calculates and displays the recommended daily energy requirements for the cat.
     *
     * @param {HTMLElement} element - The HTML element where the form will be displayed.
     * @param {Object} translations - (Optional) An object containing translated text for form labels and messages.
     *                                If not provided, English translations will be used.
     * @param {string|undefined}    - The HTML to display at the footer of the form, default to creditation link
     * @returns {Object} - An object containing references to the form elements for further manipulation, such as retrieving user inputs or updating the displayed recommendations.
     */
    public createCatEnergyForm(element:HTMLElement, translations:MerTranslations|undefined=undefined,
        footerHtml:string|undefined = 'Cat MER Calculator by <a href="https://huiskatteninfo.nl/software/cat-mer-calculator/en/" target="_blank" class="cat-mer-credits">HuiskattenInfo.nl</a>') {
        if(translations === undefined) {
            translations = this.TRANSLATIONS_EN;
        }
        const weightDefault = 4;
        const ageOptions = [
          { value: '0-4', label: translations['0-4 months'] },
          { value: '4-9', label: translations['4-9 months'] },
          { value: '9-12', label: translations['9-12 months'] },
          { value: '>12', label: translations['>12 months'] },
        ];
        const activityOptions = [
          { value: 'active', label: translations['Active'] },
          { value: 'not-active', label: translations['Not Active/Indoor Cat'] },
        ];
        const peculiaritiesOptions = [
          { value: 'none', label: translations['None'] },
          { value: 'neutered', label: translations['Neutered'] },
          { value: 'gestating', label: translations['Gestating'] },
          { value: 'lactating', label: translations['Lactating'] },
        ];
        const LactationWeekOptions = [
            { value: '1-2', label: translations['Weeks 1-2'] },
            { value: '3-4', label: translations['Weeks 3-4'] },
            { value: '5', label: translations['Week 5'] },
            { value: '6', label: translations['Week 6'] },
            { value: '7', label: translations['Week 7'] },
        ]
      
        // Function to calculate and update the recommended calories
        const updateRecommendedCalories = () => {
          const weight = parseFloat(weightInput.value);
          const age = ageSelect.value;
          const activity = activitySelect.value;
          const peculiarities = peculiaritiesSelect.value;
          const numberKittens = parseInt(numberKittensInput.value);
          const lactationWeek = LactationWeekSelect.value;
      
          let recommendedCalories = 0;
      
          if (peculiarities === 'lactating') {
            const lactationWeekNr = parseInt(lactationWeek.charAt(0))
            recommendedCalories = this.calculateQueenEnergy(weight, false, numberKittens, lactationWeekNr);
          } 
          else if(peculiarities === 'gestating') {
            recommendedCalories = this.calculateQueenEnergy(weight, true)
          }
          else {
            // Mapping age options to numbers
            const ageMap = {
                '0-4': 0,
                '4-9': 4,
                '9-12': 9,
                '>12': 12,
            } as { [key: string]: number };
            const ageInMonths = ageMap[age];
            recommendedCalories = this.calculateEnergyRequirements(weight, ageInMonths, peculiarities==='neutered', activity==='active');
          }
      
          recommendedCaloriesSpan.textContent = recommendedCalories.toFixed(0);
        }
      
        // Create the weight input field
        const weightDiv = document.createElement('div');
        const weightLabel = document.createElement('label');
        weightLabel.textContent = translations['Weight'] + ': ';
        const weightInput = document.createElement('input');
        weightInput.type = 'number';
        weightInput.value = weightDefault+"";
        weightInput.min = "0";
        weightInput.addEventListener('input', updateRecommendedCalories);
        weightDiv.appendChild(weightLabel);
        weightDiv.appendChild(weightInput);
        element.appendChild(weightDiv);
      
        // Create the age select field
        const ageDiv = document.createElement('div');
        const ageLabel = document.createElement('label');
        ageLabel.textContent = translations['Age'] + ': ';
        const ageSelect = document.createElement('select');
        ageOptions.forEach((option) => {
          const ageOption = document.createElement('option');
          ageOption.value = option.value;
          ageOption.textContent = option.label;
          ageSelect.appendChild(ageOption);
        });
        ageSelect.addEventListener('change', updateRecommendedCalories);
        ageSelect.value = ">12";
        ageDiv.appendChild(ageLabel);
        ageDiv.appendChild(ageSelect);
        element.appendChild(ageDiv);
      
        // Create the activity select field
        const activityDiv = document.createElement('div');
        const activityLabel = document.createElement('label');
        activityLabel.textContent = translations['Activity'] + ': ';
        const activitySelect = document.createElement('select');
        activityOptions.forEach((option) => {
          const activityOption = document.createElement('option');
          activityOption.value = option.value;
          activityOption.textContent = option.label;
          activitySelect.appendChild(activityOption);
        });
        activitySelect.addEventListener('change', updateRecommendedCalories);
        activityDiv.appendChild(activityLabel);
        activityDiv.appendChild(activitySelect);
        activityDiv.appendChild(activitySelect);
        element.appendChild(activityDiv);
        
        // Create the peculiarities select field
        const peculiaritiesDiv = document.createElement('div');
        const peculiaritiesLabel = document.createElement('label');
        peculiaritiesLabel.textContent = translations['Peculiarities'] + ': ';
        const peculiaritiesSelect = document.createElement('select');
        peculiaritiesOptions.forEach((option) => {
        const peculiaritiesOption = document.createElement('option');
        peculiaritiesOption.value = option.value;
        peculiaritiesOption.textContent = option.label;
        peculiaritiesSelect.appendChild(peculiaritiesOption);
        });
        peculiaritiesSelect.addEventListener('change', updateRecommendedCalories);
        peculiaritiesDiv.appendChild(peculiaritiesLabel);
        peculiaritiesDiv.appendChild(peculiaritiesSelect);
        element.appendChild(peculiaritiesDiv);
        
        // Create the number of kittens input field
        const numberKittensDiv = document.createElement('div');
        const numberKittensLabel = document.createElement('label');
        numberKittensLabel.textContent = translations['Number of Kittens'] + ': ';
        const numberKittensInput = document.createElement('input');
        numberKittensInput.type = 'number';
        numberKittensInput.value = "4";
        numberKittensInput.min = "1";
        numberKittensInput.addEventListener('input', updateRecommendedCalories);
        numberKittensDiv.appendChild(numberKittensLabel);
        numberKittensDiv.appendChild(numberKittensInput);
        element.appendChild(numberKittensDiv);

        // Create the kitten age select field
        const LactationWeekDiv = document.createElement('div');
        const LactationWeekLabel = document.createElement('label');
        LactationWeekLabel.textContent = translations['Week of lactation'] + ': ';
        const LactationWeekSelect = document.createElement('select');
        LactationWeekOptions.forEach((option) => {
            const LactationWeekOption = document.createElement('option');
            LactationWeekOption.value = option.value;
            LactationWeekOption.textContent = option.label;
            LactationWeekSelect.appendChild(LactationWeekOption);
        });
        LactationWeekSelect.addEventListener('change', updateRecommendedCalories);
        LactationWeekDiv.appendChild(LactationWeekLabel);
        LactationWeekDiv.appendChild(LactationWeekSelect);
        element.appendChild(LactationWeekDiv);
        
        // Create the recommended calories display
        const recommendedCaloriesDiv = document.createElement('div');
        const recommendedCaloriesText = document.createElement('span');
        recommendedCaloriesText.textContent = translations['Recommended calories'] + ': ';
        const recommendedCaloriesSpan = document.createElement('span');
        recommendedCaloriesDiv.appendChild(recommendedCaloriesText);
        recommendedCaloriesDiv.appendChild(recommendedCaloriesSpan);
        recommendedCaloriesDiv.append(" Kcal");
        element.appendChild(recommendedCaloriesDiv);

        if(footerHtml) {
            const footerHtmlDiv = document.createElement('div');
            footerHtmlDiv.innerHTML = footerHtml;
            element.appendChild(footerHtmlDiv);
        }

        // show or hide number of kittens and lactation week based on peculiariities
        peculiaritiesSelect.addEventListener('change', () => {
            LactationWeekDiv.hidden = peculiaritiesSelect.value !== 'lactating'
            numberKittensDiv.hidden = peculiaritiesSelect.value !== 'lactating'
        })
        peculiaritiesSelect.dispatchEvent(new Event('change'))
        
        // Initialize the recommended calories
        updateRecommendedCalories();
        return {
            weight: weightInput,
            age: ageSelect,
            activity: activitySelect,
            peculiarities: peculiaritiesSelect,
            numberKittens: numberKittensInput,
            LactationWeek: LactationWeekSelect,
            recommendedCalories: recommendedCaloriesSpan
        }
    }
        
    public TRANSLATIONS_EN : MerTranslations = {
        Weight: 'Weight',
        Age: 'Age',
        '0-4 months': '0-4 months',
        '4-9 months': '4-9 months',
        '9-12 months': '9-12 months',
        '>12 months': '>12 months',
        Activity: 'Activity',
        Active: 'Active',
        'Not Active/Indoor Cat': 'Not Active/Indoor Cat',
        Peculiarities: 'Peculiarities',
        None: 'None',
        Neutered: 'Neutered',
        Gestating: 'Gestating',
        Lactating: 'Lactating',
        'Number of Kittens': 'Number of Kittens',
        'Recommended calories': 'Recommended calories',
        'Week of lactation': 'Week of lactation',
        'Weeks 1-2': 'Weeks 1-2',
        'Weeks 3-4': 'Weeks 3-4',
        'Week 5':'Week 5',
        'Week 6':'Week 6',
        'Week 7':'Week 7'
    };
      
}