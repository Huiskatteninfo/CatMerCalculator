import * as assert from 'assert';
import { MerCalculator } from './index';

// Create an instance of MerCalculator
const calculator = new MerCalculator();



// Test cases for calculateQueenEnergy
const queenLactatingEnergyResult = calculator.calculateQueenEnergy(5, false, 3);
assert.strictEqual(queenLactatingEnergyResult, 1194, 'Lactating Queen Energy calculation incorrect');

// Test case for calculateQueenEnergy
const queenGestatingEnergyResult = calculator.calculateQueenEnergy(5.1, true, 3);
assert.strictEqual(queenGestatingEnergyResult, 417, 'Lactating Queen Energy calculation incorrect');

// Test cases for calculateEnergyRequirements
const energyRequirementsResult = calculator.calculateEnergyRequirements(2, 0.9, false, true);
assert.strictEqual(energyRequirementsResult, 318, 'Energy Requirements calculation incorrect');

const energyRequirementsResult1 = calculator.calculateEnergyRequirements(4, 10, false, false);
assert.strictEqual(energyRequirementsResult1, 285, 'Energy Requirements calculation incorrect');

const energyRequirementsResult2 = calculator.calculateEnergyRequirements(4, 6, false, false);
assert.strictEqual(energyRequirementsResult2, 332, 'Energy Requirements calculation incorrect');

const energyRequirementsResult3 = calculator.calculateEnergyRequirements(4.5, 8, false, true);
assert.strictEqual(energyRequirementsResult3, 479, 'Energy Requirements calculation incorrect');

const energyRequirementsResult4 = calculator.calculateEnergyRequirements(4.5, 10, false, true);
assert.strictEqual(energyRequirementsResult4, 411, 'Energy Requirements calculation incorrect');

const energyRequirementsResult5 = calculator.calculateEnergyRequirements(5, 12, false, true);
assert.strictEqual(energyRequirementsResult5, 294, 'Energy Requirements calculation incorrect');

const energyRequirementsResult6 = calculator.calculateEnergyRequirements(5, 12, true, true);
assert.strictEqual(energyRequirementsResult6, 220, 'Energy Requirements calculation incorrect');

// If all assertions pass, the tests are successful
console.log('All tests passed.');
