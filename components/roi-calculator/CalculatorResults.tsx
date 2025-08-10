import { CalculationResults } from './types'

interface CalculatorResultsProps {
  results: CalculationResults
  hasValidInputs?: boolean
}

export default function CalculatorResults({ results, hasValidInputs = true }: CalculatorResultsProps) {
  if (!hasValidInputs) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border-2 border-gray-200">
        <h2 className="text-2xl font-bold text-slate-700 mb-6 text-center">📊 Your Cost Analysis</h2>
        
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-6 rounded-xl text-center">
          <div className="text-lg font-medium mb-2">Complete the form to see your ROI calculation</div>
          <div className="text-sm text-blue-600">
            Fill in all the required fields on the left to calculate your potential savings
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border-2 border-gray-200">
      <h2 className="text-2xl font-bold text-slate-700 mb-6 text-center">📊 Your Cost Analysis</h2>
      
      <div className="space-y-4">
        <ResultItem
          title="Expected Leaks Per Year"
          value={results.expectedLeaks.toString()}
          description="Based on your installation volume and leak rate"
        />
        
        <ResultItem
          title="Annual Service Call Costs"
          value={`$${results.serviceCosts.toLocaleString()}`}
          description="Labor, travel, and diagnostic costs"
        />
        
        <ResultItem
          title="Annual Refrigerant Costs"
          value={`$${results.refrigerantCosts.toLocaleString()}`}
          description="Replacement refrigerant for leaked systems"
        />
        
        <ResultItem
          title="FlareSeal Investment"
          value={`$${results.flareSealCost.toLocaleString()}`}
          description="Annual cost using FlareSeal on all installations"
        />
      </div>
      
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl text-center mt-6">
        <h3 className="text-xl font-bold mb-3">Your Annual Savings</h3>
        <div className="text-4xl font-bold mb-2">${results.totalSavings.toLocaleString()}</div>
        <div className="text-lg">Return on Investment: <span className="font-bold">{results.roiPercentage}%</span></div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg mt-6">
        <strong>⚠️ Hidden Costs Not Included:</strong> Customer dissatisfaction, warranty claims, reputation damage, and repeat service calls can add 50-100% to these costs.
      </div>
    </div>
  )
}

interface ResultItemProps {
  title: string
  value: string
  description: string
}

function ResultItem({ title, value, description }: ResultItemProps) {
  return (
    <div className="bg-white p-5 rounded-xl border-l-4 border-blue-500 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-700 mb-2">{title}</h3>
      <div className="text-3xl font-bold text-green-600 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{description}</div>
    </div>
  )
}
