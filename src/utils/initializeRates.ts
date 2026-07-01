// Initialize district-based guard rates in localStorage
// This script sets up rates for all guard types across specified districts

export interface RateData {
    id?: string;
    guardType: string;
    district: string;
    hourlyRate: number;
    monthlyRate: number;
    description: string;
    createdAt?: any;
    updatedAt?: any;
}

// Guard types
const GUARD_TYPES = [
    "Security Officer",
    "Security Supervisor",
    "Security Guard",
    "Lady Guard",
    "Housekeeping (Male)",
    "Housekeeping (Female)",
    "Car Parking Guard"
];

// District-based rates (hourly and monthly)
const DISTRICT_RATES: { [key: string]: { hourly: number; monthly: number } } = {
    "Sangli": { hourly: 65, monthly: 15600 },
    "Solapur": { hourly: 65, monthly: 15600 },
    "Satara": { hourly: 65, monthly: 15600 },
    "Pune": { hourly: 75, monthly: 18000 },
    "Mumbai": { hourly: 80, monthly: 19200 },
    "Raigad": { hourly: 80, monthly: 19200 },
    "Nashik": { hourly: 75, monthly: 18000 }
};

// Guard type descriptions
const GUARD_DESCRIPTIONS: { [key: string]: string } = {
    "Security Officer": "Trained security professional for comprehensive protection",
    "Security Supervisor": "Senior security personnel with supervisory responsibilities",
    "Security Guard": "Standard security guard for general protection duties",
    "Lady Guard": "Female security personnel for specialized requirements",
    "Housekeeping (Male)": "Male housekeeping staff for facility maintenance",
    "Housekeeping (Female)": "Female housekeeping staff for facility maintenance",
    "Car Parking Guard": "Specialized guard for parking area management"
};

/**
 * Initialize rates in localStorage
 * This will create district-based rates for Security Guard only
 * Other guard types will have standard rates without district variation
 */
export const initializeDistrictRates = (): void => {
    const rates: RateData[] = [];
    let idCounter = Date.now();

    // Create district-based rates ONLY for Security Guard
    Object.entries(DISTRICT_RATES).forEach(([district, { hourly, monthly }]) => {
        rates.push({
            id: (idCounter++).toString(),
            guardType: "Security Guard",
            district,
            hourlyRate: hourly,
            monthlyRate: monthly,
            description: GUARD_DESCRIPTIONS["Security Guard"] || "",
            createdAt: new Date(),
            updatedAt: new Date()
        });
    });

    // Create standard rates for other guard types (no district variation)
    const otherGuardTypes = GUARD_TYPES.filter(type => type !== "Security Guard");
    otherGuardTypes.forEach((guardType) => {
        rates.push({
            id: (idCounter++).toString(),
            guardType,
            district: "All Districts", // Applies to all districts
            hourlyRate: 65, // Standard rate
            monthlyRate: 15600, // Standard rate
            description: GUARD_DESCRIPTIONS[guardType] || "",
            createdAt: new Date(),
            updatedAt: new Date()
        });
    });

    // Save to localStorage
    localStorage.setItem('securityRates', JSON.stringify(rates));
    console.log(`✅ Initialized ${rates.length} rates (7 district-based for Security Guard + ${otherGuardTypes.length} standard rates for other types)`);
};

/**
 * Get current rates from localStorage
 */
export const getCurrentRates = (): RateData[] => {
    const stored = localStorage.getItem('securityRates');
    return stored ? JSON.parse(stored) : [];
};

/**
 * Clear all rates from localStorage
 */
export const clearAllRates = (): void => {
    localStorage.removeItem('securityRates');
    console.log('🗑️ All rates cleared from localStorage');
};

/**
 * Check if rates are already initialized
 */
export const areRatesInitialized = (): boolean => {
    const rates = getCurrentRates();
    return rates.length > 0;
};

/**
 * Initialize rates only if not already present
 */
export const initializeRatesIfNeeded = (): void => {
    if (!areRatesInitialized()) {
        initializeDistrictRates();
        console.log('📊 Rates initialized successfully');
    } else {
        console.log('ℹ️ Rates already initialized. Use clearAllRates() to reset.');
    }
};

// Export for console usage
if (typeof window !== 'undefined') {
    (window as any).rateUtils = {
        initializeDistrictRates,
        getCurrentRates,
        clearAllRates,
        areRatesInitialized,
        initializeRatesIfNeeded
    };
}
