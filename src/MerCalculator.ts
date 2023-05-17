export class MerCalculator {
    /**
     * Calculates the daily energy requirements for a queen cat based on her weight, gestation period, lactation period, and number of kittens
     * @param {number} weight - The weight of the queen cat in kilograms
     * @param {boolean} gestation - Whether or not the queen cat is in gestation (true or false). If false, cat is in Lactation
     * @param {number} numberKittens - The number of kittens the queen cat is lactating
     * @returns {number} - The daily energy requirements of the queen cat in kcal
     */
    public calculateQueenEnergy(
        weight: number,
        gestation: boolean=true,
        numberKittens: number=0
    ): number {
        let energyRequirement = 0;
    
        // Calculate the energy requirements during gestation if applicable
        if (gestation) {
            energyRequirement += weight ** 0.67 * 140;
        }
    
        // Calculate the energy requirements during lactation if applicable
        else {
        if (numberKittens < 3) {
            energyRequirement += weight ** 0.67 * 100 + 18 * weight * numberKittens;
        } else if (numberKittens >= 3 && numberKittens <= 4) {
            energyRequirement += weight ** 0.67 * 100 + 60 * weight * numberKittens;
        } else if (numberKittens > 4) {
            energyRequirement += weight ** 0.67 * 100 + 70 * weight * numberKittens;
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
     * @returns {Object} - An object containing references to the form elements for further manipulation, such as retrieving user inputs or updating the displayed recommendations.
     */
    public createCatEnergyForm(element:HTMLElement, translations:any=undefined) {
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
      
        // Function to calculate and update the recommended calories
        const updateRecommendedCalories = () => {
          const weight = parseFloat(weightInput.value) || weightDefault;
          const age = ageSelect.value;
          const activity = activitySelect.value;
          const peculiarities = peculiaritiesSelect.value;
          const numberKittens = parseInt(numberKittensInput.value) || 4;
      
          let recommendedCalories = 0;
      
          if (peculiarities === 'lactating') {
            recommendedCalories = this.calculateQueenEnergy(weight, false, numberKittens);
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
        numberKittensInput.value = 4+"";
        numberKittensInput.addEventListener('input', updateRecommendedCalories);
        numberKittensDiv.appendChild(numberKittensLabel);
        numberKittensDiv.appendChild(numberKittensInput);
        element.appendChild(numberKittensDiv);

        // show or hide number of kittens based on peculiariities
        numberKittensDiv.hidden = true;
        peculiaritiesSelect.addEventListener('change', () => {
            numberKittensDiv.hidden = peculiaritiesSelect.value !== 'lactating'
        })
        
        // Create the recommended calories display
        const recommendedCaloriesDiv = document.createElement('div');
        const recommendedCaloriesText = document.createElement('span');
        recommendedCaloriesText.textContent = translations['Recommended calories'] + ': ';
        const recommendedCaloriesSpan = document.createElement('span');
        recommendedCaloriesDiv.appendChild(recommendedCaloriesText);
        recommendedCaloriesDiv.appendChild(recommendedCaloriesSpan);
        recommendedCaloriesDiv.append(" Kcal");
        element.appendChild(recommendedCaloriesDiv);
        
        // Initialize the recommended calories
        updateRecommendedCalories();
        return {
            weight: weightInput,
            age: ageSelect,
            activity: activitySelect,
            peculiarities: peculiaritiesSelect,
            numberKittens: numberKittensInput,
            recommendedCalories: recommendedCaloriesSpan
        }
    }
        
    public TRANSLATIONS_EN = {
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
    };
      
}