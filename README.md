# Cat MER Calculator

The Cat MER Calculator is a software library designed to calculate the daily energy requirements (MER - Maintenance Energy Requirements) for cats. It provides a set of functions and a user interface for estimating the calorie intake needed by cats based on various factors such as weight, age, activity level, neutered status, and specific conditions like gestation or lactation.

The calculations used in this library are based on the [Nutritional Guidelines of the FEDIAF (European Pet Food Industry Federation)](https://europeanpetfood.org/wp-content/uploads/2022/03/Updated-Nutritional-Guidelines.pdf). These guidelines serve as a reference for determining the appropriate energy requirements for cats.

## Features

- Calculate the daily energy requirements for a queen cat during gestation and lactation.
- Calculate the daily energy requirements for a cat based on its weight, age, neutered status, indoor lifestyle, and activity level.
- User-friendly form interface for inputting cat information and receiving recommended calorie intake (styling not included).
- Customizable translations for different languages and regions.

## Installation

```shell
npm install cat-mer-calculator
```

## Usage

```javascript
const { MerCalculator } = require('cat-mer-calculator');

// Create an instance of the calculator
const calculator = new MerCalculator();

// Example 1: Calculate the energy requirements for a queen cat
const queenEnergy = calculator.calculateQueenEnergy(4.5, true, true, 5);
console.log('Queen Energy Requirements:', queenEnergy);

// Example 2: Calculate the energy requirements for a cat
const catEnergy = calculator.calculateEnergyRequirements(4, 18, true, true);
console.log('Cat Energy Requirements:', catEnergy);

// Example 3: Display the form for interactive calorie calculation
const formElement = document.getElementById('calorie-form');
calculator.createCatEnergyForm(formElement);
```

For detailed API documentation, please refer to the TypeScript type definitions of /lib/types/MerCalculator.d.ts.

## Live Example

You can see a live implementation (in Dutch) of the calculator on  [Huiskatteninfo.nl](https://huiskatteninfo.nl/voeding/hoeveel-voer-kat/)

## Contributing

Contributions are welcome! If you have suggestions, bug reports, or feature requests, please open an issue on the [GitHub repository](https://github.com/Huiskatteninfo/CatMerCalculator).

## License

This project is licensed under the MIT License.

---

Please note that the calculations provided by this library are estimates and should not replace professional veterinary advice. Always consult with a veterinarian for accurate dietary recommendations for your cat.
