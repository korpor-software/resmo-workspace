export type ModalId =
  | 'signinSupervisor'
  | 'signinCompany'
  | 'signinAdvisor'
  | 'signinFinancialManager'
  | 'getStarted'
  | 'chooseRole'
  | 'companySignup'
  | 'advisorSignup'
  | 'financialManagerSignup';

export type PlanId = 'starter' | 'professional' | 'enterprise';

export interface Plan {
  id: PlanId;
  name: string;
  desc: string;
  price: number;
  period: string;
  features: { text: string; included: boolean }[];
  buttonLabel: string;
  buttonStyle: 'outlined' | 'gold-fill' | 'navy-fill';
  featured?: boolean;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ServiceCard {
  icon: string;
  iconStyle: 'navy' | 'gold';
  title: string;
  description: string;
  tag: string;
}

export interface HowStep {
  num: string;
  title: string;
  description: string;
}

export interface Role {
  id: ModalId;
  icon: string;
  label: string;
  sub: string;
}
