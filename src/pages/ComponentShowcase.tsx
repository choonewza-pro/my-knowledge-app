// src/pages/ComponentShowcase.tsx (temporary)
import { Button, Card, Badge } from '../components/common';

export default function ComponentShowcase() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <div className="space-x-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" loading>Loading</Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Cards</h2>
        <div className="grid grid-cols-3 gap-4">
          <Card variant="default">Default Card</Card>
          <Card variant="bordered">Bordered Card</Card>
          <Card variant="elevated" hover>Elevated Card</Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Badges</h2>
        <div className="space-x-2">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </section>
    </div>
  );
}