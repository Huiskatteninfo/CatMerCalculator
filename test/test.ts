import * as assert from 'assert';
import { MerCalculator } from '../src/index';

// Create an instance of MerCalculator
const calculator = new MerCalculator();



// Test cases for calculateQueenEnergy
const queenLactatingEnergyResult = Math.round(calculator.calculateQueenEnergy(5, false, 3));
assert.strictEqual(queenLactatingEnergyResult, 1194, 'Lactating Queen Energy calculation incorrect');

// Test case for calculateQueenEnergy
const queenGestatingEnergyResult = Math.round(calculator.calculateQueenEnergy(5.1, true, 3, 1));
assert.strictEqual(queenGestatingEnergyResult, 417, 'Lactating Queen Energy calculation incorrect');

const queenGestatingEnergyResult2 = Math.round(calculator.calculateQueenEnergy(5.5, true, 5, 2));
assert.strictEqual(queenGestatingEnergyResult2, 439, 'Lactating Queen Energy 2 calculation incorrect');

const queenGestatingEnergyResult3 = Math.round(calculator.calculateQueenEnergy(5.6, true, 3, 3));
assert.strictEqual(queenGestatingEnergyResult3, 444, 'Lactating Queen Energy 3 calculation incorrect');

const queenGestatingEnergyResult4 = Math.round(calculator.calculateQueenEnergy(5.4, true, 3, 6));
assert.strictEqual(queenGestatingEnergyResult4, 433, 'Lactating Queen Energy 4 calculation incorrect');

const queenGestatingEnergyResult5 = Math.round(calculator.calculateQueenEnergy(5, true, 3, 7));
assert.strictEqual(queenGestatingEnergyResult5, 412, 'Lactating Queen Energy 5 calculation incorrect');

const queenGestatingEnergyResult6 = Math.round(calculator.calculateQueenEnergy(5, true, 3, 8));
assert.strictEqual(queenGestatingEnergyResult6, 412, 'Lactating Queen Energy 6 calculation incorrect');
// Test cases for calculateEnergyRequirements
const energyRequirementsResult = Math.round(calculator.calculateEnergyRequirements(2, 0.9, false, true));
assert.strictEqual(energyRequirementsResult, 318, 'Energy Requirements calculation incorrect');

const energyRequirementsResult1 = Math.round(calculator.calculateEnergyRequirements(4, 10, false, false));
assert.strictEqual(energyRequirementsResult1, 285, 'Energy Requirements calculation incorrect');

const energyRequirementsResult2 = Math.round(calculator.calculateEnergyRequirements(4, 6, false, false));
assert.strictEqual(energyRequirementsResult2, 332, 'Energy Requirements calculation incorrect');

const energyRequirementsResult3 = Math.round(calculator.calculateEnergyRequirements(4.5, 8, false, true));
assert.strictEqual(energyRequirementsResult3, 479, 'Energy Requirements calculation incorrect');

const energyRequirementsResult4 = Math.round(calculator.calculateEnergyRequirements(4.5, 10, false, true));
assert.strictEqual(energyRequirementsResult4, 411, 'Energy Requirements calculation incorrect');

const energyRequirementsResult5 = Math.round(calculator.calculateEnergyRequirements(5, 12, false, true));
assert.strictEqual(energyRequirementsResult5, 294, 'Energy Requirements calculation incorrect');

const energyRequirementsResult6 = Math.round(calculator.calculateEnergyRequirements(5, 12, true, true));
assert.strictEqual(energyRequirementsResult6, 220, 'Energy Requirements calculation incorrect');

// If all assertions pass, the tests are successful
console.log('All tests passed.');
