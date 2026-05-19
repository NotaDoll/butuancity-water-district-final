// Simple tiered rate calculator (residential rates – adjust as needed)
const RATES = {
  residential: [
    { upTo: 10,  base: 191.00, perCubic: 0     },
    { upTo: 20,  base: 191.00, perCubic: 19.44 },
    { upTo: 30,  base: 385.40, perCubic: 26.37 },
    { upTo: 9999,base: 648.10, perCubic: 28.95 },
  ],
  commercial: [
    { upTo: 10,  base: 280.00, perCubic: 0     },
    { upTo: 20,  base: 280.00, perCubic: 28.00 },
    { upTo: 9999,base: 560.00, perCubic: 38.00 },
  ],
  industrial: [
    { upTo: 10,  base: 350.00, perCubic: 0     },
    { upTo: 9999,base: 350.00, perCubic: 45.00 },
  ],
};

const form   = document.getElementById('calc-form');
const result = document.getElementById('calc-result');

function calculate(consumption, type) {
  const tiers = RATES[type] || RATES.residential;
  let bill = 0;
  let prev = 0;

  for (const tier of tiers) {
    if (consumption <= 0) break;
    const used  = Math.min(consumption, tier.upTo - prev);
    const extra = Math.max(0, used - (prev === 0 ? tier.upTo : 0));
    bill = tier.base + (Math.max(0, consumption - (prev || tier.upTo)) * tier.perCubic);
    if (consumption <= tier.upTo) break;
    prev = tier.upTo;
  }

  return bill;
}

form?.addEventListener('submit', e => {
  e.preventDefault();
  const consumption = parseFloat(document.getElementById('consumption').value);
  const type        = document.getElementById('connection-type').value;
  const group       = document.getElementById('fg-consumption');

  if (!consumption || consumption < 0) {
    group?.classList.add('has-error');
    return;
  }

  group?.classList.remove('has-error');
  const bill = calculate(consumption, type);
  result.textContent = `₱ ${bill.toFixed(2)}`;
});

document.getElementById('consumption')?.addEventListener('input', () => {
  document.getElementById('fg-consumption')?.classList.remove('has-error');
});