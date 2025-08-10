import { z } from 'zod'

export const calculatorSchema = z.object({
  installsPerMonth: z
    .number()
    .min(1, 'Must install at least 1 system per month')
    .max(1000, 'Maximum 1000 systems per month'),
  
  averageSystemSize: z
    .number()
    .min(12000, 'Minimum system size is 12,000 BTU')
    .max(60000, 'Maximum system size is 60,000 BTU'),
  
  leakRate: z
    .number()
    .min(0.01, 'Minimum leak rate is 1%')
    .max(0.25, 'Maximum leak rate is 25%'),
  
  serviceCallCost: z
    .number()
    .min(50, 'Minimum service call cost is $50')
    .max(1000, 'Maximum service call cost is $1,000'),
  
  refrigerantCost: z
    .number()
    .min(5, 'Minimum refrigerant cost is $5 per lb')
    .max(100, 'Maximum refrigerant cost is $100 per lb'),
  
  averageRefrigerantLoss: z
    .number()
    .min(0.1, 'Minimum refrigerant loss is 0.1 lbs')
    .max(10, 'Maximum refrigerant loss is 10 lbs')
    .step(0.1, 'Refrigerant loss must be in 0.1 lb increments')
})

export type CalculatorFormData = z.infer<typeof calculatorSchema>

// Default values that match the original calculator
export const defaultValues: CalculatorFormData = {
  installsPerMonth: 10,
  averageSystemSize: 18000,
  leakRate: 0.05,
  serviceCallCost: 275,
  refrigerantCost: 25,
  averageRefrigerantLoss: 2.5
}
