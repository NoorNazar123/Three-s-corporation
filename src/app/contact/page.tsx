import { Metadata } from 'next';
import Section from './Section';

export const metadata: Metadata = {
  title: 'Contact | 3S Corporation',
  description:
    'Need help or want to place a custom order? Contact 3S Corporation today for fast support and professional assistance.',
};

export default function ContactPage() {
  return <Section />;
}
