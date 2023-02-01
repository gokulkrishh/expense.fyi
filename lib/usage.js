import { addYears } from 'date-fns';

import { basicPlanUsageLimit, premiumPlanUsageLimit } from 'constants/index';

export const hasPremiumBillingCycleEnded = (billingCycleDate) => {
	const todayDate = new Date();
	const endDateForBilling = addYears(new Date(billingCycleDate), 1);

	return todayDate > endDateForBilling;
};

export const hasBasicUsageLimitReached = (usageLimit) => usageLimit + 1 > basicPlanUsageLimit;
export const hasPremiumUsageLimitReached = (usageLimit) => usageLimit + 1 > premiumPlanUsageLimit;
