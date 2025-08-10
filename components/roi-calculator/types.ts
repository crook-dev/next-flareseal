export { calculatorSchema, type CalculatorFormData, defaultValues } from './schema'

export interface CalculationResults {
  expectedLeaks: number
  serviceCosts: number
  refrigerantCosts: number
  flareSealCost: number
  totalSavings: number
  roiPercentage: number
}
