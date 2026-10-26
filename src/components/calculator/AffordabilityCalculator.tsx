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

  // Chart data: Principal vs Interest
  const chartData = useMemo(() => [
    { name: 'Loan Principal', value: results.loanPrincipal, color: '#C6A76B' },
    { name: 'Total Interest Payable', value: results.totalInterest, color: '#233242' },
    { name: 'Estimated Stamp Duty/Fees', value: results.additionalExpensesAmount, color: '#82917B' },
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
    <section id="affordability-calculator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-wider uppercase mb-3">
          <Calculator className="w-3.5 h-3.5 text-gold-400" />
          Financial Intelligence & Transparency
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          Understand the Real Numbers
        </h2>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          Estimate your monthly EMI, mandatory down payment, stamp duty, and complete repayment trajectory using standard reducing-balance calculations.
        </p>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Controls */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-midnight-900/90 border border-gold-400/20 backdrop-blur-xl shadow-2xl">
          <h3 className="font-serif text-xl font-bold text-white mb-6 flex items-center justify-between">
            Loan & Purchase Parameters
            <span className="text-xs font-sans font-normal text-stone-400">
              Indian Rupee Standard
            </span>
          </h3>

          <div className="space-y-6">
            {/* Property Price */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-stone-300">Property Price</label>
                <span className="font-serif text-lg font-bold text-gold-300">
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
                className="w-full accent-gold-400 cursor-pointer h-2 bg-midnight-950 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                <span>₹20 Lakh</span>
                <span>₹8.00 Cr</span>
              </div>
            </div>

            {/* Down Payment % */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-stone-300">
                  Down Payment ({inputs.downPaymentPercent}%)
                </label>
                <span className="text-sm font-semibold text-white">
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
                className="w-full accent-gold-400 cursor-pointer h-2 bg-midnight-950 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                <span>10% (Min)</span>
                <span>50%</span>
              </div>
            </div>

            {/* Interest Rate & Tenure */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Interest Rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-stone-300">Annual Interest Rate</label>
                  <span className="text-sm font-bold text-gold-300">{inputs.annualInterestRate}%</span>
                </div>
                <input
                  type="range"
                  min={7.0}
                  max={12.5}
                  step={0.1}
                  value={inputs.annualInterestRate}
                  onChange={(e) => setInputs({ ...inputs, annualInterestRate: Number(e.target.value) })}
                  className="w-full accent-gold-400 cursor-pointer h-2 bg-midnight-950 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                  <span>7.0%</span>
                  <span>12.5%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-stone-300">Loan Tenure</label>
                  <span className="text-sm font-bold text-gold-300">{inputs.tenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={inputs.tenureYears}
                  onChange={(e) => setInputs({ ...inputs, tenureYears: Number(e.target.value) })}
                  className="w-full accent-gold-400 cursor-pointer h-2 bg-midnight-950 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                  <span>5 Yrs</span>
                  <span>30 Yrs</span>
                </div>
              </div>
            </div>

            {/* Additional Expenses / Stamp Duty % */}
            <div className="pt-2 border-t border-stone-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-stone-400">
                  Estimated Stamp Duty, Registration & Legal Fees ({inputs.additionalExpensesPercent}%)
                </span>
                <span className="text-xs font-semibold text-stone-300">
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
                className="w-full accent-sage-400 cursor-pointer h-1.5 bg-midnight-950 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right: Results Dashboard & Recharts Breakdown */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Main EMI Highlight Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-midnight-900 via-midnight-950 to-midnight-900 border border-gold-400/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl" />

            <span className="text-xs font-semibold uppercase tracking-wider text-gold-400 block mb-1">
              Estimated Monthly EMI
            </span>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
              {formatINR(results.monthlyEMI)}
              <span className="text-sm font-sans font-normal text-stone-400"> / month</span>
            </div>

            {/* Breakdown Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-800/80 mb-5">
              <div>
                <span className="text-[11px] text-stone-400 block">Principal Loan Amount</span>
                <span className="text-sm font-semibold text-stone-200">{formatINR(results.loanPrincipal)}</span>
              </div>
              <div>
                <span className="text-[11px] text-stone-400 block">Total Interest Payable</span>
                <span className="text-sm font-semibold text-gold-300">{formatINR(results.totalInterest)}</span>
              </div>
              <div>
                <span className="text-[11px] text-stone-400 block">Initial Cash Required</span>
                <span className="text-sm font-semibold text-emerald-400">{formatINR(results.initialCashRequirement)}</span>
              </div>
              <div>
                <span className="text-[11px] text-stone-400 block">Total Repayment Amount</span>
                <span className="text-sm font-semibold text-stone-200">{formatINR(results.totalRepayment)}</span>
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
                    contentStyle={{ backgroundColor: '#101820', borderColor: '#C6A76B', borderRadius: '8px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center pointer-events-none">
                <span className="text-[10px] text-stone-400 block">Total Outflow</span>
                <span className="text-xs font-bold text-gold-300">{formatINR(results.totalRepayment)}</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-stone-400 pt-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-gold-400" /> Principal
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-midnight-700" /> Total Interest
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sage-400" /> Fees & Stamp Duty
              </span>
            </div>
          </div>

          {/* Transparent Notice */}
          <div className="p-4 rounded-xl bg-midnight-950/70 border border-stone-800 text-xs text-stone-400 leading-relaxed flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
            <p>
              These calculations are estimates, not a loan approval or financial guarantee. Actual interest rates, processing fees, stamp duties, and eligibility depend on your lending institution and credit appraisal.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Feature: "Check Which Properties Fit My Budget" */}
      <div className="mt-12 p-6 rounded-2xl bg-midnight-900/60 border border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              Find Homes Within Your Monthly EMI Budget
            </h4>
            <p className="text-xs text-stone-400">
              Adjust your monthly budget to see which curated properties fit your monthly comfort zone.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-semibold">Max Monthly EMI:</span>
            <span className="font-serif text-base font-bold text-gold-300">
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
          className="w-full accent-gold-400 cursor-pointer h-2 bg-midnight-950 rounded-lg mb-4"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {affordableProperties.slice(0, 4).map(({ property, emi, isAffordable }) => (
            <div
              key={property.id}
              onClick={() => onSelectProperty?.(property)}
              className={`p-3.5 rounded-xl border transition cursor-pointer ${
                isAffordable
                  ? 'bg-midnight-950/90 border-emerald-500/40 hover:border-emerald-400'
                  : 'bg-midnight-950/40 border-stone-800 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-gold-400 uppercase">{property.city}</span>
                {isAffordable ? (
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Within Budget
                  </span>
                ) : (
                  <span className="text-[10px] text-stone-500">Exceeds Budget</span>
                )}
              </div>
              <h5 className="font-serif text-xs font-bold text-white truncate">{property.title}</h5>
              <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-stone-800/80">
                <span className="text-[11px] font-bold text-gold-300">{formatINR(property.price)}</span>
                <span className="text-[11px] text-stone-300 font-medium">~{formatINR(emi)}/mo</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
