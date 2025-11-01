import { Metadata } from 'next';
import Section from './Section';

export const metadata: Metadata = {
  title: 'Dashboard | 3S Corporation',
  description:
    'Access your personalized dashboard at 3S Corporation to manage products, track orders, and view analytics in one place.',
};

export default function DashboardPage() {
  return <Section />;
}
