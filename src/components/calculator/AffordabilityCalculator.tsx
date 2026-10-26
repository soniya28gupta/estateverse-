import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, ShieldAlert, Sparkles, CheckCircle2, Building, RefreshCw } from 'lucide-react';
import { calculateMortgage, formatINR } from '../../utils/formatters';
import { MortgageInputs, Property } from '../../types/property';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { SAMPLE_PROPERTIES } from '../../data/properties';

interface AffordabilityCalculatorProps {
  initialPrice?: number;
  onSelectProperty?: (property: Property) => void;
}

export const AffordabilityCalculator: React.FC<AffordabilityCalculatorProps> = ({
  initialPrice = 18500000,
  onSelectProperty
}) => {
  const [inputs, setInputs] = useState<MortgageInputs>({
    propertyPrice: initialPrice,
    downPaymentPercent: 20,
    annualInterestRate: 8.5,
    tenureYears: 20,
    additionalExpensesPercent: 6
  });

  const [monthlyBudgetLimit, setMonthlyBudgetLimit] = useState<number>(120000);

  const results = useMemo(() => calculateMortgage(inputs), [inputs]);

  // Chart data: Principal vs Interest vs Fees
  const chartData = useMemo(() => [
    { name: 'Loan Principal', value: results.loanPrincipal, color: '#B89558' },
    { name: 'Total Interest Payable', value: results.totalInterest, color: '#17191C' },
    { name: 'Estimated Stamp Duty/Fees', value: results.additionalExpensesAmount, color: '#9CA3AF' },
  ], [results]);

  // Properties within user's chosen monthly budget
  const affordableProperties = useMemo(() => {
    return SAMPLE_PROPERTIES.map(p => {
      const calc = calculateMortgage({
        propertyPrice: p.price,
        downPaymentPercent: inputs.downPaymentPercent,
        annualInterestRate: inputs.annualInterestRate,
        tenureYears: inputs.tenureYears,
        additionalExpensesPercent: inputs.additionalExpensesPercent
      });
      return { property: p, emi: calc.monthlyEMI, isAffordable: calc.monthlyEMI <= monthlyBudgetLimit };
    });
  }, [inputs, monthlyBudgetLimit]);

  return (
    <section id="affordability-calculator" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6EE] border border-[#E9DCBC] text-[#B89558] text-xs font-bold tracking-wider uppercase mb-3 shadow-soft-sm">
          <Calculator className="w-3.5 h-3.5 text-[#B89558]" />
          TRANSPARENT FINANCIAL INTELLIGENCE
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17191C] tracking-tight mb-3">
          Understand the Real Numbers
        </h2>
        <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed font-normal">
          Estimate your monthly EMI, down payment requirement, stamp duty, and complete repayment trajectory using standard reducing-balance calculations.
        </p>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Controls */}
        <div className="lg:col-span-7 p-7 sm:p-9 rounded-3xl bg-white border border-[#E7E9ED] shadow-soft-xl">
          <h3 className="font-serif text-2xl font-bold text-[#17191C] mb-6 flex items-center justify-between">
            <span>Loan & Purchase Parameters</span>
            <span className="text-xs font-sans font-medium text-[#6B7280]">
              INR Standard
            </span>
          </h3>

          <div className="space-y-6">
            {/* Property Price */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#17191C] uppercase tracking-wider">Property Price</label>
                <span className="font-serif text-xl font-bold text-[#B89558]">
                  {formatINR(inputs.propertyPrice)}
                </span>
              </div>
              <input
                type="range"
                min={2000000}
                max={80000000}
                step={500000}
                value={inputs.propertyPrice}
                onChange={(e) => setInputs({ ...inputs, propertyPrice: Number(e.target.value) })}
                className="w-full accent-[#B89558] cursor-pointer h-2 bg-[#E7E9ED] rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-[#9CA3AF] mt-1 font-medium">
                <span>₹20 Lakh</span>
                <span>₹8.00 Cr</span>
              </div>
            </div>

            {/* Down Payment % */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#17191C] uppercase tracking-wider">
                  Down Payment ({inputs.downPaymentPercent}%)
                </label>
                <span className="text-sm font-bold text-[#17191C]">
                  {formatINR(results.downPaymentAmount)}
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={inputs.downPaymentPercent}
                onChange={(e) => setInputs({ ...inputs, downPaymentPercent: Number(e.target.value) })}
                className="w-full accent-[#B89558] cursor-pointer h-2 bg-[#E7E9ED] rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-[#9CA3AF] mt-1 font-medium">
                <span>10% (Min)</span>
                <span>50%</span>
              </div>
            </div>

            {/* Interest Rate & Tenure */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Interest Rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#17191C] uppercase tracking-wider">Annual Interest Rate</label>
                  <span className="text-sm font-bold text-[#B89558]">{inputs.annualInterestRate}%</span>
                </div>
                <input
                  type="range"
                  min={7.0}
                  max={12.5}
                  step={0.1}
                  value={inputs.annualInterestRate}
                  onChange={(e) => setInputs({ ...inputs, annualInterestRate: Number(e.target.value) })}
                  className="w-full accent-[#B89558] cursor-pointer h-2 bg-[#E7E9ED] rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-[#9CA3AF] mt-1 font-medium">
                  <span>7.0%</span>
                  <span>12.5%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#17191C] uppercase tracking-wider">Loan Tenure</label>
                  <span className="text-sm font-bold text-[#B89558]">{inputs.tenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={inputs.tenureYears}
                  onChange={(e) => setInputs({ ...inputs, tenureYears: Number(e.target.value) })}
                  className="w-full accent-[#B89558] cursor-pointer h-2 bg-[#E7E9ED] rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-[#9CA3AF] mt-1 font-medium">
                  <span>5 Yrs</span>
                  <span>30 Yrs</span>
                </div>
              </div>
            </div>

            {/* Additional Expenses / Stamp Duty % */}
            <div className="pt-3 border-t border-[#E7E9ED]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[#6B7280]">
                  Estimated Stamp Duty, Registration & Legal Fees ({inputs.additionalExpensesPercent}%)
                </span>
                <span className="text-xs font-bold text-[#17191C]">
                  {formatINR(results.additionalExpensesAmount)}
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={10}
                step={0.5}
                value={inputs.additionalExpensesPercent}
                onChange={(e) => setInputs({ ...inputs, additionalExpensesPercent: Number(e.target.value) })}
                className="w-full accent-[#17191C] cursor-pointer h-1.5 bg-[#E7E9ED] rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right: Results Dashboard & Recharts Breakdown */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Main EMI Highlight Card */}
          <div className="p-7 sm:p-8 rounded-3xl bg-[#F7F8FA] border border-[#E7E9ED] shadow-soft-xl relative overflow-hidden">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B89558] block mb-1">
              Estimated Monthly EMI
            </span>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#17191C] mb-4">
              {formatINR(results.monthlyEMI)}
              <span className="text-sm font-sans font-normal text-[#6B7280]"> / month</span>
            </div>

            {/* Breakdown Grid */}
            <div className="grid grid-cols-2 gap-3.5 pt-5 border-t border-[#E7E9ED] mb-6">
              <div>
                <span className="text-[11px] text-[#6B7280] font-medium block">Principal Loan Amount</span>
                <span className="text-sm font-bold text-[#17191C]">{formatINR(results.loanPrincipal)}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#6B7280] font-medium block">Total Interest Payable</span>
                <span className="text-sm font-bold text-[#B89558]">{formatINR(results.totalInterest)}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#6B7280] font-medium block">Initial Cash Required</span>
                <span className="text-sm font-bold text-emerald-600">{formatINR(results.initialCashRequirement)}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#6B7280] font-medium block">Total Repayment Amount</span>
                <span className="text-sm font-bold text-[#17191C]">{formatINR(results.totalRepayment)}</span>
              </div>
            </div>

            {/* Recharts Donut Breakdown */}
            <div className="h-44 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={46}
                    outerRadius={68}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: number) => [formatINR(val), 'Amount']}
                    contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E7E9ED', borderRadius: '12px', fontSize: '12px', color: '#17191C' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center pointer-events-none">
                <span className="text-[10px] text-[#6B7280] block font-medium">Total Outflow</span>
                <span className="text-xs font-bold text-[#17191C]">{formatINR(results.totalRepayment)}</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#6B7280] font-medium pt-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B89558]" /> Principal
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#17191C]" /> Total Interest
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9CA3AF]" /> Fees & Stamp Duty
              </span>
            </div>
          </div>

          {/* Transparent Notice */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E7E9ED] text-xs text-[#6B7280] leading-relaxed flex items-start gap-3 shadow-soft-sm">
            <ShieldAlert className="w-4 h-4 text-[#B89558] shrink-0 mt-0.5" />
            <p>
              These calculations provide illustrative estimates. Exact bank interest rates, processing charges, and registration fee schedules vary by jurisdiction and applicant credit profile.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Feature: "Check Which Properties Fit My Budget" */}
      <div className="mt-12 p-7 sm:p-9 rounded-3xl bg-white border border-[#E7E9ED] shadow-soft-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h4 className="font-serif text-xl font-bold text-[#17191C] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B89558]" />
              Find Spaces Within Your Monthly Budget
            </h4>
            <p className="text-xs text-[#6B7280] mt-1 font-normal">
              Adjust your monthly threshold to instantly see matching residences.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#FAF6EE] px-4 py-2 rounded-2xl border border-[#E9DCBC]">
            <span className="text-xs text-[#6B7280] font-medium">Max Monthly EMI:</span>
            <span className="font-serif text-base font-bold text-[#B89558]">
              {formatINR(monthlyBudgetLimit)}/mo
            </span>
          </div>
        </div>

        <input
          type="range"
          min={30000}
          max={400000}
          step={10000}
          value={monthlyBudgetLimit}
          onChange={(e) => setMonthlyBudgetLimit(Number(e.target.value))}
          className="w-full accent-[#B89558] cursor-pointer h-2 bg-[#E7E9ED] rounded-lg mb-6"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {affordableProperties.slice(0, 4).map(({ property, emi, isAffordable }) => (
            <div
              key={property.id}
              onClick={() => onSelectProperty?.(property)}
              className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                isAffordable
                  ? 'bg-white border-[#E7E9ED] hover:border-[#B89558] shadow-soft-sm hover:shadow-soft'
                  : 'bg-[#F7F8FA] border-[#E7E9ED] opacity-60 hover:opacity-100'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-[#B89558] uppercase">{property.city}</span>
                  {isAffordable ? (
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Within Budget
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#9CA3AF] font-medium">Exceeds Budget</span>
                  )}
                </div>
                <h5 className="font-serif text-sm font-bold text-[#17191C] truncate">{property.title}</h5>
              </div>

              <div className="flex items-baseline justify-between mt-3 pt-3 border-t border-[#E7E9ED]">
                <span className="text-xs font-bold text-[#17191C]">{formatINR(property.price)}</span>
                <span className="text-xs text-[#B89558] font-bold">~{formatINR(emi)}/mo</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
