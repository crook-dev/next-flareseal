'use client'

import { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CalculatorInputs from '@/components/roi-calculator/CalculatorInputs'
import CalculatorResults from '@/components/roi-calculator/CalculatorResults'
import { calculatorSchema, type CalculatorFormData, defaultValues } from '@/components/roi-calculator/types'
import { CalculationResults } from '@/components/roi-calculator/types'

export default function ROICalculator() {
  const [results, setResults] = useState<CalculationResults>({
    expectedLeaks: 6.0,
    serviceCosts: 1650,
    refrigerantCosts: 375,
    flareSealCost: 360,
    totalSavings: 1665,
    roiPercentage: 463
  })

  const [hasValidInputs, setHasValidInputs] = useState(true)

  const form = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorSchema),
    defaultValues,
    mode: 'onChange'
  })

  const { watch, formState: { isValid } } = form

  const calculateROI = (data: CalculatorFormData) => {
    // Check if any required fields are empty or 0
    const isValid = data.installsPerMonth > 0 && data.serviceCallCost > 0 && 
                   data.refrigerantCost > 0 && data.averageRefrigerantLoss > 0
    
    setHasValidInputs(isValid)
    
    if (!isValid) {
      // Don't calculate if required fields are empty
      return
    }
    
    // Calculate annual installations
    const annualInstalls = data.installsPerMonth * 12
    
    // Calculate expected leaks per year
    const expectedLeaks = annualInstalls * data.leakRate
    
    // Calculate costs
    const annualServiceCosts = expectedLeaks * data.serviceCallCost
    const annualRefrigerantCosts = expectedLeaks * data.averageRefrigerantLoss * data.refrigerantCost
    const totalAnnualLosses = annualServiceCosts + annualRefrigerantCosts
    
    // Calculate FlareSeal cost (assuming $3 average per connection, 4 connections per system)
    const flareSealCostPerSystem = 12 // $3 x 4 connections
    const annualFlareSealCost = annualInstalls * flareSealCostPerSystem
    
    // Calculate savings
    const totalSavings = totalAnnualLosses - annualFlareSealCost
    const roiPercentage = ((totalSavings / annualFlareSealCost) * 100)
    
    setResults({
      expectedLeaks: parseFloat(expectedLeaks.toFixed(1)),
      serviceCosts: annualServiceCosts,
      refrigerantCosts: annualRefrigerantCosts,
      flareSealCost: annualFlareSealCost,
      totalSavings: totalSavings,
      roiPercentage: parseFloat(roiPercentage.toFixed(0))
    })
  }

  // Watch specific fields instead of the entire form
  useEffect(() => {
    const subscription = watch((value) => {
      // Only calculate if form is valid and we have all required values
      if (isValid && value.installsPerMonth && value.serviceCallCost && 
          value.refrigerantCost && value.averageRefrigerantLoss) {
        calculateROI(value as CalculatorFormData)
      } else {
        setHasValidInputs(false)
      }
    })
    
    return () => subscription.unsubscribe()
  }, [watch, isValid])

  return (
    <FormProvider {...form}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-10">
        <CalculatorInputs />
        <CalculatorResults results={results} hasValidInputs={hasValidInputs} />
      </div>
    </FormProvider>
  )
}
