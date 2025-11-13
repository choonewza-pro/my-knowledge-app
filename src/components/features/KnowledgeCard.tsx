import { Card } from '../common';

interface KnowledgeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function KnowledgeCard({ icon, title, description }: KnowledgeCardProps) {
  return (
    <Card variant="bordered" hover className="h-full p-6 bg-base-100 hover:bg-base-200 transition-all duration-300 group">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-base-content/70">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}