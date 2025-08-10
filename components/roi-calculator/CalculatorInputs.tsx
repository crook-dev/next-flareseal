import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { CalculatorFormData } from './types'

export default function CalculatorInputs() {
  const { register, formState: { errors, isValid, isDirty } } = useFormContext<CalculatorFormData>()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-700 border-b-2 border-blue-500 pb-3">
        Your Operation Details
      </h2>
      
      {/* Form Status Indicator */}
      <div className={`p-3 rounded-lg border-2 transition-all duration-300 ${
        isDirty && isValid 
          ? 'bg-green-50 border-green-200 text-green-800' 
          : isDirty 
            ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
            : 'bg-blue-50 border-blue-200 text-blue-800'
      }`}>
        <div className="flex items-center gap-2">
          <span className="text-lg">
            {isDirty && isValid ? '✅' : isDirty ? '⚠️' : '💡'}
          </span>
          <span className="text-sm font-medium">
            {isDirty && isValid 
              ? 'Form complete! Calculations are ready.' 
              : isDirty 
                ? 'Please complete all required fields.'
                : 'Tip: Use conservative estimates for the most accurate ROI calculation.'
            }
          </span>
        </div>
      </div>
      
      <div className="space-y-5">
        <div>
          <label htmlFor="installsPerMonth" className="block text-sm font-semibold text-gray-700 mb-2">
            Mini-Split Installations Per Month: <span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            id="installsPerMonth"
            {...register('installsPerMonth', { valueAsNumber: true })}
            min="1"
            max="1000"
            placeholder="Enter number of installations"
            className={`h-12 text-base transition-all duration-200 focus:scale-[1.02] focus:shadow-lg ${
              errors.installsPerMonth ? 'border-red-500 focus:border-red-500' : ''
            }`}
          />
          {errors.installsPerMonth && (
            <p className="text-xs text-red-500 mt-1">{errors.installsPerMonth.message}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">How many mini-split systems do you install monthly?</p>
        </div>
        
        <div>
          <label htmlFor="averageSystemSize" className="block text-sm font-semibold text-gray-700 mb-2">
            Average System BTU:
          </label>
          <select
            id="averageSystemSize"
            {...register('averageSystemSize', { valueAsNumber: true })}
            className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-blue-500 transition-colors h-12"
          >
            <option value={12000}>12,000 BTU</option>
            <option value={18000}>18,000 BTU</option>
            <option value={24000}>24,000 BTU</option>
            <option value={36000}>36,000 BTU</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Typical system size for your installations</p>
        </div>
        
        <div>
          <label htmlFor="leakRate" className="block text-sm font-semibold text-gray-700 mb-2">
            Industry Leak Rate (%):
          </label>
          <select
            id="leakRate"
            {...register('leakRate', { valueAsNumber: true })}
            className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-blue-500 transition-colors h-12"
          >
            <option value={0.02}>2% - Excellent Installation Quality</option>
            <option value={0.05}>5% - Good Installation Quality</option>
            <option value={0.08}>8% - Average Installation Quality</option>
            <option value={0.12}>12% - Below Average Quality</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Estimated leak rate based on your installation quality</p>
        </div>
        
        <div>
          <label htmlFor="serviceCallCost" className="block text-sm font-semibold text-gray-700 mb-2">
            Average Service Call Cost ($): <span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            id="serviceCallCost"
            {...register('serviceCallCost', { valueAsNumber: true })}
            min="50"
            max="1000"
            placeholder="Enter service call cost"
            className={`h-12 text-base transition-all duration-200 focus:scale-[1.02] focus:shadow-lg ${
              errors.serviceCallCost ? 'border-red-500 focus:border-red-500' : ''
            }`}
          />
          {errors.serviceCallCost && (
            <p className="text-xs text-red-500 mt-1">{errors.serviceCallCost.message}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">Labor, travel, and diagnostic costs per service call</p>
        </div>
        
        <div>
          <label htmlFor="refrigerantCost" className="block text-sm font-semibold text-gray-700 mb-2">
            R-410A Cost per lb ($): <span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            id="refrigerantCost"
            {...register('refrigerantCost', { valueAsNumber: true })}
            min="5"
            max="100"
            placeholder="Enter cost per pound"
            className={`h-12 text-base transition-all duration-200 focus:scale-[1.02] focus:shadow-lg ${
              errors.refrigerantCost ? 'border-red-500 focus:border-red-500' : ''
            }`}
          />
          {errors.refrigerantCost && (
            <p className="text-xs text-red-500 mt-1">{errors.refrigerantCost.message}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">Current market price for R-410A refrigerant</p>
        </div>
        
        <div>
          <label htmlFor="averageRefrigerantLoss" className="block text-sm font-semibold text-gray-700 mb-2">
            Average Refrigerant Loss per Leak (lbs): <span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            id="averageRefrigerantLoss"
            {...register('averageRefrigerantLoss', { valueAsNumber: true })}
            min="0.1"
            max="10"
            step="0.1"
            placeholder="Enter refrigerant loss amount"
            className={`h-12 text-base transition-all duration-200 focus:scale-[1.02] focus:shadow-lg ${
              errors.averageRefrigerantLoss ? 'border-red-500 focus:border-red-500' : ''
            }`}
          />
          {errors.averageRefrigerantLoss && (
            <p className="text-xs text-red-500 mt-1">{errors.averageRefrigerantLoss.message}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">Typical refrigerant loss when a leak occurs</p>
        </div>
      </div>
    </div>
  )
}
